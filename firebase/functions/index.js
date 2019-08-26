const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp();

exports.blockSignup = functions.auth.user().onCreate(event => {
    console.log("event", event);

    return admin.auth().updateUser(event.uid, { disabled: true })
        .then(userRecord => console.log("Auto blocked user", userRecord.toJSON()))
        .catch(error => console.log("Error auto blocking:", error));
});
