const router = require("express").Router();
const { getUserById, updateUser, userCollection, getPetById } = require("./../../db");
const User = require("./../../models/User");
/*
Route ‘/user/:id’ [GET]
This api allows you to get a user based on the user's id. 
*/
router.get("/:id", async(req, res) => {
    const id = req.params.id;
    let user = await getUserById(id);
    if (user) {
        user.id = id;
        await updateUser(id, user);
        res.send({user});
    } else {
        res.send({"status": "error", "message": "User not found"});
    }
});

/*
Route ‘/user/:id’ [PUT] (protected to logged in user)
This API allows you to change your settings while logged in.
Validate user inputs
Ensure that if the email is being changed it’s not already in use

Fields:
Password
Email
first name
last name
phone number
bio

*/
router.put("/:id", async (req, res) => {
    //TODO: what about isAdmin --- updates to the default: false; 
    let userId = req.params.id; 
    if (userId.length === 0) { 
        res.send({status: "error", message: "Id is invalid"});
        return;
    } 
    try {
        let userToUpdate = User.createUserFromAPI(req.body);
        let userRef = userCollection.doc(userId);
        let updatedUser = await userRef.set(userToUpdate.toJson());
        res.send({"status": "success", writeTime: updatedUser.writeTime, updatedUser: userToUpdate.toJson()});
    } catch (error) {
        res.send({"status": "error", messge: error});
    }
});

/*
Route ‘/user’ [GET] (protected to admin)
- The GET users API returns all users in the DB.
- The API should only return the information required
*/
router.get("/", async (req, res) => {
    let users = []; 
    let snapshot = await userCollection.get(); 
    for (let j = 0; j < snapshot.docs.length; j++) {
        let doc = snapshot.docs[j];
        let user = User.createUserFromFirebaseResponse(doc.data()); 
        let adoptedPets = [];
        for (let i = 0; i < user.adoptedPets.length; i++) {
            let adoptedPet = await getPetById(user.adoptedPets[i]);
            adoptedPets.push(adoptedPet);
        }
        user.adoptedPets = adoptedPets;

        let fosteredPets = [];
        for (let i = 0; i < user.fosteredPets.length; i++) {
            let fosteredPet = await getPetById(user.fosteredPets[i]);
            fosteredPets.push(fosteredPet);
        }
        user.fosteredPets = fosteredPets;

        let savedPets = [];
        for (let i = 0; i < user.savedPets.length; i++) {
            let savedPet = await getPetById(user.savedPets[i]);
            savedPets.push(savedPet);
        }
        user.savedPets = savedPets;

        user.id = doc.id; 
        users.push(user);
    }

    let usersJson = users.map(user => user.toJson());
    res.send({"status": "success", users: usersJson}); 
});

/*
Route ‘/user/:id/full’ [GET]
This api allows you to get a user based on the user's id. 
The API should return all the user details (aside from password) and the users pets they own.
*/
router.get("/:id/full", async (req, res) => {
    //TODO: how is this different from the first request
    const id = req.params.id;
    let currentUser = await getUserById(id);
    currentUser.id = id;
    await updateUser(id, currentUser);
    res.send({currentUser});
});

module.exports = router;