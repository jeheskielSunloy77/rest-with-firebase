const firebase = require("firebase-admin")
const serviceAccount = require("./serviceAccountKey.json") // put your serviceAccountKey on root dir !

firebase.initializeApp({ credential: firebase.credential.cert(serviceAccount) })
const db = firebase.firestore()
const User = db.collection("Users")
module.exports = User
