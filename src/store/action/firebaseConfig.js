import firebase from 'firebase';
var config = {
    apiKey: "AIzaSyBDS69mpyWWlCY6i09eMVYnXxIc2Y1hGDQ",
    authDomain: "chatapp-ea951.firebaseapp.com",
    databaseURL: "https://chatapp-ea951.firebaseio.com",
    projectId: "chatapp-ea951",
    storageBucket: "chatapp-ea951.appspot.com",
    messagingSenderId: "993812507598"
};
let configDefault = firebase.initializeApp(config);

export default configDefault;