import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    loggedIn: false,
    loginUserId: '',
    loginUserFullName: '',
    objectives: [''],
    companyName: '',
    projectName: '',
    filelist: []
  },
  mutations: {
    setLogOut (state) {
      state.loggedIn = false
      state.loginUserId = ''
      state.loginUserFullName = ''
      state.objectives = ['']
    },
    setLogin (state, payload) {
      state.loggedIn = payload.loggedIn
      state.loginUserId = payload.loginUserId
      state.loginUserFullName = payload.loginUserFullName
    },
    setObjectives (state, payload) {
      state.objectives[state.objectives.length - 1] = payload.addedObj
      state.objectives.push('')
    },
    clearProjectInfo (state) {
      state.companyName = ''
      state.projectName = ''
    },
    clearObjectives (state) {
      state.objectives = ['']
    },
    setProjectInfo (state, payload) {
      state.companyName = payload.companyName
      state.projectName = payload.projectName
    },
    setFileList (state, payload) {
      console.log(payload)
      state.filelist.push(payload.fileList)
    },
    clearFileList (state) {
      state.filelist = []
    }
  }
})