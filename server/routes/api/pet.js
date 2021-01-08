const router = require("express").Router();
const Pet = require("./../../models/Pet");
const { bucket, petCollection, getPetById, getUserById, updateUser, updatePet } = require("./../../db");
const multer = require("multer");
const config = require("../../config");
const upload = multer({
    storage: multer.memoryStorage()
});
const { v4: uuidv4 } = require("uuid");

/*
Route: ‘/pet’ [POST] (Protected to admin only)
The add pet api is responsible for adding new pets
Validate all the user input is valid
Handle photo upload
Store pet information in the database

Fields: 
Type 
Name
Adoption Status (Adopted, Fostered, Available)
Picture (Picture location URL/Path)
Height (number)
Weight (Number)
Color
Bio
Hypoallergenic (Boolean)
Dietary restrictions
Breed
*/
router.post("/", upload.single("file"), async (req, res, next) => {
    if (!req.file) {
        res.send({"status": "error", "message": "file not found"});
    }
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
        metadata: {
            contentType: req.file.mimetype,
        },
    });
    
    blobStream.on("error", (err) => next(err));
    blobStream.on("finish", async () => {
        const publicUrl =  `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(blob.name)}?alt=media`;
        try {
            req.body.isHypoallergenic = (req.body.isHypoallergenic == "true");
            req.body.id = uuidv4();
            let pet = Pet.createPetFromAPI(req.body);
            pet["picture"] = publicUrl;
            let addedPet = await petCollection.doc(pet.id).set(pet.getJson());
            res.send({"status": "success", "pet": addedPet });
        } catch (error) {
            res.send({"status": "error", error: error.message});
        }
        res.status(200).send({ 
            fileName: req.file.originalname,
        });
    });
    blobStream.end(req.file.buffer);
});

/*
Route: ‘/pet/:id’ [GET]
Get a pet by ID should take an id and return the corresponding pet from the database. 
*/
router.get("/:id", async(req, res) => {
    //TODO: validate whether pet exists?
    const id = req.params.id;
    let currentPet = await getPetById(id);
    res.send({currentPet});
});

/*
Route: ‘/pet/:id’ [PUT] (protected to admin only)
The add pet api is responsible for editing pets
Validate all the user input is valid
Handle photo upload
Store pet information in the database

Fields: Same as Add Pet API
*/
router.put("/:id", upload.single("file"), async (req, res, next) => {
    // two cases: with file and without file

    // without file:
    if (typeof req.body.isHypoallergenic == "string") {
        req.body.isHypoallergenic = (req.body.isHypoallergenic == "true");
    }
    
    if (!req.file) {
        try {
            let pet = Pet.createPetFromAPI(req.body);
            let updatedPet = await petCollection.doc(pet.id).update(pet.getJson());
            res.send({"status": "success", "pet": updatedPet });
        } catch (error) {
            res.send({"status": "error", error: error.message});
        }
    } else { // with file: 
        const blob = bucket.file(req.file.originalname);
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype,
            },
        });
        
        blobStream.on("error", (err) => next(err));
        blobStream.on("finish", async () => {
            const publicUrl =  `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(blob.name)}?alt=media`;
            try {
                let pet = Pet.createPetFromAPI(req.body);
                pet["picture"] = publicUrl;
                let updatedPet = await petCollection.doc(pet.id).update(pet.getJson());
                res.send({"status": "success", "pet": updatedPet });
            } catch (error) {
                res.send({"status": "error", error: error.message});
            }
            res.status(200).send({ 
                fileName: req.file.originalname,
            });
        });
        blobStream.end(req.file.buffer);
    }
});

/*
Route: ‘/pet’ [GET] 

The get pets API is responsible. for retrieving pets that match the criteria given.
Can receive query parameters to search the database
Retrieve results to match query. If no parameters are passed it should return all the results.
Should only return the fields necessary 

Search Fields: 
Adoption Status
Type
Height
Weight
Name
*/
router.get("/", async (req, res) => {
    let { adoptionStatus, height, name, type, weight } = req.query;
    let petsRef = petCollection;
    
    if (adoptionStatus) {
        adoptionStatus = adoptionStatus.split(",");
        adoptionStatus = adoptionStatus.map(status => status.toLowerCase());
        petsRef = petsRef.where("adoptionStatus", "in", adoptionStatus);
    }
    if (height) {
        petsRef = petsRef.where("height", "==", parseInt(height));
    } 
    if (weight) {
        petsRef = petsRef.where("weight", "==", parseInt(weight));
    }
    if (type) {
        petsRef = petsRef.where("type", "==", type);
    }
    if (name) {
        petsRef = petsRef.where("name", "==", name.toLowerCase());
    }

    let snapshot = await petsRef.get();
    let pets = [];
    snapshot.forEach(doc => {
        let pet = doc.data();
        pets.push(pet);
    });
    res.send({status: "success", pets: pets});
});

/*
Route ‘/pet/:id/adopt’ [POST] (protected to logged in users)
The Adopt/Foster API is responsible for adding the pet to the current users pets.
This API also should change the pet’s adoption status. 
*/
router.post("/:id/adopt", async (req, res) => {
    let currentUserId = req.cookies[config.authentication.userCookie];
    let currentUser = await getUserById(currentUserId);
    let petId = req.params.id;
    if (currentUser.isAllowedToAdopt(petId)) {
        currentUser.adoptPet(petId);
        await updateUser(currentUserId, currentUser);
        let currentPet = await getPetById(petId);
        currentPet.adoptionStatus = "adopted";
        await updatePet(petId, currentPet);
        res.send({"status": "success", "message": "The user has adopted this pet."});
    } else { 
        res.send({"status": "error", "message": "User is currently not allowed to adopt this pet."});
    }    
});

/*
Route ‘/pet/:id/foster [POST] (protected to logged in users)
The Foster API is responsible for adding the pet to the current users pets.
This API also should change the pet’s foster status. 
*/
router.post("/:id/foster", async (req, res) => {
    let currentUserId = req.cookies[config.authentication.userCookie]; 
    let currentUser = await getUserById(currentUserId);
    let petId = req.params.id;
    if (currentUser.isAllowedToFoster(petId)) {
        currentUser.fosterPet(petId);
        await updateUser(currentUserId, currentUser);
        let currentPet = await getPetById(petId);
        currentPet.adoptionStatus = "fostered";
        await updatePet(petId, currentPet);
        res.send({"status": "success", "message": "The user has fostered this pet."});
    } else {
        res.send({"status": "error", "message": "User is currently not allowed to foster this pet."});
    }
});

/*
Route ‘/pet/:id/return’ [POST] (protected to logged in users)
The Return Pet API is responsible for returning the pet to the agency. 
The API should change the pets status back to available
The API should remove the pet from the users pets.

*/
router.post("/:id/return", async (req, res) => {
    let currentUserId = req.cookies[config.authentication.userCookie];
    let currentUser = await getUserById(currentUserId);
    let petId = req.params.id;
    if (currentUser.isAllowedToReturn(petId)) {
        currentUser.returnPet(petId);
        await updateUser(currentUserId, currentUser);
        let currentPet = await getPetById(petId);
        currentPet.adoptionStatus = "available";
        await updatePet(petId, currentPet);
        res.send({"status": "success", "message": "User's pet has been returned. The pet is now available for foster or adoption."});
    } else {
        res.send({"status": "failed", "message": "User cannot return the pet"});
    }
});


/*
Route ‘/pet/:id/save’ [POST] (protected to logged in users)
The save PET api allows a user to save a pet for later
The saved pet should be stored as saved in the users account
*/
router.post("/:id/save", async (req,res) => {
    let currentUserId = req.cookies[config.authentication.userCookie]; 
    let currentUser = await getUserById(currentUserId);
    let petId = req.params.id;
    if (currentUser.isAllowedToSavePet(petId)) {
        currentUser.savePet(petId);
        await updateUser(currentUserId, currentUser);
        res.send({"status": "success", "message": "The pet has been saved."});
    } else {
        res.send({"status": "error", "message": "User has already saved this pet."});
    }
   
});

/*
Route ‘/pet/:id/save’ [DELETE] (protected to logged in users)
The save PET api allows a user to remove a saved pet.
*/
router.delete("/:id/save", async (req, res) => {
    let currentUserId = req.cookies[config.authentication.userCookie]; 
    let currentUser = await getUserById(currentUserId);
    let petId = req.params.id; 
    if (currentUser.isAllowedToUnsavePet(petId)) {
        currentUser.removeSavedPet(petId);
        await updateUser(currentUserId, currentUser);
        res.send({"status": "success", "message": "The pet has been removed from saved pets"});
    } else {
        res.send({"status": "error", "message": "User hasn't saved this pet."});
    }    
});

/*
Route ‘/pet/user/:id’ [GET]
This api allows a user to get the pets owned by (or saved) by a user based on the user id.
*/
router.get("/user/:userId", async (req, res) => {
    let userId = req.params.userId; 
    let currentUser = await getUserById(userId);
    //TODO: handle in sign up when they have no pets
    let usersFosteredPets = currentUser.fosteredPets;
    let usersAdoptedPets = currentUser.adoptedPets;
    let usersSavedPets = currentUser.savedPets;
    res.send({"status": "success", "adoptedPets": usersAdoptedPets, "fosteredPets": usersFosteredPets, "savedPets": usersSavedPets});
});

module.exports = router;