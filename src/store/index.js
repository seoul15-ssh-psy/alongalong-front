import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import boardStore from "../store/modules/boardStore";
import memberStore from "../store/modules/memberStore";
import createPersistedState from "vuex-persistedstate";

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      boardStore,
      memberStore,
    },
    plugins: [
      createPersistedState({
        // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
        storage: sessionStorage,
      }),
    ],
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
