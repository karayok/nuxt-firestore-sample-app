import firebase from '@/plugins/firebase'
import 'firebase/auth'

const provider = new firebase.auth.GoogleAuthProvider()

const auth = {
  login() {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then(() => resolve())
        .catch(err => reject(err))
    })
  },
  logout() {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => resolve())
        .catch(err => reject(err))
    })
  },
  auth() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => resolve(user))
    })
  }
}

export default auth
