<template>
  <div class="tips" @click='wrapClick'>
    <i>{{showTipsText}}</i>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  props: {
    showTipsText: {
      type: String,
      default: ""
    }
  },
  methods: {
    wrapClick() {
      // this.showTipsText='';
    }
  },
  activated() {},
  created() {}
};
</script>

<style>
.tips {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.tips i {
  max-width: 3.4rem;
  font-size: 14px;
  line-height: 20px;
  padding: 8px 0.2rem;
  border-radius: 6px;
  color: #fff;
  max-height: 120px;
  display: inline-block;
  margin: 70% auto;
  background: rgba(0, 0, 0, 0.8);
  overflow: hidden;
  overflow-y: auto;
}
</style>
