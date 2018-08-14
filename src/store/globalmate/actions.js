import * as types from './mutations_types';

export default {
    update_userInfo: ({commit}, {userInfo}) => {
        return new Promise((resolve, reject) => {
            commit(types.UPDATE_USERINFO, {userInfo});
            resolve()
        });
    },
    remove_userInfo: ({commit}) => {
        return new Promise((resolve, reject) => {
            commit(types.REMOVE_USERINFO);
            resolve()
        });
    },
};
