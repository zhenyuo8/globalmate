<template>
  <div class="feedback" id='feedback'>
    <div class="feedback_warp">
      <div class="feedback_title">
        {{$t('formTitle.feedTitle')}}
      </div>
      <div class="middle">
        <textarea :placeholder="$t('formTitle.feedTips')" v-model='textareaVal'></textarea>
      </div>
      <div class="defindloadig" v-if="loadingShow">
        <loading></loading>
      </div>
      <button type="submit" name="button" class="evaluate_submit" @click='feedbackClick'>{{$t('button.submit')}}</button>
    </div>

  </div>
</template>

<script>
import loading from "../components/loading.vue";
export default {
  components: {
    loading
  },
  data() {
    return {
      textareaVal: "",
      loadingShow: false
    };
  },
  methods: {
    feedbackClick() {
      this.loadingShow = true;
      let postData = {
        uEvaluatorId: "",
        uEvluatorName: "",
        uTargeterId: "",
        uTargeterName: "",
        needId: "",
        score: "",
        content: this.textareaVal,
        evaExt1: "",
        evaExt2: ""
      };

      this.axios
        .post(
          this.ip +
            "/globalmate/rest/evaluate/add/sys" +
            "?token=" +
            this.$route.query.token,
          postData
        )
        .then(res => {
          if (res.success) {
            setTimeout(() => {
              this.loadingShow = false;
              window.history.back(-1);
            }, 1000);
          }
        })
        .catch(e => {
          setTimeout(() => {
            this.loadingShow = false;
            window.history.back(-1);
          }, 1000);
        });
    }
  },
  activated() {
  },
  created() {}
};
</script>

<style scoped>
.feedback {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
.feedback_warp {
  width: 90%;
  margin: auto;
}
.feedback_title {
  font-size: 14px;
  color: #333;
  padding: 10px 0;
  text-align: left;
}
.middle textarea {
  font-size: 14px;
  padding: 0.1rem;
  padding: 8px 0.16rem;
  border: 2px solid #eee;
  width: 100%;
  height: 160px;
  box-sizing: border-box;
}

.evaluate_submit {
  width: 100%;
  font-size: 16px;
  height: 36px;
  background: #007aff;
  color: #fff;
  border-radius: 4px;
}
.defindloadig {
  position: fixed;
  z-index: 11;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
</style>
