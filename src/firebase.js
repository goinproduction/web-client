import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCBVzgFFsFtsIRJdOPULbQ_h9yTJ2lKNHU",
    authDomain: "gclassroom-c141d.firebaseapp.com",
    projectId: "gclassroom-c141d",
    storageBucket: "gclassroom-c141d.appspot.com",
    messagingSenderId: "135114601766",
    appId: "1:135114601766:web:b0100717a9920b2e53bde7"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
// Sign in and check or create account in firestore
const signInWithGoogle = async () => {
    try {
        const response = await auth.signInWithPopup(googleProvider);
        console.log(response.user);
        const user = response.user;
        console.log(`User ID - ${user?.uid}`);
        const querySnapshot = await db
            .collection('users')
            .where('uid', '==', user?.uid)
            .get();
        if (querySnapshot.docs.length === 0) {
            // create a new user
            await db.collection('users').add({
                uid: user?.uid,
                enrolledClassrooms: [],
            });
        }
    } catch (err) {
        alert(err.message);
    }
};
const logout = () => {
    auth.signOut();
};

export { app, auth, db, signInWithGoogle, logout };
