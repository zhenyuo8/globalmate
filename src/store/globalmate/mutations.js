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
  }
};
