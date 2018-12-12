import * as firebase from 'firebase/app'

// TODO : fix
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: '<API_KEY>',
    authDomain: '<AUTH_DOMAIN>',
    databaseURL: '<DATABASE_URL>',
    projectId: '<PROJECT_ID>',
    storageBucket: '<STORAGE_BUCKET>',
    messagingSenderId: '<MESSAGING_SENDER_ID>'
  })
}

export default firebase
