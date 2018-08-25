<template>
  <div class="um-win um-page" id="main">

  </div>
</template>

<script>
import Vue from 'vue'
import { MessageBox, Toast } from "mint-ui";
Vue.component(Toast.name, Toast);
Vue.component(MessageBox.name, MessageBox);

import userMix from "../mixins/userInfo";
export default {
  mixins: [userMix],
  data() {
    return {

    };
  },
  methods: {

  },
  activated() {

  },
  mounted() {},
  created() {

  }
};
</script>


</style>
