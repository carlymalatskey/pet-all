const admin = require("firebase-admin");
const config = require("./config");

const Pet = require("./models/Pet");
const User = require("./models/User");

admin.initializeApp({
    credential: admin.credential.cert(config.firestoreConfig),
    storageBucket: config.db.bucketName
});

const db = admin.firestore();
const petCollection = db.collection(config.db.petsCollection);
const userCollection = db.collection(config.db.usersCollection);
const bucket = admin.storage().bucket();

async function getPetById(id) {
    let petSnapshot = await petCollection.doc(id).get();
    if (petSnapshot.exists) {
        let pet = Pet.createPetFromFireBaseResponse(petSnapshot.data());
        pet.id = petSnapshot.id; 
        return pet;
    } else {
        return undefined;
    }
}

async function getUserById(id) {
    let userSnapshot = await userCollection.doc(id).get();
    if (userSnapshot.exists) {
        let user = User.createUserFromFirebaseResponse(userSnapshot.data());
        return user;
    } else {
        return undefined;
    }
}

async function updateUser(id, newUser) {
    await userCollection.doc(id).set(newUser.toJson());
}

async function updatePet(id, newPet) {
    await petCollection.doc(id).set(newPet.getJson());  
}

module.exports = {
    db,
    bucket,
    petCollection,
    userCollection,
    getPetById,
    getUserById,
    updateUser,
    updatePet,
};