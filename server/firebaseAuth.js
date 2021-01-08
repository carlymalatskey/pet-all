const firebase = require("firebase/app");
require("firebase/auth");
const config = require("./config");
firebase.initializeApp(config.firebaseConfig);

module.exports = {
    firebase
};