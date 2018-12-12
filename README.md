# nuxt-firebase-blog-app

Sample Nuxt.js app using Firebase Authentication and Firestore.

This project is Work in Progress.

## To use Firebase Authorization

Replace `~/plugins/firebase.js` API keys.

```js
import firebase from 'firebase'

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
```

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
