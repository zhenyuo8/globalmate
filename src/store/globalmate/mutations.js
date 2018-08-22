import * as types from './mutations_types'

/**
 * dataSetter:处理更新数据方法（单个或多个键值对更新）
 * stateData：state对象中的值
 * newData：更新数据对象的值
 */
function dataSetter(stateData, newData) {
  for (var key in newData) {
    stateData[key] = newData[key] === '' ? (stateData[key] || '') : newData[key];
  }
}
export default {
  [types.UPDATE_USERINFO](state, payload) {
    const userInfo = payload.userInfo;
    state.userInfo = Object.assign(state.userInfo, userInfo)
  },
  [types.REMOVE_USERINFO](state) {
    state.userInfo = {};
  },
};
