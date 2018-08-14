import * as types from './mutations_types'

module.exports = {
	[types.UPDATE_USERINFO](state, user) {
    state.token = user.token || state.token;
    state.appId = user.appId || state.appId;
    state.qzId = user.qzId || state.qzId;
    state.code = user.code || state.code;
  },
	[types.REMOVE_USERINFO](state) {
		state = {};
	},
};
