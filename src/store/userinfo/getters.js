module.exports = {
	getUserInfo(state) {
		return state.userinfo;
	},

	getToken(state) {
		return state.userinfo && state.userinfo.token ? state.userinfo.token : '';
	},
};
