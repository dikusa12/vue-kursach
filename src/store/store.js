import { createStore } from 'vuex'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { app, db } from "../../firebase.js";
import { setDoc, collection, doc, getDoc } from 'firebase/firestore';

const auth = getAuth(app);

const store = createStore({
  state: {
    user: {
      loggedIn: false,
      data: null,
      role: null
    },
    courses: [],
    isLoading: true,
  },
  getters: {
    user(state) {
      return state.user
    },
    courses(state) {
      return state.courses
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    SET_ROLE(state, role) {
      state.user.role = role;
    },
    SET_IS_LOADING(state, value) {
      state.isLoading = value
    },
    SET_COURSES(state, value) {
      state.courses = value
    },
    ADD_COURSE(state, value) {
      state.courses.push(value)
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
        context.commit('SET_USER', {
          displayName: name,
          email,
        })
        context.commit('SET_ROLE', email === 'kashnikow.ev@gmail.com' ? 'admin' : 'customer',)
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
      context.commit('SET_LOGGED_IN', false)
    },

    async fetchUser(context, user) {
      context.commit("SET_LOGGED_IN", user !== null);

      if (user) {
        const roleDoc = await getDoc(doc(db, 'roles', user.uid))

        context.commit("SET_USER", {
          displayName: user.name,
          email: user.email,
        });
        context.commit('SET_ROLE', roleDoc.data().role)
      } else {
        context.commit("SET_USER", null);
      }
    },
    async deleteCourse(context, id) {
      store.commit('SET_COURSES', [])
      const filtered = store.state.courses.filter(item => item.id !== id )
      context.commit('SET_COURSES', filtered)
    },
    async addCourse(context, course) {
      context.commit("ADD_COURSE", course)
    }
  }
})

export default store