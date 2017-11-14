'use strict';

app.service("AuthService", function () {
  const authenticateGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };
  return { authenticateGoogle }; //return functions that you want to use 
});