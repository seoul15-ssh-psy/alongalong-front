import { createStore } from 'vuex'

const userStore = createStore({
  state() {
    return {
      myLocation: {},
      myRegion: {}
    }
  },
  mutations: {
    myLocation(state, data) {
      state.myLocation = data
    },
    myRegion(state, data) {
      state.myRegion = data
    }
  },
  actions: {
    getCurrentRegion(context) {
      context.commit('getCurrentRegion')
    }
  }
})

export default userStore
