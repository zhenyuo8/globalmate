<style scoped>
@import "../assets/css/common.css";
</style>

<style media="screen">
.list_show {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 7.5rem;
  background: #f5f5f5;
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  overflow: scroll;
}
.list_hide {
  position: fixed;
  right: -7.5rem;
  top: 0;
  bottom: 0;
  width: 7.1rem;
  background: #fff;
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
}

</style>

<template>

  <div class="assist" @click='removeFile($event)'>
    <div class="body">
      <div class="main_view">
        <div class="main_view_repeat" v-for="(item,index) in listRepeat" :key='index'>
          <List :itemRepeat='item' :clickCallBack='clickCallBack'></List>
        </div>
      </div>
      <div class="main_style">
        <List :itemRepeat='myReward' :clickCallBack='clickCallBack'></List>
      </div>
      <div class="main_decription">
        <div class="main_decription_title">
          <List :itemRepeat='title' :clickCallBack='clickCallBack'></List>
        </div>
        <div class="main_decription_area">
          <textarea name="name" :placeholder="$t('formTitle.descriptionTips')" style='width:100%'></textarea>
        </div>
        <div class="main_decription_uploader">
          <div class="hide_space">
              <div class="main_decription_uploader_container_img" v-for="(item,index) in filesHasUpload" :key='index'>
                  <img :src="item"  class="prev_imgae" alt="">
              </div>
              <div class="main_decription_uploader_container">
                <span class="icon-add" id='uploader'></span>
              </div>
          </div>

        </div>
      </div>
    </div>
    <div class="assist_bottom" @click='publish' v-show="!isEditType">
      {{$t('button.publish')}}
    </div>
    <div class="assist_bottom" @click='publish' v-show="isEditType">
      {{$t('button.submit')}}
    </div>
    <div class="defindloadig" v-if="loadingShow">
      <loading></loading>
    </div>
    <indexList :class="show?'list_show':'list_hide'" :selectItem='selectItem' :countrySityCallBack='countrySityCallBack' :listType='listType'></indexList>
    <mt-datetime-picker ref="picker" type="date" :startDate="startDate" :endDate="endDate" :cancelText="$t('button.cancel')" :confirmText="$t('button.confirm')" @confirm="handleConfirm" v-model="pickerValue">
    </mt-datetime-picker>
  </div>

</template>

<script>
import List from "../components/list.vue";
import selectList from "../components/selectList.vue";
import indexList from "../components/indexList.vue";
import Vue from 'vue'
import loading from "../components/loading.vue";
import { Toast, DatetimePicker } from "mint-ui";
Vue.component(Toast.name, Toast);
Vue.component(DatetimePicker.name, DatetimePicker);
import userMix from "../mixins/userInfo";
export default {
  name: "assist",
  mixins: [userMix],
  data() {
    return {
      listRepeat: [],
      myReward: {
        title: this.$t("formTitle.reward"),
        text: this.$t("formTitle.inputPlace"),
        type: "input",
        arrow: false,
        key: "reward",
        isRequire: false,
        isPlacehold: true,
        componentKey: "rewardAmount"
      },
      title: {
        title: this.$t("formTitle.head"),
        text: this.$t("formTitle.headerTips"),
        type: "input",
        arrow: false,
        key: "title",
        isRequire: true,
        isPlacehold: true,
        componentKey: "title"
      },
      publishData: [],
      show: false,
      selectItem: [],
      filesHasUpload: [],
      formTitle: this.$route.query.title,
      listType: "",
      country: "",
      showTipsText: "",
      loadingShow: true,
      isEditType: false,
      startDate: new Date("1970/01/01"),
      endDate: new Date("2100/12/31"),
      pickerValue: this.moment(new Date()).format("YYYY-MM-DD")
    };
  },
  components: {
    List,
    selectList,
    Toast,
    indexList,
    loading,
    DatetimePicker
  },
  methods: {
    openPicker(item) {
      this["datePick"] = item;
      this.$refs.picker.open();
    },
    handleConfirm(value) {
      value = this.moment(value).format("YYYY-MM-DD");
      this.selectCallBack(value, this["datePick"]);
    },
    // 点击发布按钮逻辑
    publish() {
      this.previewImageFlag=false;
      let postData = this.getListData();
      this.submitUrl = "/globalmate/rest/need/addCommon";
      postData['type']=this.type;
      if (postData) {
        this.loadingShow = true;
        this.axios.post(this.ip + this.submitUrl + "?token=" + this.userInfo['token'],
            postData
          ).then(res => {
            if (res.success) {
                this.loadingShow = false;
                Toast({
                  message: "您的信息已提交",
                  duration: 2000
                });
               setTimeout(() => {
                   window.history.go(-1);
                }, 2000);
            } else {
                Toast({
                  message: res.msg,
                  duration: 2000
                });
            }
          }).catch(e => {
            console.log(e);
          });
      }
    },
    clickCallBack(item, e) {
      let _this = this;
      if (!item.type) {
        if (item.key === "date") {
          this.pickerValue=this.moment(new Date()).format("YYYY-MM-DD")
          this.openPicker(item);
        } else {
          this.getSelectItem(item.key);
        }
      } else {
        if (e) {
          this.selectCallBack(e.target.value, item);
        }
      }
    },
    selectCallBack(value, selectItem) {
      this.show = false;
      let key = selectItem.key;
      let _this=this;
      switch (key) {
        case "delivery":
          this.payStyle.text = value;
          this.payStyle.isPlacehold = false;
          break;
        case "reward":
          this.myReward.text = value;
          this.myReward.isPlacehold = false;
          break;
        case "title":
          this.title.text = value;
          this.title.isPlacehold = false;
          break;
        default:
        this.listRepeat.forEach(function (item,index) {
            if(item.key==='date'){
                if(item.key===selectItem.key&&item.componentKey===selectItem.componentKey){
                    if(selectItem.componentKey=='startTime'){
                        _this.startTime=_this.moment(value).valueOf();
                        if(_this.endTime&&_this.endTime<_this.startTime){
                            Toast({
                               message: '开始时间必须小于结束时间',
                               duration: 2000
                           });
                           return;
                        }
                    }
                    if(selectItem.componentKey=='endTime'){
                        _this.endTime=_this.moment(value).valueOf();
                        if(_this.startTime&&_this.endTime<_this.startTime){
                            Toast({
                               message: '结束时间必须大于开始时间',
                               duration: 2000
                           });
                           return;
                        }
                    }
                    item.text=value;
                    item.isPlacehold=false;
                }
            }else{
                if(item.key===selectItem.key){
                    item.text=value;
                    item.isPlacehold=false;
                }
            }
        });
          break;
      }
    },
    countrySityCallBack(items, value) {
      this.show = false;
      this.selectItem = [];
      let _this=this;
      if (value) {
        if (items == "country") {
          this.country = value;
          this.listRepeat.forEach(function(item, index) {
            if (item.componentKey == "city") {
              item.text = _this.$t("formTitle.selectPlace");
              item.isPlacehold = true;
            } else if (item.componentKey == items) {
              item.text = value;
              item.isPlacehold = false;
            }
          });
        } else {
          this.listRepeat.forEach(function(item, index) {
            if (item.componentKey == items) {
              item.text = value;
              item.isPlacehold = false;
            }
          });
        }
      }
    },
    getSelectItem(key) {
      let url = "",
        _this = this,
        postData = {};
        let lang=navigator.language||'zh-CN';
        let isEN=/^zh/.test(lang)?false:/^en/.test(lang)?true:/^es/.test(lang)?true:true;
      if (key == "city" && this.country) {
        url = "/globalmate/rest/user/city";
        this.axios.get(this.ip + url, {
            params: {
              token: this.userInfo.token,
              countryregion: this.country,
              isEN:isEN
            }
          }).then(res => {
            if (res.success) {
              let result = res.data,
                resultArr = [];
              if (this.country == "中国"||this.country == "China") {
                resultArr = [this.$t('cityName.beijing'),this.$t('cityName.tianjing'),this.$t('cityName.shanghai'),this.$t('cityName.chongqing')];
              }
              result.forEach(function(item, index) {
                resultArr.push(item.city);
              });
              _this.buildItem(resultArr, key);
            }
          }).catch(e => {
            Toast({
              message: e.msg,
              duration: 2000
            });
          });
      } else if (key == "country") {
        url = "/globalmate/rest/user/country";
        this.axios.get(this.ip + url, {
            params: {
              token: this.userInfo.token,
              isEN:isEN
            }
          }).then(res => {
            if (res.success) {
              _this.buildItem(res.data, key);
            }
          }).catch(e => {
            Toast({
              message: e.msg,
              duration: 2000
            });
          });
      } else {
        Toast({
          message: "请先选择国家！",
          duration: 2000
        });
      }
    },
    buildItem(data, key) {
      let letter = this.$utils.buildLetter();
      let _this = this;
      for (let i = 0; i < 26; i++) {
        letter[i].citylist = [];
      }
      for (let i = 0; i < data.length; i++) {
        let _index = Number(_this.$utils.getFirstLetter(data[i]).charCodeAt() - 65);
        if (_index >= 0 && _index < 26) {
          letter[_index].citylist.push(data[i]);
        }
      }
      let showCity = letter.filter(function(value) {
        let len = value.citylist.length;
        return len > 0;
      });
      if(key=="country"){
          let hotcountry=this.getCountryHot();
          showCity.unshift(hotcountry);
      }else{
          let hotcity=this.getHotCity(this.country);
          showCity.unshift(hotcity)
      }
      this.show = true;
      this.listType = key;
      this.selectItem = showCity;
      this.updateTodoList(this.selectItem);
    },
    getCountryHot(){
        let obj={};
        obj['letter']='热门国家';
        obj['citylist']=[this.$t('country.china'),this.$t('country.korea'),this.$t('country.japan'),this.$t('country.singapore'),this.$t('country.uk'),this.$t('country.us'),this.$t('country.thailand'),this.$t('country.vietnam'),this.$t('country.germany'),this.$t('country.canada'),this.$t('country.australia'),this.$t('country.france'),this.$t('country.malaysia')];
        return obj;
    },
    getHotCity(country){
        let obj={};
        obj['letter']='热门城市';
        switch (country) {
            case '中国':
                obj['citylist']=[this.$t('city.Beijing'),this.$t('city.Shanghai'),this.$t('city.Guangzhou'),this.$t('city.Shenzhen'),this.$t('city.Hongkong'),this.$t('city.Macow'),this.$t('city.Taipei'),this.$t('city.Hangzhou'),this.$t('city.Xiamen'),this.$t('city.Nanjing'),this.$t('city.Qingdao'),this.$t('city.Chengdu'),this.$t('city.Chongqing'),this.$t('city.Tianjin'),this.$t('city.Dalian'),this.$t('city.Shenyang'),this.$t('city.Fuzhou'),this.$t('city.Kunming'),this.$t('city.Wuhan'),this.$t('city.Ningbo'),this.$t('city.Wuxi'),this.$t('city.Jinjiang'),this.$t('city.Sanya'),this.$t('city.Xian')];
                break;
             case 'China':
                 obj['citylist']=[this.$t('city.beijing'),this.$t('city.shanghai'),this.$t('city.Guangzhou'),this.$t('city.Shenzhen'),this.$t('city.Hongkong'),this.$t('city.Macow'),this.$t('city.Taipei'),this.$t('city.Hangzhou'),this.$t('city.Xiamen'),this.$t('city.Nanjing'),this.$t('city.Qingdao'),this.$t('city.Chengdu'),this.$t('city.Chongqing'),this.$t('city.Tianjin'),this.$t('city.Dalian'),this.$t('city.sShenyang'),this.$t('city.Fuzhou'),this.$t('city.Kunming'),this.$t('city.Wuhan'),this.$t('city.Ningbo'),this.$t('city.Wuxi'),this.$t('city.Jinjiang'),this.$t('city.Sanya'),this.$t('city.Xian')]
                 break;
             case '韩国':
                 obj['citylist']=[this.$t('city.Seoul'),this.$t('city.Busan')]
                 break;
             case 'Korea':
                 obj['citylist']=[this.$t('city.Seoul'),this.$t('city.Busan')]
                 break;
             case '日本':
                 obj['citylist']=[this.$t('city.Tokyo'),this.$t('city.Nagoya'),this.$t('city.Osaka')]
                 break;
             case 'Japan':
                 obj['citylist']=[this.$t('city.Tokyo'),this.$t('city.Nagoya'),this.$t('city.Osaka')]
                 break;
             case '新加坡':
                 obj['citylist']=[this.$t('city.Singapore')]
                 break;
             case 'Singapore':
                 obj['citylist']=[this.$t('city.Singapore')]
                 break;
             case '泰国':
                 obj['citylist']=[this.$t('city.Bangkok')]
                 break;
             case 'Thailand':
                 obj['citylist']=[this.$t('city.Bangkok')]
                 break;
             case '越南':
                 obj['citylist']=[this.$t('city.HoChiMinhCity')]
                 break;
             case 'Vietnam':
                 obj['citylist']=[this.$t('city.HoChiMinhCity')]
                 break;
             case '美国':
                 obj['citylist']=[this.$t('city.NewYork'),this.$t('city.LosAngeles'),this.$t('city.Hawaii')]
                 break;
             case 'US':
                 obj['citylist']=[this.$t('city.NewYork'),this.$t('city.LosAngeles'),this.$t('city.Hawaii')]
                 break;

              case '德国':
                  obj['citylist']=[this.$t('city.Frankfurt')]
                  break;
              case 'Germany':
                  obj['citylist']=[this.$t('city.Frankfurt')]
                  break;
              case '加拿大':
                  obj['citylist']=[this.$t('city.Vancouver')]
                  break;
              case 'Canada':
                  obj['citylist']=[this.$t('city.Vancouver')]
                  break;
              case '英国':
                  obj['citylist']=[this.$t('city.Landon')]
                  break;
              case 'UK':
                  obj['citylist']=[this.$t('city.Landon')]
                  break;
              case '澳大利亚':
                  obj['citylist']=[this.$t('city.Sydney')]
                  break;
              case 'Australia':
                  obj['citylist']=[this.$t('city.Sydney')]
                  break;
              case '法国':
                  obj['citylist']=[this.$t('city.Paris')]
                  break;
              case 'France':
                  obj['citylist']=[this.$t('city.Paris')]
                  break;
              case '马来西亚':
                  obj['citylist']=[this.$t('city.KualaLumpur')]
                  break;
              case 'Malaysia':
                  obj['citylist']=[this.$t('city.KualaLumpur')]
                  break;
            default:


        }
        return obj;
    },
    // 获取发布所需要的数据
    getListData() {
      let listRepeat = this.listRepeat;
      let postData = {},
        hasParaRequired = false;
      for (var i = 0; i < listRepeat.length; i++) {
        if (listRepeat[i].isPlacehold && listRepeat[i].isRequire) {
          postData[listRepeat[i].componentKey] = "";
          hasParaRequired = true;
          Toast({
            message: listRepeat[i].title + "为必填项",
            duration: 2000
          });
          return false;
        } else if (!listRepeat[i].isPlacehold) {
          postData[listRepeat[i].componentKey] = listRepeat[i].text;
        }
      }
      if (!this.myReward.isPlacehold) {
        postData[this.myReward.componentKey] = this.myReward.text;
      } else {
        hasParaRequired = true;
      }
      if (!this.title.isPlacehold) {
        postData[this.title.componentKey] = this.title.text;
      } else {
        Toast({
          message: this.title.title + "为必填项",
          duration: 2000
        });
        return false;
      }
      if (this.$el.querySelector(".main_decription_area textarea")) {
        postData["description"] = this.$el.querySelector(
          ".main_decription_area textarea"
        ).value;
      }
      if (this.filesHasUpload.length !== 0) {
        postData["pic"] = this.filesHasUpload.join(";");
      }
      return postData;
    },
    // 发布页面显示字段根据form显示不同字段
    listRepeatProcess() {
      this.myReward = {
        title: this.$t("formTitle.reward"),
        text: this.$t("formTitle.inputPlace"),
        type: "input",
        arrow: false,
        key: "reward",
        isRequire: false,
        isPlacehold: true,
        componentKey: "reward"
      };
      this.title = {
        title: this.$t("formTitle.head"),
        text: this.$t("formTitle.headerTips"),
        type: "input",
        arrow: false,
        key: "title",
        isRequire: true,
        isPlacehold: true,
        componentKey: "title"
      };
      this.listRepeat = [
        {
          title: this.$t("formTitle.type"),
          text: this.$route.query.title,
          arrow: false,
          key: "style",
          isRequire: false,
          isPlacehold: false,
          componentKey: "businessType"
        },
        {
          title: this.$t("formTitle.starttime"),
          text: this.$t("formTitle.selectPlace"),
          arrow: true,
          key: "date",
          isRequire: true,
          isPlacehold: true,
          componentKey: "startTime"
        },
        {
          title: this.$t("formTitle.endtime"),
          text: this.$t("formTitle.selectPlace"),
          arrow: true,
          key: "date",
          isRequire: true,
          isPlacehold: true,
          componentKey: "endTime"
        },
        {
          title: this.$t("formTitle.country"),
          text: this.$t("formTitle.selectPlace"),
          arrow: true,
          key: "country",
          isRequire: true,
          isPlacehold: true,
          componentKey: "country"
        },
        {
          title: this.$t("formTitle.city"),
          text: this.$t("formTitle.selectPlace"),
          arrow: true,
          key: "city",
          isRequire: true,
          isPlacehold: true,
          componentKey: "city"
        }
      ];
    },
    //获取编辑表单数据
    loadDataEdit(id) {
      let _this = this;
      this.listRepeat = [];
      this.axios.get(this.ip +"/globalmate/rest/need/list/" +id, {
            // onlyCurrentUser: true,
            params: {
              token: this.userInfo['token'],
              onlyCurrentUser: true
            }
          }
        ).then(res => {
          if (res.success) {
            let data = res.data;
            this.listRepeatProcess();
            this.myReward.text = data.conceretNeed.reward;
            this.myReward.isPlacehold = false;
            this.title.text = data.conceretNeed.title;
            this.title.isPlacehold = false
            this.listRepeat.forEach(function(item, index) {
              if (item.componentKey == "country" && data.conceretNeed.country) {
                item.text = data.conceretNeed.country;
                _this.country = data.conceretNeed.country;
                item.isPlacehold=false;
              }
              if (item.componentKey == "city" && data.conceretNeed.city) {
                item.text = data.conceretNeed.city;
                item.isPlacehold=false;
              }
              if (
                item.componentKey == "startTime" &&
                data.conceretNeed.startTime
              ) {
                item.text = _this
                  .moment(data.conceretNeed.startTime)
                  .format("YYYY-MM-DD");
                  item.isPlacehold=false;
              }
              if (item.componentKey == "endTime" && data.conceretNeed.endTime) {
                item.text = _this.moment(data.conceretNeed.endTime).format("YYYY-MM-DD");
                  item.isPlacehold=false;
              }
              if (data.conceretNeed.description) {
                _this.$el.querySelector(".main_decription_area textarea").value =data.conceretNeed.description;
              }
            });
          }
        }).catch(e => {
          console.log(e);
        });
    },
    removeFile(e) {
      if (e.target.className === "prev_imgae") {
        $(e.target.parentNode).remove();
        this.filesHasUpload.splice($(e.target.parentNode).index(), 1);
      }
    },
    previewImage(file, callback) {
      if (!file || !/image\//.test(file.type)) return;
      if (file.type == "image/gif") {
        var fr = new mOxie.FileReader();
        fr.onload = function() {
          callback(fr.result);
          fr.destroy();
          fr = null;
        };
        fr.readAsDataURL(file.getSource());
      } else {
        var preloader = new mOxie.Image();
        preloader.onload = function() {
          preloader.downsize(100, 100);
          var imgsrc =
            preloader.type == "image/jpeg"
              ? preloader.getAsDataURL("image/jpeg", 80)
              : preloader.getAsDataURL();
          callback && callback(imgsrc);
          preloader.destroy();
          preloader = null;
        };
        preloader.load(file.getSource());
      }
    },
    initUploader() {
      let _this = this;
      let ossMap = {};
      this.filesHasUpload = [];
      this.multipart_params = {
        key: "",
        policy: "",
        OSSAccessKeyId: "",
        success_action_status: "",
        signature: ""
      };
      this.axios.get( this.ip + "/globalmate/rest/file/ossPolicy", {
          params: {
            token: this.userInfo.token
          }
        }).then(res => {
          if (res.success) {
            ossMap.accessid = res.data.accessid;
            ossMap.policy = res.data.policy;
            ossMap.signature = res.data.signature;
            ossMap.key = res.data.dir;
            ossMap.host = res.data.host;
            ossMap.success_action_status = 200;
          }
        })
        .catch(e => {});
      this.fileUploader = new plupload.Uploader({
        runtimes: "html5,flash,silverlight,html4",
        browse_button: "uploader", //触发文件选择对话框的按钮，为那个元素id
        url: "http://ncc-ys-prod-oss-xingjjc.oss-cn-beijing.aliyuncs.com/", //服务器端的上传页面地址
        flash_swf_url: "../libs/plupload/Moxie.swf", //swf文件，当需要使用swf方式进行上传时需要配置该参数
        silverlight_xap_url: "../libs/plupload/Moxie.xap" //silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
      });
      this.fileUploader.bind("FilesAdded", function(uploader, files) {
         _this.fileUploader.start();
      });
      this.fileUploader.bind("BeforeUpload", function(up, file) {
        file.name = new Date().getTime() + "_" + file.name;
        _this.multipart_params = {
          key: ossMap.key + "_" + file.name,
          policy: ossMap.policy,
          OSSAccessKeyId: ossMap.accessid,
          success_action_status: "200",
          signature: ossMap.signature
        };
        up.setOption({
          url: ossMap.host,
          multipart_params: _this.multipart_params
        });
      });
      this.fileUploader.bind("FileUploaded", function(up, file, info) {
        _this.filesHasUpload.push(
          ossMap.host + "/" + _this.multipart_params.key
        );
      });
      this.fileUploader.init();
      setTimeout(()=>{
           this.uploadAttr();
      },1000)

   },
     uploadAttr(){
         const ua = navigator.userAgent.toLowerCase();
         const isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);//判断是否是苹果手机，是则是true
         if(this.fileUploader){
              if (isIos) {
                  $("input:file").removeAttr("capture");
              }
         }else{
             this.timer2=setInterval(()=>{
                 if(this.fileUploader){
                     if (isIos) {
                         $("input:file").removeAttr("capture");
                     }
                     clearInterval(this.timer2);
                 }
             },300)
         }
     }
  },
  activated() {
    this.show = false;
    this.filesHasUpload=[];
    this.selectItem = [];
    this.type=this.$route.query.key;
    $(".repeat_content input").val("");
    $(".main_decription_area textarea").val("");
    if (this.$route.query.mode && this.$route.query.mode == "MODIFY") {
      this.isEditType = true;
      this.loadDataEdit(this.$route.query.id);
    } else {
      this.listRepeatProcess();
    }
    setTimeout(() => {
      this.loadingShow = false;
    }, 500);
  },
  computed: {
    form: function() {
      return this.$route.query.form || "";
    },
    key: function() {
      return this.$route.query.key || "";
    }
  },
  watch: {
    form: function(newvalue, old) {
      if (newvalue && old) {
        this.listRepeatProcess();
      }
    },
    key: function(newvalue, old) {
      if (newvalue && old) {
        this.type = this.$route.query.newvalue;
      }
    }
  },
  created() {
    this.listRepeatProcess();
    setTimeout(() => {
      this.initUploader();
    }, 1000);
  }
};
</script>
