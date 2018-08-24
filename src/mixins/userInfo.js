import { mapState } from 'vuex'
import { userInfo } from 'os';

export default {
  computed: {
    // ...mapState('globalmate', ['userInfo'])
    // userInfo: function () {
    //   return this.$store.state.globalmate.userInfo
    // },
    ...mapState('globalmate', ['userInfo', 'todoList', 'msgList'])
  },
  methods: {
    updateUserInfo: function (options) {
      this.$store.commit({
        type: "globalmate/UPDATE_USERINFO",
        userInfo: options
      });
    },
    updateTodoList: function (list) {
      this.$store.commit({
        type: "globalmate/UPDATE_TODOLIST",
        todoList: list
      });
    },
    updateMsgList: function (list) {
      this.$store.commit({
        type: "globalmate/UPDATE_MSGLIST",
        msgList: list
      });
    }
  }
}