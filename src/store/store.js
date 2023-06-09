import { createStore } from 'vuex'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { app, db } from "../../firebase.js";
import { setDoc, collection, doc } from 'firebase/firestore';

const auth = getAuth(app);

const store = createStore({
  state: {
    user: {
      loggedIn: false,
      data: null
    }
  },
  getters: {
    user(state) {
      console.log(state.user)
      return state.user
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    }
  },
  actions: {
    async register(context, { email, password, name }) {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      if (user) {
        await setDoc(doc(db, 'roles', user.uid), {
          role: user.email === 'kashnikow.ev@gmail.com' ? 'admin' : 'customer',
          userId: user.uid
        })
        context.commit('SET_USER', user)
        await updateProfile(user, { displayName: name })
      } else {
        throw new Error('Unable to register user')
      }
    },

    async logIn(context, { email, password }) {
      const { user } = await signInWithEmailAndPassword(auth, email, password)

      if (user.email) {
        context.commit('SET_USER', user)
      } else {
        throw new Error('login failed')
      }
    },

    async logOut(context) {
      await signOut(auth)
      context.commit('SET_USER', null)
    },

    async fetchUser(context, user) {
      context.commit("SET_LOGGED_IN", user !== null);

      if (user) {
        context.commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        context.commit("SET_USER", null);
      }
    }
  }
})

// export the store
export default store