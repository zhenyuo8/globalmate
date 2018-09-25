<template>
  <div class="personalFile">
    <h3>{{$t('formTitle.personaTitle')}}</h3>
    <form class="personalFile_form" action="" method="post" onsubmit='return false'>
      <div class="name">
        <p>
          <label for="nicknamesignup" class="nickname" data-icon="u">
            <i class="gl_required_class">*</i>{{$t('formTitle.nikname')}}</label>&nbsp;&nbsp;&nbsp;
          <input id="nicknamesignup" name="nicknamesignup" required="required" type="text" :placeholder="$t('formTitle.nikname')" v-model='userMsg.nickName' />
        </p>
        <p>
          <label for="truenamesignup" class="truename" data-icon="u">
            <i class="gl_required_class">*</i>{{$t('formTitle.name')}}</label>&nbsp;&nbsp;&nbsp;
          <input id="truenamesignup" name="truenamesignup" required="required" type="text" :placeholder="$t('formTitle.name')" v-model='userMsg.name' />
        </p>
        <p>
          <label for="phonesignup" class="phone" data-icon="u">
            <i class="gl_required_class">*</i>{{$t('formTitle.phone')}}</label>&nbsp;&nbsp;&nbsp;
          <input id="phonesignup" name="phonesignup" required="required" type="number" :placeholder="$t('formTitle.phone')" v-model='userMsg.phone' />
        </p>
        <p @click="getSelectItem('country')">
          <label for="countrysignup" class="country" data-icon="u">
            <i class="gl_required_class">*</i>{{$t('formTitle.country')}}</label>&nbsp;&nbsp;&nbsp;
          <input id="countrysignup" name="countrysignup" required="required" type="text" :placeholder="$t('formTitle.country')" readonly='readonly' disabled='disabled' v-model='userMsg.country' />
        </p>
        <p @click="getSelectItem('city')">
          <label for="citysignup" class="city" data-icon="u">
            <i class="gl_required_class">*</i>{{$t('formTitle.city')}}</label>&nbsp;&nbsp;&nbsp;
          <input id="citysignup" name="citysignup" required="required" type="text" :placeholder="$t('formTitle.city')" readonly='readonly' disabled='disabled' v-model='userMsg.city' />
        </p>
      </div>
      <div class="image">
        <div class="" id="uploader_header" @click='uploadImage'>
          <img v-if="!headerImgae" class="icon-user image_span" src='../assets/images/icon.png' />
          <img v-if="headerImgae" class='image_span' :src="headerImgae" alt="">
          <!-- <span class="icon-user image_span"></span> -->
          <button type="button" name="button">{{$t('formTitle.portrait')}}</button>
        </div>
      </div>
    </form>
    <div class="personalFile_school">
      <div class="personalFile_school_add" @click='fillEducation'>
        <ul>
          <li v-for="(item,index) in educationValue" @click='showEducationDetail(item,index)' :key='index'>
            <span class="fl">{{item.schoolname}}</span>
            <span class="fr icon-arrow_right_samll">{{item.schooldate}}</span>
          </li>
        </ul>
        <!-- <span style="font-size:20px;">+</span> -->
        <span style="color:#26a2ff"> + {{$t('formTitle.education')}}</span>
      </div>
    </div>
    <div class="personalFile_hobby">
      <span class="personalFile_hobby_title">{{$t('formTitle.pfrofile')}}</span>
      <p>
        <label for="">
          <i class="gl_required_class">*</i>{{$t('formTitle.intrest')}}:</label>
        <input id="hobbysignup" v-model='userMsg.hobby' type="text" name="" value="" :placeholder="$t('formTitle.inputPlace')">
      </p>
      <p id='' @click='selectHelpType'>
        <label for="">
          <i class="gl_required_class">*</i>
          {{$t('formTitle.helpAvailable')}}:</label>
        <input type="text" name="" :value="selectHelpTypeValue" id="offerhelpsignup" :placeholder="$t('formTitle.selectPlace')" readonly='readonly' disabled='disabled' style='text-align:center'>
      </p>
    </div>
    <div class="submitbtn" @click='submit'>
      <button type="button" name="button">{{$t('button.submit')}}</button>
    </div>
    <div :class="selectFlag?'select_in':'select_out'">
      <ul class="list_ul">
        <li v-for="(item,index) in list" @click='selectItemType(item,index)' :key='index'>
          <span class="list_item">{{item}}</span>
          <span class="icon-checkbox"></span>
        </li>
      </ul>
      <div class="buttom_action">
        <span class="cancel" @click='cancel'>{{$t('button.cancel')}}</span>
        <span class="confirm" @click='confirm'>{{$t('button.confirm')}}</span>
      </div>
    </div>
    <div class="fillin_education" :class="educationFlag?'education_in':'education_out'" @click="hideThisModule($event)">
      <form class="" action="" method="post" onsubmit='return false'>
        <p>
          <label for="schoolsignup" class="schoolname" data-icon="u">{{$t('formTitle.schoolname')}}</label>&nbsp;&nbsp;&nbsp;
          <input id="schoolsignup" name="schoolsignup" required="required" type="text"  />
        </p>
        <p @click='openPicker' id="schooldatesignup_p">
          <label for="schooldatesignup" class="schooldate" data-icon="u">{{$t('formTitle.schooldate')}}</label>&nbsp;&nbsp;&nbsp;
          <input id="schooldatesignup" required="required" type="text" placeholder="" readonly='readonly' />
        </p>
        <p>
          <label for="schoolprofessionalsignup" class="professional" data-icon="u">{{$t('formTitle.major')}}</label>&nbsp;&nbsp;&nbsp;
          <input id="schoolprofessionalsignup" name="schoolprofessionalsignup" required="required" type="text" />
        </p>
        <p>
          <label for="schoolgradesignup" class="grade" data-icon="u">{{$t('formTitle.schoolclass')}}</label>&nbsp;&nbsp;&nbsp;
          <input id="schoolgradesignup" name="schoolgradesignup" required="required" type="text"  />
        </p>
        <p class="confirm_add">
          <input  v-if='!showEducationValue' type="button" :value="$t('button.confirm')" @click='addOneEducation()' />
          <input v-if='showEducationValue' type="button" :value="$t('button.edit')" @click='addOneEducation()' />
        </p>

      </form>
    </div>
    <indexList :class="show?'list_show':'list_hide'" :selectItem='selectItem' :countrySityCallBack='countrySityCallBack' :listType='listType'></indexList>
    <mt-datetime-picker ref="picker" type="date" :startDate="startDate" :endDate="endDate" :cancelText="$t('button.cancel')" :confirmText="$t('button.confirm')" @confirm="handleConfirm" v-model="pickerValue">
    </mt-datetime-picker>
  </div>
</template>

<script>
import indexList from "../components/indexList.vue";
import Vue from "vue";
import { DatetimePicker, Toast } from "mint-ui";
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Toast.name, Toast);
import userMix from "../mixins/userInfo";
export default {
  mixins: [userMix],
  components: {
    DatetimePicker,
    indexList
  },
  data() {
    return {
      list: [
        this.$t("formName.study"),
        this.$t("formName.textbook"),
        this.$t("formName.formality"),
        this.$t("formName.exchange"),
        this.$t("formName.medical"),
        this.$t("formName.carry"),
        this.$t("formName.rent"),
        this.$t("formName.accompany"),
        this.$t("formName.daigou"),
        this.$t("formName.other")
      ],
      selectFlag: false,
      type_list: [],
      hasSelect_list: [],
      selectHelpTypeValue: "",
      headerImgae: "",
      educationFlag: false,
      educationValue: [],
      showEducationValue: false,
      userId: "",
      showTipsText: "",
      startDate: new Date("1970/01/01"),
      endDate: new Date("2100/12/31"),
      pickerValue: this.moment(new Date()).format("YYYY-MM-DD"),
      show: false,
      selectItem: [],
      listType: "",
      userMsg: {
        nickName: '',
        name: '',
        phone: '',
        country: '',
        city: '',
        hobby: ''
      }
    };
  },
  methods: {
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
        let url = `${obj.host}${obj.host.endsWith("/") ? "" : "/"}${obj.key +
          "_" +
          ran +
          ".jpg"}`;
        this.axios
          .post(obj.host, form, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(res => {
            this.headerImgae = url;
          });
      });
    },
    uploadImage() {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          if (!this.isIOS) {
            this['headerImgae'] = localIds[0];
          }
          wx.getLocalImgData({
            localId: localIds[0], // 图片的localID
            success: res => {
              var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
              if (localData.indexOf("data:image") != 0) {
                //判断是否有这样的头部
                localData = "data:image/jpeg;base64," + localData;
              }
              localData = localData
                .replace(/\r|\n/g, "")
                .replace("data:image/jgp", "data:image/jpeg");
              this['headerImgae'] = localData;
              this.uploadToAli(localData);
            }
          });
        }
      });
    },
    openPicker() {
      this.$refs.picker.open();
    },
    handleConfirm(value) {
      value = this.moment(value).format("YYYY-MM-DD");
      this.$el.querySelector("#schooldatesignup").value = value;
    },
    selectHelpType() {
      this.selectFlag = true;
    },
    selectItemType(item, index) {
      if ($($(".list_ul li")[index]).hasClass("select")) {
        $($(".list_ul li")[index]).removeClass("select");
      } else {
        $($(".list_ul li")[index]).addClass("select");
      }
      let someType = this.type_list.some(function(itm, inx) {
        return itm === item;
      });
      if (someType) {
        for (var i = 0; i < this.type_list.length; i++) {
          if (this.type_list[i] === item) {
            this.type_list.splice(i, 1);
          }
          if (this.hasSelect_list[i] === index) {
            this.hasSelect_list.splice(i, 1);
          }
        }
      } else {
        this.type_list.push(item);
        this.hasSelect_list.push(index);
      }
    },
    cancel() {
      this.selectFlag = false;
      if (this.type_list.length > 0) {
        for (var i = 0; i < this.hasSelect_list.length; i++) {
          $($(".list_ul li")[this.hasSelect_list[i]]).removeClass("select");
        }
      }
      this.selectHelpTypeValue = "";
      this.type_list = [];
    },
    confirm() {
      this.selectHelpTypeValue = this.type_list.join("、");
      this.selectFlag = false;
    },
    fillEducation() {
      this.educationFlag = true;
    },
    addOneEducation() {
      let education = {
        schoolname: this.$el.querySelector("#schoolsignup").value,
        schooldate: this.$el.querySelector("#schooldatesignup").value,
        professional: this.$el.querySelector("#schoolprofessionalsignup").value,
        grade: this.$el.querySelector("#schoolgradesignup").value
      };
      if (!education.schoolname) {
       Toast({
         message: this.$t('formTitle.schoolname')+this.$t('totastTips.requiredTips'),
         duration: 2000
       });
        return;
      }
      if (!education.schooldate) {
        Toast({
          message: this.$t('formTitle.schooldate')+this.$t('totastTips.requiredTips'),
          duration: 2000
        });
        return;
      }
      if (!education.professional) {
        Toast({
          message: this.$t('formTitle.major')+this.$t('totastTips.requiredTips'),
          duration: 2000
        });
        return;
      }
      if (!education.grade) {
          Toast({
            message: this.$t('formTitle.schoolclass')+this.$t('totastTips.requiredTips'),
            duration: 2000
          });
        return;
      }
      this.educationFlag = false;
      this.$el.querySelector("#schoolsignup").value = "";
      this.$el.querySelector("#schooldatesignup").value = "";
      this.$el.querySelector("#schoolprofessionalsignup").value = "";
      this.$el.querySelector("#schoolgradesignup").value = "";
      if(!this.showEducationValue){
          this.educationValue.push(education);
      }else{
          this.educationValue[this.showEducationValueIndex]=education
      }
    },
    hideThisModule(e) {
      if (e.target.className.indexOf("fillin_education") > -1) {
        this.educationFlag = false;
        this.showEducationValue = false;
        this.$el.querySelector("#schoolsignup").value = "";
        this.$el.querySelector("#schooldatesignup").value = "";
        this.$el.querySelector("#schoolprofessionalsignup").value = "";
        this.$el.querySelector("#schoolgradesignup").value = "";
      }
    },
    showEducationDetail(item,index) {
      this.showEducationValue = item;
      this.showEducationValueIndex = index;
      this.$el.querySelector("#schoolsignup").value = item.schoolname;
      this.$el.querySelector("#schooldatesignup").value = item.schooldate;
      this.$el.querySelector("#schoolprofessionalsignup").value =item.professional;
      this.$el.querySelector("#schoolgradesignup").value = item.grade;
    },
    countrySityCallBack(items, value) {
      this.show = false;
      this.selectItem = [];
      if (value) {
        if (items == "country") {
          this.country = value;
          this.userMsg.country = value;
          this.userMsg.city = '';
        } else {
          this.userMsg.city = value;
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
      obj["letter"] = this.$t('formTitle.hotCity');
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
    submit() {
      let {nickName, name, phone, country, city, hobby} = this.userMsg;
      if (!nickName || !name || !phone || !country || !city || !hobby) {
        Toast({
          message: this.$t('totastTips.allRequiredTips'),
          duration: 1000
        })
        return;
      }
      if (this.headerImgae && !this.headerImgae.includes('http')) {
        Toast({
          message: this.$t('totastTips.waitUpload'),
          duration: 1000
        })
        return;
      }
      let postData = {
        pic: "",
        school: "",
        helpAvailable: "",
        id: this.userId
      };
      Object.assign(postData, {
        nickname: nickName,
        nikename: nickName,
        name,
        phone,
        country,
        city,
        hobby
      })
      postData.school = JSON.stringify(this.educationValue);
      postData.helpAvailable = this.selectHelpTypeValue;
      postData.pic = this.headerImgae || "";
      this.axios
        .put(
          this.ip +
            "/globalmate/rest/user/update/" +
            "?token=" +
            this.$route.query.token,
          postData
        )
        .then(res => {
          if (res.success) {
              this.loadCurrentUser(true);
              var isIdentify = this.userInfo["identified"];
              if (!isIdentify) {
                this.loadIsCertified(this.toIdentify.bind(this)); // 再次确认一下有没有认证，有可能存在刚好通过的情况
                return;
            }else{
                window.history.back(-1);
            }
          }
        })
        .catch(e => {});
    },
    loadIsCertified(callback) {
      this.axios
        .get(this.ip + "/globalmate/rest/certify/list", {
          params: {
            onlyCurrentUser: true,
            token: this.userInfo.token
          }
        })
        .then(res => {
          if (res.data && res.data.length) {
            let flag = res.data.some(item => item.isEffective == 1);
            this.updateUserInfo({
              certifyMsg: res.data,
              identified: flag // 判断是否通过认证了
            });
            if (!flag) {
              Toast({
                message: this.$t('totastTips.confirmIdentify'),
                duration: 1000
              });
              return;
            }
            !flag && callback && callback();
          } else {
            Toast({
              message: this.$t('totastTips.confirmIdentify'),
              duration: 1000
            });
          }
        });
    },
    toIdentify(){
        this.$router.push({
          path: "identify",
          query: {
            token: this.userInfo.token,
            id: "identify"
          }
        });
    },
    loadCurrentUser(params){
         this.axios.get(this.ip +"/globalmate/rest/user/getUserByToken",{
             params:{
                 token:this.userInfo.token
             }
         }).then(res => {
             if (res.success) {
               let data = res.data;
               if(params){
                //    window.history.back(-1);
                   this.updateUserInfo({
                     curUser: data,
                   });
               }else{
                   this.userId = data.id;
                   if (data.school) {
                     this.educationValue = JSON.parse(data.school);
                   }
                   this.userMsg.nickName = data.nickname || data.nikename || ""
                   this.userMsg.name = data.name || ""
                   this.userMsg.phone = data.phone || ""
                   this.userMsg.country = data.country || ""
                   this.userMsg.city = data.city || ""
                   this.userMsg.hobby = data.hobby;
                   this.selectHelpTypeValue = data.helpAvailable || "";
                   this.headerImgae = data.pic || '';
                   if(data.country){
                       this.country=data.country;
                   }
               }
             }
           })
           .catch(e => {
             console.log(e);
           });
    }

  },
  activated() {
    this.selectFlag = false;
    this.educationFlag = false;
    this.showEducationValue = false;
    this.loadCurrentUser();

  },
  deactivated() {
    this.show = false;
    this.selectItem = [];
  },
  created() {
    this.selectFlag = false;
    this.educationFlag = false;
    this.showEducationValue = false;
    this.selectFlag = false;
  }
};
</script>

<style scoped>
.personalFile {
  font-size: 14px;
  background: #eee;
  width: 7.5rem;
  height: 13.34rem;
  overflow-y: auto;
}
.personalFile h3 {
  background: #fff;
  height: 36px;
  line-height: 36px;
}
.personalFile_form {
  display: flex;
  background: #fff;
  margin-top: 10px;
  padding: 0 0.3rem 0.2rem;
}
.personalFile_form .name {
  margin-right: 0.4rem;
}
.personalFile_form .name p {
  display: flex;
  height: 32px;
  line-height: 32px;
  margin-top: 10px;
  position: relative;
}
.personalFile_form .name p label {
  width: 38%;
  text-align: justify;
  text-justify: inter-ideograph;
  text-align-last: justify;
  line-height: 32px;
  white-space: nowrap;
  /*text-overflow: ellipsis;*/
  overflow: hidden;
}
.personalFile_form .name p input {
  width: 60%;
  border: 1px solid #eee;
  padding: 0 0.2rem;
}
.image_span {
  display: inherit;
  width: 1.72rem;
  height: 1.72rem;
  border: 1px solid #999;
  border-radius: 50%;
  line-height: 1.72rem;
  font-size: 68px;
  background: #eee;
}
#uploader_header {
  margin-top: 50%;
}
#uploader_header button {
  margin-top: 10px;
}
.personalFile_school,
.submitbtn {
  margin-top: 10px;
  height: auto;
  background: #fff;
  /*height: 36px;*/
  line-height: 36px;
}
.personalFile_school_add {
  width: 90%;
  margin: auto;
}
.personalFile_school_add ul li {
  position: relative;
  height: 36px;
  color: #333;
  border-bottom: 1px solid #eee;
}
.icon-arrow_right_samll {
  line-height: 36px;
}
.icon-arrow_right_samll::before {
  float: right;
  color: #54698d;
}
.personalFile_hobby {
  margin-top: 10px;
  height: auto;
  background: #fff;
  padding: 0 0.3rem 0.2rem;
}
.personalFile_hobby p {
  height: 36px;
  line-height: 36px;
  margin-top: 10px;
  width: 100%;
}
.personalFile_hobby p label {
  width: 40%;
  margin-right: 0.1rem;
  text-align: justify;
  text-justify: inter-ideograph;
  text-align-last: justify;
  white-space: nowrap;
}
.personalFile_hobby p input {
  width: 50%;
  height: 34px;
  color: #333;
  padding: 0 0.2rem;
  border: 1px solid #eee;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
}
.personalFile_hobby .personalFile_hobby_title {
  font-size: 14px;
  display: inline-block;
  height: 34px;
  line-height: 34px;
  color: #26a2ff;
  width: 100%;
  border-bottom: 1px solid #26a2ff;
  text-align: center;
}
.submitbtn {
  height: 56px;
  line-height: 56px;
}
.submitbtn button {
  width: 90%;
  display: inline-block;
  background: #00adff;
  color: #fff;
  height: 36px;
  line-height: 36px;
  border-radius: 4px;
  font-size: 16px;
}
.personalFile .select_out {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 100%;
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
}
.personalFile .form .image {
  z-index: 1;
}
.personalFile .select_in {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 2;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
  background: #fff;
}
.personalFile .education_out {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  top: 100%;
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
}
.personalFile .education_in {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
  background: rgba(153, 153, 153, 0.8);
}
.icon-arrow_right_samll::before {
  font-size: 24px;
}
.personalFile .fillin_education form p {
  height: 36px;
  line-height: 36px;
  margin-top: 10px;
}
.personalFile .fillin_education form p:last-child {
  margin-bottom: 10px;
}
.personalFile .fillin_education form p input {
  box-sizing: border-box;
  border: 1px solid #eee;
  padding: 8px 0.2rem;
}
.personalFile .fillin_education form p label {
  width: 24%;
  text-align: left;
}
.personalFile .fillin_education form {
  width: 90%;
  background: #fff;
  position: absolute;
  top: 26%;
  left: 5%;
  border-radius: 6px;
}
.personalFile .confirm_add input {
  width: 87%;
  background: #26a2ff;
  color: #fff;
  border: none;
  font-size: 16px;
  border-radius: 5px;
}
.personalFile .list_ul {
  padding: 0 0.2rem;
}
.personalFile .list_ul li {
  height: 36px;
  line-height: 36px;
  border-bottom: 1px solid #eee;
  padding: 0 0.2rem;
}
.personalFile .list_ul .select .icon-checkbox {
  color: rgb(41, 182, 246);
}
.personalFile .list_ul li .list_item {
  float: left;
}
.personalFile .list_ul li .icon-checkbox {
  float: right;
  line-height: 36px;
  color: #999;
  font-size: 16px;
}
.personalFile .buttom_action {
  height: 46px;
  background: #fff;
  line-height: 46px;
  margin-top: 10px;
}
.personalFile .buttom_action span {
  display: inline-block;
  width: 40%;
  height: 36px;
  margin-left: 0.2rem;
  line-height: 36px;
  border-radius: 5px;
  color: #fff;
}
.personalFile .buttom_action .cancel {
  background: #b2b2b2;
}
.personalFile .buttom_action .confirm {
  background: rgb(41, 182, 246);
}
label i {
  color: red !important;
}
.list_show {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 7.5rem;
  z-index: 11111;
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
<style media="screen">
.moxie-shim {
  /*width: 1.5rem !important;*/
}
.mint-datetime .picker-slot {
  font-size: 14px;
}
.mint-datetime .mint-datetime-cancel {
  text-align: left;
  width: auto;
  margin-left: 0.2rem;
  color: #666;
}
.mint-datetime .mint-datetime-confirm {
  text-align: right;
  width: auto;
  margin-right: 0.2rem;
}
</style>
