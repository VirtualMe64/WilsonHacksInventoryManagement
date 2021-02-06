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
    return new Promise((resolve, reject) => {
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
        .collection("items")
        .get()
        .then((querySnapshot) => {
          let snap = [];
          querySnapshot.forEach((doc) => {
            snap.push(doc.data());
          });
          resolve(snap);
        });
    });
  }

  static addItem(data) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("items")
        .add(data)
        .then(() => {
          resolve();
        });
    });
  }

  static editItem(data) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("items")
        .doc(data.id)
        .update(data.update)
        .then(() => {
          resolve();
        });
    });
  }

  static deleteItem(data) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("items")
        .doc(data.id)
        .update(data.update)
        .then(() => {
          resolve();
        });
    });
  }
}
