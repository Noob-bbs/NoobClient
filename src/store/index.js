import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: window.localStorage.getItem('user') == null ? '' : JSON.parse(window.localStorage.getItem('user')),
    loginStatus: false,
    topicListUpdate: false
  },
  mutations: {
    login (state, user) {
      state.user = user
      window.localStorage.setItem('user', JSON.stringify(user))
      console.log("储存USER：" + JSON.stringify(state.user))
      state.loginStatus = true
    },
    logout (state){
      state.loginStatus = false
      window.localStorage.removeItem('user')
    },
    topicListUpdate(state, ifNeed){
      console.log("修改ifneed" + ifNeed)
      state.topicListUpdate = ifNeed
    }
  }
})
