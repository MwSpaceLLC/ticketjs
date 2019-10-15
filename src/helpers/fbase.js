import * as firebase from 'firebase';

/**
 * Init Firebase
 * @type {{storageBucket: string, apiKey: string, messagingSenderId: string, appId: string, projectId: string, measurementId: string, databaseURL: string, authDomain: string}}
 */
// var firebaseConfig = {
//     apiKey: process.env.VUE_APP_FIREBASEKEY,
//     authDomain: process.env.VUE_APP_FIREBASEDOMAIN,
//     databaseURL: process.env.VUE_APP_FIREBASEDATABASE,
//     projectId: process.env.VUE_APP_FIREBASEPROJECT,
//     storageBucket: process.env.VUE_APP_FIREBASESTORAGE,
//     messagingSenderId: process.env.VUE_APP_FIREBASESENDER,
//     appId: process.env.VUE_APP_FIREBASEAPP,
//     measurementId: process.env.VUE_APP_FIREBASEMEASUREMENT
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();