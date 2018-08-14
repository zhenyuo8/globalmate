import state from './state';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';

module.exports = {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
};
