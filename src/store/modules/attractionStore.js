import { createStore } from 'vuex'

const store = createStore({
  // state: 모든 컴포넌트에서 공통으로 접근할 변수 관리
  state() {
    return {
      count: 0
    }
  },

  // getters: state에 정의된 변수를 가져올 getter
  getters: {
    cartCount: state => {
      return state.cart.length
    }
  },

  // mutations: state의 변수를 수정할 setter(동기)
  mutations: {
    increment(state) {
      state.count++
    }
  },

  // actions: mutations의 함수를 실행 가능 -> 비동기작업이 가능하다는 차이
  actions: {
    increment(context) {
      context.commit('increment')
    }
  }
})

export default store
