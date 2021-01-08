const router = require("express").Router();
const User = require("../../models/User");

const { db } = require("./../../db");
const { firebase } = require("./../../firebaseAuth");
const config = require("../../config");

router.get("/", (_, res) => {
    res.send({"status": "YAY!"});
});

/*
route: ‘/signup’ [POST]
The signup api is responsible for signing up a new user. 
Validate all the user input is valid
Check that passwords match
Make sure the email address is unique 
Store the user in your DB and log the user in
Be sure not to save the users password as a plain string. (bcrypt is a great tool for this)

Fields:  
Email Address
Password (twice to make sure passwords match)
First and last name
Phone number
*/

router.post("/signup", (req, res) => {
    const { email, password1, password2 } = req.body; // TODO: decrypt password
    let doPasswordsMatch = User.doPasswordsMatch(password1, password2);
    if (!doPasswordsMatch) {
        res.send({status: "error", message: "Passwords don't match"});
        return;        
    }
    firebase.auth().createUserWithEmailAndPassword(email, password1)
        .then(async (userObj) => {
            if(userObj) {
                let user = User.createUserFromAPI(req.body);
                await db.collection("users").doc(userObj.user.uid).set(user.toJson());
                res.cookie(config.authentication.userCookie, userObj.user.uid);
                res.send({"status": "success", "user": user});
            }
        })
        .catch((error) => {
            res.send({"status": "failure", "error": error});
        });
});

/*
route: ‘/login’ [POST]
The login api is responsible for logging in existing users
Validate all the user input is valid
Check the email and password match an existing user
Retrieve the users data from the database and login the user.

Fields: 
Email address 
Password
*/
router.post("/login", (req, res) => {
    if (req.cookies[config.authentication.userCookie]) {
        res.send({"status": "success", "message": "User already logged in"});
        return;
    }
    const email = req.body.email;
    const password = req.body.password;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userObj) => {
            User.createUserFromFirebaseResponse(userObj);

            res.cookie(config.authentication.userCookie, userObj.user.uid);
            res.send({"status": "success"});
        })
        .catch((error) => {
            res.send({"status": "failure", "error": error});
        });
});

// sign out 
//TODO: put messages in front end
router.get("/signout", (req, res) => {
    if (req.cookies.petAdoptionUserId) {
        res.clearCookie("petAdoptionUserId");
        res.send({"status": "success"});
    } else {
        res.send({"status": "error", "message": "no cookie"});
    }
});

module.exports = router; 