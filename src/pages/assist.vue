<template>
  <div class="assist">
    <div class="body">
      <div class="main_view">
        <div class="main_view_repeat" v-for="(item,index) in listRepeat" :key='index'>
          <List :itemRepeat='item' :clickCallBack='clickCallBack' v-if="item.key!=='date'"></List>
          <dateInterview :itemRepeat='item' :clickCallBack='clickCallBack' v-if="item.key=='date'"></dateInterview>
        </div>
      </div>
      <div class="main_style">
        <Reward :itemRepeat='myReward' :clickCallBack='clickCallBack'></Reward>
      </div>
      <div class="main_decription">
        <div class="main_decription_title">
          <List :itemRepeat='title' :clickCallBack='clickCallBack'></List>
        </div>
        <div class="main_decription_area">
          <textarea name="name" :placeholder="$t('formTitle.descriptionTips')" style='width:100%' v-model='description'></textarea>
        </div>
        <div class="main_decription_uploader">
          <div class="hide_space">
            <div class="main_decription_uploader_container_img" v-for="(item,index) in filesHasUpload" :key='index' @click='removeItem(index)'>
              <img :src="item" class="prev_imgae" alt="">
            </div>
            <div class="main_decription_uploader_container" @click='chosenImage'>
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
    <mt-actionsheet
      :actions="actions"
      v-model="removeShow">
    </mt-actionsheet>

  </div>
</template>

<script>
import List from "../components/list.vue";
import indexList from "../components/indexList.vue";
import dateInterview from "../components/dateInterview.vue";
import Reward from "../components/reward.vue";
import Vue from "vue";
import loading from "../components/loading.vue";
import { Toast, Actionsheet } from "mint-ui";
Vue.component(Toast.name, Toast);
Vue.component(Actionsheet.name, Actionsheet);
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
      listType: "",
      country: "",
      showTipsText: "",
      loadingShow: true,
      isEditType: false,
      removeShow: false,
      actions: [{
        name: this.$t('button.delete'),
        method: this.removePic
      }, {
        name: this.$t('button.preview'),
        method: this.previewImg
      }],
      removeIndex: undefined,
      description: '',
    };
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
    },
    removeShow (val) {
      if (!val) {
        this.removeIndex = undefined
      }
    }
  },
  components: {
    List,
    Toast,
    indexList,
    loading,
    dateInterview,
    Reward
  },
  methods: {
    removeItem(index) {
      this.removeShow = true
      this.removeIndex = index
    },
    // 点击发布按钮逻辑
    publish() {
      let postData = this.getListData();
      this.submitUrl = "/globalmate/rest/need/addCommon";

      if (postData&&!this.isSubmiting) {
          this.isSubmiting=true;
        this.loadingShow = true;
        this.axios
          .post(
            this.ip + this.submitUrl + "?token=" + this.userInfo["token"],
            postData
          )
          .then(res => {
            if (res.success) {
              this.loadingShow = false;
              Toast({
                message: this.$t('totastTips.submitedSuccess'),
                duration: 2000
              });
               setTimeout(() => {
                   window.history.go(-1);
                   this.isSubmiting=false;
                }, 1500);
            } else {
              Toast({
                message: res.msg,
                duration: 2000
              });
            }
          })
          .catch(e => {
              this.isSubmiting=false;
            console.log(e);
          });
      }
    },
    clickCallBack(item, e) {
      let _this = this;
      if (!item.type) {
        if (item.key === "date") {
            this.selectCallBack(e, item);
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
      let _this = this;
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
          this.listRepeat.forEach(function(item, index) {
            if (item.key === "date") {
              if (item.key === selectItem.key &&item.componentKey === selectItem.componentKey) {
                  if(value.length==1){
                      item.starttime = value[0];
                      item.endtime = '';
                      item.isPlacehold = false;
                  }else{
                      item.starttime = value[0];
                      item.endtime = value[1];
                      item.isPlacehold = false;
                  }
              }
            } else {
              if (item.key === selectItem.key) {
                item.text = value;
                item.isPlacehold = false;
              }
            }
          });
          break;
      }
    },
    countrySityCallBack(items, value) {
      this.show = false;
      this.selectItem = [];
      let _this = this;
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
      let lang = navigator.language || "zh-CN";
      let isEN = /^zh/.test(lang)
        ? false
        : /^en/.test(lang) ? true : /^es/.test(lang) ? true : true;
      if (key == "city" && this.country) {
           this.listType = key;
           this.show=true;
        url = "/globalmate/rest/user/cityWithInitials";
        this.axios
          .get(this.ip + url, {
            params: {
              token: this.userInfo.token,
              countryregion: this.country,
              isEN: isEN
            }
          })
          .then(res => {
            if (res.success) {
              let list=[],obj={};
              for(var key in res.data){
                  obj={};
                  obj['letter']=key;
                  obj['list']=res.data[key];
                  if (this.country == "中国" || this.country == "China") {
                    if(key==='B'){
                        obj['list'].unshift({
                            city:this.$t("city.Beijing"),
                            cityInitials:'B',
                            countryInitials:'',
                            countryregion:'',
                            id:'',
                            state:''
                        })
                    }
                    if(key==='C'){
                        obj['list'].unshift({
                            city:this.$t("city.Chongqing"),
                            cityInitials:'C',
                            countryInitials:'',
                            countryregion:'',
                            id:'',
                            state:''
                        })
                    }
                    if(key==='S'){
                        obj['list'].unshift({
                            city:this.$t("city.Shanghai"),
                            cityInitials:'S',
                            countryInitials:'',
                            countryregion:'',
                            id:'',
                            state:''
                        })
                    }
                    if(key==='T'){
                        obj['list'].unshift({
                            city:this.$t("city.Tianjin"),
                            cityInitials:'T',
                            countryInitials:'',
                            countryregion:'',
                            id:'',
                            state:''
                        })
                    }
                  }
                  list.push(obj);
              }
              let city=this.getHotCity(this.country);
              list.unshift(city);
              this.selectItem = list;
            }
          })
          .catch(e => {
            Toast({
              message: e.msg,
              duration: 2000
            });
          });
      } else if (key == "country") {
          this.listType = key;
          this.show=true;
        url = "/globalmate/rest/user/countryWithInitials";
        this.axios
          .get(this.ip + url, {
            params: {
              token: this.userInfo.token,
              isEN: isEN
            }
          })
          .then(res => {
            if (res.success) {
                let list=[],obj={};
                for(var key in res.data){
                    obj={};
                    obj['letter']=key;
                    obj['list']=res.data[key];
                    list.push(obj);
                }
                let hotcity=this.getCountryHot();
                list.unshift(hotcity);
                this.selectItem = list;
            }
          })
          .catch(e => {
            Toast({
              message: e.msg,
              duration: 2000
            });
          });
      } else {
        Toast({
          message: this.$t('totastTips.selectCountry'),
          duration: 2000
        });
      }
    },
    getCountryHot() {
      let obj = {};
      obj["letter"] = this.$t('formTitle.hotCountry');
      obj['list']=[];
      let list = [
        this.$t("country.china"),
        this.$t("country.korea"),
        this.$t("country.japan"),
        this.$t("country.singapore"),
        this.$t("country.uk"),
        this.$t("country.us"),
        this.$t("country.thailand"),
        this.$t("country.vietnam"),
        this.$t("country.germany"),
        this.$t("country.canada"),
        this.$t("country.australia"),
        this.$t("country.france"),
        this.$t("country.malaysia")
      ];

      for(var i=0;i<list.length;i++){
          let commonObj={
              city:"",
              cityInitials:"",
              countryInitials:"",
              countryregion:"埃及",
              id:"",
              state:""
          }
          commonObj.countryregion=list[i];
          obj['list'].push(commonObj);
      }
      return obj;
    },
    getHotCity(country) {
      let obj = {},list=[];
      obj["letter"] = this.$t('formTitle.hotCity');;
      obj['list']=[];
      switch (country) {
        case "中国":
          list = [
            this.$t("city.Beijing"),
            this.$t("city.Shanghai"),
            this.$t("city.Guangzhou"),
            this.$t("city.Shenzhen"),
            this.$t("city.Hongkong"),
            this.$t("city.Macow"),
            this.$t("city.Taipei"),
            this.$t("city.Hangzhou"),
            this.$t("city.Xiamen"),
            this.$t("city.Nanjing"),
            this.$t("city.Qingdao"),
            this.$t("city.Chengdu"),
            this.$t("city.Chongqing"),
            this.$t("city.Tianjin"),
            this.$t("city.Dalian"),
            this.$t("city.Shenyang"),
            this.$t("city.Fuzhou"),
            this.$t("city.Kunming"),
            this.$t("city.Wuhan"),
            this.$t("city.Ningbo"),
            this.$t("city.Wuxi"),
            this.$t("city.Jinjiang"),
            this.$t("city.Sanya"),
            this.$t("city.Xian")
          ];
          break;
        case "China":
          list = [
            this.$t("city.Beijing"),
            this.$t("city.Shanghai"),
            this.$t("city.Guangzhou"),
            this.$t("city.Shenzhen"),
            this.$t("city.Hongkong"),
            this.$t("city.Macow"),
            this.$t("city.Taipei"),
            this.$t("city.Hangzhou"),
            this.$t("city.Xiamen"),
            this.$t("city.Nanjing"),
            this.$t("city.Qingdao"),
            this.$t("city.Chengdu"),
            this.$t("city.Chongqing"),
            this.$t("city.Tianjin"),
            this.$t("city.Dalian"),
            this.$t("city.Shenyang"),
            this.$t("city.Fuzhou"),
            this.$t("city.Kunming"),
            this.$t("city.Wuhan"),
            this.$t("city.Ningbo"),
            this.$t("city.Wuxi"),
            this.$t("city.Jinjiang"),
            this.$t("city.Sanya"),
            this.$t("city.Xian")
          ];
          break;
        case "韩国":
          list = [this.$t("city.Seoul"), this.$t("city.Busan")];
          break;
        case "Korea":
          list = [this.$t("city.Seoul"), this.$t("city.Busan")];
          break;
        case "日本":
          list = [
            this.$t("city.Tokyo"),
            this.$t("city.Nagoya"),
            this.$t("city.Osaka")
          ];
          break;
        case "Japan":
          list = [
            this.$t("city.Tokyo"),
            this.$t("city.Nagoya"),
            this.$t("city.Osaka")
          ];
          break;
        case "新加坡":
            list= [this.$t("city.Singapore")];
          break;
        case "Singapore":
          list = [this.$t("city.Singapore")];
          break;
        case "泰国":
          list = [this.$t("city.Bangkok")];
          break;
        case "Thailand":
          list = [this.$t("city.Bangkok")];
          break;
        case "越南":
          list = [this.$t("city.HoChiMinhCity")];
          break;
        case "Vietnam":
          list = [this.$t("city.HoChiMinhCity")];
          break;
        case "美国":
          list = [
            this.$t("city.NewYork"),
            this.$t("city.LosAngeles"),
            this.$t("city.Hawaii")
          ];
          break;
        case "US":
          list = [
            this.$t("city.NewYork"),
            this.$t("city.LosAngeles"),
            this.$t("city.Hawaii")
          ];
          break;

        case "德国":
          list= [this.$t("city.Frankfurt")];
          break;
        case "Germany":
          list= [this.$t("city.Frankfurt")];
          break;
        case "加拿大":
          list = [this.$t("city.Vancouver")];
          break;
        case "Canada":
          list = [this.$t("city.Vancouver")];
          break;
        case "英国":
          list= [this.$t("city.Landon")];
          break;
        case "UK":
          list= [this.$t("city.Landon")];
          break;
        case "澳大利亚":
          list = [this.$t("city.Sydney")];
          break;
        case "Australia":
          list = [this.$t("city.Sydney")];
          break;
        case "法国":
          list = [this.$t("city.Paris")];
          break;
        case "France":
          list = [this.$t("city.Paris")];
          break;
        case "马来西亚":
          list = [this.$t("city.KualaLumpur")];
          break;
        case "Malaysia":
          list= [this.$t("city.KualaLumpur")];
          break;
        default:
      }
      for(var i=0;i<list.length;i++){
          let commonObj={
              city:"",
              cityInitials:"",
              countryInitials:"",
              countryregion:"",
              id:"",
              state:""
          }
          commonObj.city=list[i];
          obj['list'].push(commonObj);
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
            message: listRepeat[i].title + this.$t('totastTips.requiredTips'),
            duration: 2000
          });
          return false;
        } else if (!listRepeat[i].isPlacehold) {
            if(listRepeat[i].key=='date'){
                postData['startTime'] = listRepeat[i].starttime;
                postData['endTime'] = listRepeat[i].endtime;
            }else{
                postData[listRepeat[i].componentKey] = listRepeat[i].text;
            }

        }
      }
      if (!this.myReward.isPlacehold) {
          let moneyType=$('.gl_reward_type').text();
          if(moneyType=='单位'||moneyType=='Currencies'){
              moneyType=this.$t('moneyType.chinaType');
          }
        postData[this.myReward.componentKey] = this.myReward.text+' '+moneyType;
      } else {
        hasParaRequired = true;
      }
      if (!this.title.isPlacehold) {
        postData[this.title.componentKey] = this.title.text;
      } else {
        Toast({
          message: this.title.title + this.$t('totastTips.requiredTips'),
          duration: 2000
        });
        return false;
      }
      postData["description"] = this.description;
      if (this.filesHasUpload.length !== 0) {
        postData["pic"] = this.filesHasUpload.filter(item => item.includes('http')).join(";");
      }
      postData["type"] = this.type;
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
        componentKey: "reward",
        rewardType:this.$t('moneyType.currency')
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
          starttime:'',
          endtime:'',
          isRequire: true,
          isPlacehold: true,
          componentKey: "startTime"
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
      this.axios
        .get(this.ip + "/globalmate/rest/need/list/" + id, {
          // onlyCurrentUser: true,
          params: {
            token: this.userInfo["token"],
            onlyCurrentUser: true
          }
        })
        .then(res => {
          if (res.success) {
            let data = res.data;
            this.listRepeatProcess();
            if(isNaN(data.conceretNeed.reward)){
                this.myReward.text = data.conceretNeed.reward&&data.conceretNeed.reward.split(' ')[0];
                this.myReward.rewardType = data.conceretNeed.reward&&data.conceretNeed.reward.split(' ')[1]||this.$t('moneyType.chinaType');
            }else{
                this.myReward.text = data.conceretNeed.reward;
            }

            this.myReward.isPlacehold = false;
            this.title.text = data.conceretNeed.title;
            this.title.isPlacehold = false;
            if (data.conceretNeed.pic) {
              this.filesHasUpload = data.conceretNeed.pic&&data.conceretNeed.pic.split(';')
            }
            this.listRepeat.forEach(function(item, index) {
              if (item.componentKey == "country" && data.conceretNeed.country) {
                item.text = data.conceretNeed.country;
                _this.country = data.conceretNeed.country;
                item.isPlacehold = false;
              }
              if (item.componentKey == "city" && data.conceretNeed.city) {
                item.text = data.conceretNeed.city;
                item.isPlacehold = false;
              }
              if (item.componentKey == "startTime" &&data.conceretNeed.startTime) {
                  item.starttime = _this.moment(data.conceretNeed.startTime).format("YYYY-MM-DD");
                  item.endtime = _this.moment(data.conceretNeed.endTime).format("YYYY-MM-DD");
                  item.isPlacehold = false;
              }
              if (data.conceretNeed.description) {
                _this.$el.querySelector(".main_decription_area textarea").value =data.conceretNeed.description;
              }
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    removePic () {
      this.removeShow = false
      if (this.removeIndex !== undefined) {
        this.filesHasUpload.splice(this.removeIndex, 1)
        this.removeIndex = undefined
      }
    },
    previewImg () {
      wx.previewImage({
        current: this.filesHasUpload[this.removeIndex], // 当前显示图片的http链接
        urls: this.filesHasUpload // 需要预览的图片http链接列表
      });
      this.removeIndex = undefined
    },
    uploadAttr() {
      const ua = navigator.userAgent.toLowerCase();
      const isIos = ua.indexOf("iphone") != -1 || ua.indexOf("ipad") != -1; //判断是否是苹果手机，是则是true
      if (this.fileUploader) {
        if (isIos) {
          $("input:file").removeAttr("capture");
        }
      } else {
        this.timer2 = setInterval(() => {
          if (this.fileUploader) {
            if (isIos) {
              $("input:file").removeAttr("capture");
            }
            clearInterval(this.timer2);
          }
        }, 300);
      }
    },
    loadOssPolicy(ossMap, callback) {
      this.axios
        .get(`${this.ip}/globalmate/rest/file/ossPolicy`, {
          params: {
            token: this.userInfo.token
          }
        })
        .then(res => {
          if (res.success) {
            ossMap.accessid = res.data.accessid;
            ossMap.policy = res.data.policy;
            ossMap.signature = res.data.signature;
            ossMap.key = res.data.dir;
            ossMap.host = res.data.host;
            ossMap.success_action_status = 200;
            callback.call(this);
          }
        })
        .catch(e => {});
    },
    uploadToAli(localData) {
      let form = new FormData();
      let array = [];
      let bytes = window.atob(localData.split(",")[1]);
      let blob;
      try {
        for (let i = 0; i < bytes.length; i++) {
          array.push(bytes.charCodeAt(i));
        }
        blob = new Blob([new Uint8Array(array)], { type: "image/jpeg" });
      } catch (e) {}
      let obj = {};
      this.loadOssPolicy(obj, () => {
        let ran = Date.now();
        form.append("key", obj.key + "_" + ran + ".jpg");
        form.append("policy", obj.policy);
        form.append("OSSAccessKeyId", obj.accessid);
        form.append("success_action_status", "200");
        form.append("signature", obj.signature);
        form.append("file", blob, ran + ".jpg");
        let url = `${obj.host}${obj.host.endsWith("/") ? "" : "/"}${obj.key + "_" + ran + ".jpg"}`;
        this.axios.post(obj.host, form, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }).then(res => {
            // this[key] = url;
            this.filesHasUpload.some((item, index) => {
              if (item === localData) {
                this.filesHasUpload[index] = url
              }
            })
            // this.filesHasUpload[len] = url
          });
      });
    },
    getImgBase64 (localId) {
      wx.getLocalImgData({
        localId, // 图片的localID
        success: res => {
          var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
          if (localData.indexOf("data:image") != 0) {
            localData = "data:image/jpeg;base64," + localData;
          }
          localData = localData.replace(/\r|\n/g, "").replace("data:image/jgp", "data:image/jpeg");
          this.filesHasUpload.push(localData);
          this.uploadToAli(localData);
        }
      });
    },
    chosenImage () {
      wx.chooseImage({
        count: 9, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          // let len = this.filesHasUpload.length;
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          localIds.forEach(item => {
            this.getImgBase64(item)
          })
          return;
          // wx.getLocalImgData({
          //   localId: localIds[0], // 图片的localID
          //   success: res => {
          //     var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
          //     if (localData.indexOf("data:image") != 0) {
          //       localData = "data:image/jpeg;base64," + localData;
          //     }
          //     localData = localData.replace(/\r|\n/g, "").replace("data:image/jgp", "data:image/jpeg");
          //     this.filesHasUpload.push(localData);
          //     this.uploadToAli(localData);
          //   }
          // });
        }
      });
    }
  },
  activated() {
    this.show = false;
    this.filesHasUpload = [];
    this.selectItem = [];
    this.type = this.$route.query.key;
    $(".repeat_content input").val("");
    this.description = '';
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
  created() {
    this.listRepeatProcess();
  }
};
</script>
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
