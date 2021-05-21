import firebase from 'firebase';

if (!firebase.apps.length) {
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBz3mVL_ORNqKpLDk_eDmUtiTYItpYHA_Q",
        authDomain: "fir-sample-2263c.firebaseapp.com",
        projectId: "fir-sample-2263c",
        storageBucket: "fir-sample-2263c.appspot.com",
        messagingSenderId: "913703448881",
        appId: "1:913703448881:web:efeecfac94f3811e038010"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export const auth = firebase.auth();

export default firebase;

export const getFbItems = async () => {
    try {
        const snapshot = await db
            .collection("todos")
            .get();
        const items = snapshot.docs.map(
            (doc) => ({ ...doc.data(), id: doc.id })
        );
        return items;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export const addFbItem = async (item) => {
    try {
        const todoRef = db.collection("todos");
        await todoRef.add(item);
    } catch (err) {
        console.log(err);
    }
}

export const updateFbItem = async (item, id) => {
    try {
        const todoRef = db.collection("todos").doc(id);
        await todoRef.update(item);
    } catch (err) {
        console.log(err);
    }
}

export const clearFbItem = async (item) => {
    const todoRef = db.collection("todos").doc(item.id);
    await todoRef.delete().then(function() {}).catch(function(err) {
        console.log(err);
    });
};

export const uiConf = {
    signInFlow: 'popup',
    signInSuccessUrl: "/",
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
}

export const storeUserInfo = async (user) => {
    const { uid } = user;
    const userInfo = await db.collection("users").doc(uid).get();
    if (!userInfo.exists) {
        await db.collection("users").doc(uid).set({ name: user.displayName });
        return {
            name: user.displayName,
            id: uid,
        };
    } else {
        return {
            id: uid,
            ...userInfo.data(),
        };
    }
}

export const updateInfo = async (user, image) => {
    try {
        const userInfo = await firebase.firestore().collection("users").doc(user.id).get();
        if (userInfo.exists) {
            await firebase.firestore().collection("users").doc(user.id).update({ ...userInfo.data(), image: image });
        }
    } catch (err) {
        console.log(err);
    }
}

export const uploadImg = async (img) => {
    const ref = firebase.storage().ref().child(`/images/${img.name}`);
    let url = "";
    try {
        await ref.put(img);
        url = await ref.getDownloadURL();
    } catch (err) {
        console.log(err);
    }
    return url;
};