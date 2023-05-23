import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import boardStore from '../store/modules/boardStore'
import memberStore from '../store/modules/memberStore'
import locationStore from '../store/modules/locationStore'
import createPersistedState from 'vuex-persistedstate'

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      boardStore,
      memberStore,
      locationStore
    },
    plugins: [
      createPersistedState({
        // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
        storage: sessionStorage
      })
    ],
    strict: process.env.DEBUGGING
  })

  return Store
})
