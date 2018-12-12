import Vuex from 'vuex'
import firebase from '@/plugins/firebase'
import 'firebase/auth'
import 'firebase/firestore'

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })
const usersRef = firestore.collection('/users')

const store = () =>
  new Vuex.Store({
    state: {
      isLoading: false,
      user: null,
      posts: []
    },

    mutations: {
      setLoading: (state, loading) => (state.isLoading = !!loading),
      setUser: (state, user) => (state.user = user),
      setPost: (state, post) => state.posts.push(post),
      setPosts: (state, posts) => (state.posts = posts)
    },

    getters: {
      isLoading: state => state.isLoading,
      user: state => state.user,
      posts: state => state.posts
    },

    actions: {
      setLoading({ commit }, loading) {
        commit('setLoading', loading)
      },
      async setUser({ commit }, user) {
        if (!user) return
        await usersRef.doc(user.uid).set({
          email: user.email,
          name: user.displayName,
          icon: user.photoURL,
          last_login: new Date()
        })
        commit('setUser', {
          id: user.uid,
          email: user.email,
          name: user.displayName,
          icon: user.photoURL
        })
      },
      async resetUser({ commit }) {
        commit('setUser', null)
      },
      async addPost({ commit }, user, post) {
        if (!user || !post || !user.id) return
        const newPost = {
          title: post.title,
          content: post.content,
          created_at: new Date()
        }
        await firestore
          .doc(`users/${user.uid}`)
          .collection('posts')
          .set({
            posts: newPost
          })
        commit('setPost', newPost)
      },
      async fetchPost({ commit }, user) {
        if (!user || !user.uid) return
        await firestore
          .doc(`users/${user.uid}`)
          .collection('posts')
          .get()
          .then(function(querySnapshot) {
            commit('setPosts', [])
            querySnapshot.forEach(function(doc) {
              commit('setPost', doc.data())
            })
          })
      }
    }
  })

export default store
