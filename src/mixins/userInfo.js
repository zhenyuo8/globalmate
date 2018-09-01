import { mapState } from 'vuex'
import { userInfo } from 'os';

export default {
  computed: {
    // ...mapState('globalmate', ['userInfo'])
    // userInfo: function () {
    //   return this.$store.state.globalmate.userInfo
    // },
    ...mapState('globalmate', ['userInfo', 'todoList', 'msgList', 'userList']),
    ...mapState(['ip', 'wxAppId', 'wxAppSecret', 'isWXVerified']),
    wxSign() {
      return this.$store.state.globalmate.wx.signature
    },
    wxToken() {
      return this.$store.state.globalmate.wx.accessToken
    }
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
    },
    updateUserList: function (list) {
      this.$store.commit({
        type: "globalmate/UPDATE_USERLIST",
        userList: list
      });
    },
    updateWXSign: function (sign) {
      this.$store.commit({
        type: 'globalmate/UPDATE_WXSIGN',
        sign
      })
    },
    updateWXToken: function (token) {
      this.$store.commit({
        type: 'globalmate/UPDATE_WXTOKEN',
        token
      })
    },
    updateWXVertifyState (status) {
      this.$store.commit({
        type: 'updateWxVertified',
        isWXVerified: status
      })
    }
  }
}
