import * as types from './mutations_types'
export default {
  [types.UPDATE_USERINFO](state, payload) {
    const userInfo = payload.userInfo;
    state.userInfo = Object.assign(state.userInfo, userInfo)
  },
  [types.REMOVE_USERINFO](state) {
    state.userInfo = {};
  },
  [types.UPDATE_TODOLIST](state, payload) {
    state.todoList = payload.todoList
  },
  [types.UPDATE_MSGLIST](state, payload) {
    state.msgList = payload.msgList
  },
  [types.UPDATE_USERLIST](state, payload) {
    state.userList = payload.userList
  },
  [types.UPDATE_WXSIGN](state, payload) {
    state.wx.signature = {
      code: payload.sign,
      expiry: Date.now() + 7200 * 1000
    }
  },
  [types.UPDATE_WXTOKEN](state, payload) {
    state.wx.accessToken = {
      code: payload.token,
      expiry: Date.now() + 7200 * 1000
    }
  }
};
