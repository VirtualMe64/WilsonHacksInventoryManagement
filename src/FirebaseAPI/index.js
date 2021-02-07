import firebase from "./firebase";

export default class FirebaseAPI {
  static user;
  static auth;

  static createUser(userData) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(userData.email, userData.password)
        .then((userCredentials) => {
          this.auth = userCredentials.user;
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static signIn(userData) {
    console.log("signing in");
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .catch((err) => {});
      firebase
        .auth()
        .signInWithEmailAndPassword(userData.email, userData.password)
        .then((userCredentials) => {
          this.auth = userCredentials.user;
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static getItems() {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection(this.auth.uid)
        .get()
        .then((querySnapshot) => {
          let snap = [];
          querySnapshot.forEach((doc) => {
            snap.push({ ...doc.data(), id: doc.id });
          });
          resolve(snap);
        });
    });
  }

  static addItem(data) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection(this.auth.uid)
        .add(data)
        .then(() => {
          resolve();
        });
    });
  }

  static removeItem(data) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection(this.auth.uid)
        .doc(data.id)
        .delete()
        .then(() => {
          resolve();
        });
    });
  }

  static editItem(data, id) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection(this.auth.uid)
        .doc(id)
        .update(data)
        .then(() => {
          resolve();
        });
    });
  }

  static listener(callback) {
    firebase
      .firestore()
      .collection(this.auth.uid)
      .onSnapshot((querySnapshot) => {
        let snap = [];
        querySnapshot.forEach((doc) => {
          snap.push({ ...doc.data(), id: doc.id });
        });
        callback(snap);
      });
  }
}
