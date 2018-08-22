import { mapState } from 'vuex'
import { userInfo } from 'os';

export default {
  computed: {
    // ...mapState('globalmate', ['userInfo'])
    userInfo: function () {
      return this.$store.state.globalmate.userInfo
    }
  }
}