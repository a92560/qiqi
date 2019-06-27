const state = {
  username : window.localStorage.getItem('username') || '',
  isAdmin : window.localStorage.getItem('isAdmin') || false
}

const actions = {

}

const mutations = {
  USER_INFO(state,payLoad){
    state.username = payLoad.username
    state.isAdmin = payLoad.isAdmin
  }
}

export default {
  namespaced : true,
  state,
  actions,
  mutations
}
