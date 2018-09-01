<template>
  <div class="personalFile">
    <h3>{{$t('formTitle.personaTitle')}}</h3>
    <form class="personalFile_form" action="" method="post" onsubmit='return false'>
      <div class="name">
        <p>
          <label for="nicknamesignup" class="nickname" data-icon="u">
            <i class="gl_required_class">*</i>{{$t('formTitle.nikname')}}</label>&nbsp;&nbsp;&nbsp;
          <input id="nicknamesignup" name="nicknamesignup" required="required" type="text" :placeholder="$t('formTitle.nikname')" />
        </p>
        <p>
          <label for="truenamesignup" class="truename" data-icon="u">
            <i class="gl_required_class">*</i>{{$t('formTitle.name')}}</label>&nbsp;&nbsp;&nbsp;
          <input id="truenamesignup" name="truenamesignup" required="required" type="text" :placeholder="$t('formTitle.name')" />
        </p>
        <p>
          <label for="phonesignup" class="phone" data-icon="u">
            <i class="gl_required_class">*</i>{{$t('formTitle.phone')}}</label>&nbsp;&nbsp;&nbsp;
          <input id="phonesignup" name="phonesignup" required="required" type="text" :placeholder="$t('formTitle.phone')" />
        </p>
        <p @click="getSelectItem('country')">
          <label for="countrysignup" class="country" data-icon="u">
            <i class="gl_required_class">*</i>{{$t('formTitle.country')}}</label>&nbsp;&nbsp;&nbsp;
          <input id="countrysignup" name="countrysignup" required="required" type="text" :placeholder="$t('formTitle.country')" readonly='readonly' disabled='disabled' />
        </p>
        <p @click="getSelectItem('city')">
          <label for="citysignup" class="city" data-icon="u">
            <i class="gl_required_class">*</i>{{$t('formTitle.city')}}</label>&nbsp;&nbsp;&nbsp;
          <input id="citysignup" name="citysignup" required="required" type="text" :placeholder="$t('formTitle.city')" readonly='readonly' disabled='disabled' />
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
          <li v-for="(item,index) in educationValue" @click='showEducationDetail(item)' :key='index'>
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
        <input id="hobbysignup" type="text" name="" value="" placeholder='请输入'>
      </p>
      <p id='' @click='selectHelpType'>
        <label for="">
          <i class="gl_required_class">*</i>{{$t('formTitle.helpAvailable')}}:</label>
        <input type="text" name="" :value="selectHelpTypeValue" id="offerhelpsignup" placeholder='请选择' readonly='readonly' disabled='disabled' style='text-align:center'>
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
          <input id="schoolsignup" name="schoolsignup" required="required" type="text" :readonly='showEducationValue' />
        </p>
        <p @click='openPicker' id="schooldatesignup_p">
          <label for="schooldatesignup" class="schooldate" data-icon="u">{{$t('formTitle.schooldate')}}</label>&nbsp;&nbsp;&nbsp;
          <input id="schooldatesignup" required="required" type="text" placeholder="" readonly='readonly' />
        </p>
        <p>
          <label for="schoolprofessionalsignup" class="professional" data-icon="u">{{$t('formTitle.major')}}</label>&nbsp;&nbsp;&nbsp;
          <input id="schoolprofessionalsignup" name="schoolprofessionalsignup" required="required" type="text" :readonly='showEducationValue' />
        </p>
        <p>
          <label for="schoolgradesignup" class="grade" data-icon="u">{{$t('formTitle.schoolclass')}}</label>&nbsp;&nbsp;&nbsp;
          <input id="schoolgradesignup" name="schoolgradesignup" required="required" type="text" :readonly='showEducationValue' />
        </p>
        <p class="confirm_add" v-if="!showEducationValue">
          <input type="button" :value="$t('button.confirm')" @click='addOneEducation()' />
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
import { DatetimePicker } from "mint-ui";
Vue.component(DatetimePicker.name, DatetimePicker);
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
      headerImgae: "",
      showTipsText: "",
      startDate: new Date("1970/01/01"),
      endDate: new Date("2100/12/31"),
      pickerValue: this.moment(new Date()).format("YYYY-MM-DD"),
      show: false,
      selectItem: [],
      listType: ""
    };
  },
  methods: {
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
        this.showTipsText = "请输入学校名称";
        setTimeout(() => {
          this.showTipsText = "";
        }, 1500);
        return;
      }
      if (!education.schooldate) {
        this.showTipsText = "请选择入学年份";
        setTimeout(() => {
          this.showTipsText = "";
        }, 1500);
        return;
      }
      if (!education.professional) {
        this.showTipsText = "请输入专业信息";
        setTimeout(() => {
          this.showTipsText = "";
        }, 1500);
        return;
      }
      if (!education.grade) {
        this.showTipsText = "请输入所在班级";
        setTimeout(() => {
          this.showTipsText = "";
        }, 1500);
        return;
      }
      this.educationFlag = false;
      this.$el.querySelector("#schoolsignup").value = "";
      this.$el.querySelector("#schooldatesignup").value = "";
      this.$el.querySelector("#schoolprofessionalsignup").value = "";
      this.$el.querySelector("#schoolgradesignup").value = "";
      this.educationValue.push(education);
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
    showEducationDetail(item) {
      this.showEducationValue = item;
      this.$el.querySelector("#schoolsignup").value = item.schoolname;
      this.$el.querySelector("#schooldatesignup").value = item.schooldate;
      this.$el.querySelector("#schoolprofessionalsignup").value =
        item.professional;
      this.$el.querySelector("#schoolgradesignup").value = item.grade;
    },
    countrySityCallBack(items, value) {
      this.show = false;
      this.selectItem = [];
      if (value) {
        if (items == "country") {
          this.country = value;
          this.$el.querySelector("#countrysignup").value = value;
          this.$el.querySelector("#citysignup").value = "";
        } else {
          this.$el.querySelector("#citysignup").value = value;
        }
      }
    },
    getSelectItem(key) {
      let url = "",
        _this = this,
        postData = {};
        this.show=true;
      if (key == "city" && this.country) {
        url = "/globalmate/rest/user/city";
        this.axios
          .get(
            this.ip +
              url +
              "?token=" +
              this.$route.query.token +
              "&countryregion=" +
              this.country,
            ""
          )
          .then(res => {
            if (res.success) {
              let result = res.data,
                resultArr = [];
              if (this.country == "中国") {
                resultArr = ["北京", "天津", "上海", "重庆"];
              }
              result.forEach(function(item, index) {
                resultArr.push(item.city);
              });
              _this.buildItem(resultArr, key);
            }
          })
          .catch(e => {
            this.showTipsText = e.msg;
            setTimeout(() => {
              this.showTipsText = "";
            }, 2000);
          });
      } else if (key == "country") {
        url = "/globalmate/rest/user/country";
        this.axios
          .get(this.ip + url + "?token=" + this.$route.query.token, "")
          .then(res => {
            if (res.success) {
              _this.buildItem(res.data, key);
            }
          })
          .catch(e => {
            this.showTipsText = e.msg;
            setTimeout(() => {
              this.showTipsText = "";
            }, 2000);
          });
      } else {
        this.showTipsText = "请先选择国家！";
        setTimeout(() => {
          this.showTipsText = "";
        }, 2000);
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
    submit() {
      let postData = {
        name: "",
        nikename: "",
        phone: "",
        country: "",
        city: "",
        pic: "",
        school: "",
        hobby: "",
        helpAvailable: "",
        id: this.userId
      };
      postData.nikename = this.$el.querySelector("#nicknamesignup").value;
      postData.name = this.$el.querySelector("#truenamesignup").value;
      postData.phone = this.$el.querySelector("#phonesignup").value;
      postData.country = this.$el.querySelector("#countrysignup").value;
      postData.city = this.$el.querySelector("#citysignup").value;
      postData.hobby = this.$el.querySelector("#hobbysignup").value;
      postData.school = JSON.stringify(this.educationValue);
      postData.helpAvailable = this.selectHelpTypeValue;
      postData.pic = this.headerImgae || "";
      for (var key in postData) {
        if (!postData[key] || postData[key] == "[]") {
          switch (key) {
            case "name":
              this.showTipsText = "请输入您的真实姓名";
              break;
            case "nikname":
              this.showTipsText = "请输入您的昵称";
              break;
            case "phone":
              this.showTipsText = "请选择您的联系方式";
              break;
            case "country":
              this.showTipsText = "请选择您的国家";
              break;
            case "city":
              this.showTipsText = "请选择您所在城市";
              break;
            case "school":
              this.showTipsText = "请填写您的圈子（例如：毕业大学）";
              break;
            case "helpAvailable":
              this.showTipsText = "请设置您可提供的帮助";
              break;
            case "hobby":
              this.showTipsText = "请填写您的兴趣爱好";
              break;
            case "pic":
              this.showTipsText = "请上传头像";
              break;
            default:
          }
          setTimeout(() => {
            this.showTipsText = "";
          }, 2000);
          return;
        }
      }
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
            window.history.back(-1);
          }
        })
        .catch(e => {});
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
      this.axios
        .get(
          this.ip +
            "/globalmate/rest/file/ossPolicy" +
            "?token=" +
            this.$route.query.token,
          ""
        )
        .then(res => {
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
        browse_button: "uploader_header", //触发文件选择对话框的按钮，为那个元素id
        url: "http://ncc-ys-prod-oss-xingjjc.oss-cn-beijing.aliyuncs.com/", //服务器端的上传页面地址
        flash_swf_url: "../libs/plupload/Moxie.swf", //swf文件，当需要使用swf方式进行上传时需要配置该参数
        silverlight_xap_url: "../libs/plupload/Moxie.xap" //silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
      });
      this.fileUploader.bind("FilesAdded", function(uploader, files) {
        for (var i = 0, len = files.length; i < len; i++) {
          var file_name = files[i].name;
          !(function(i) {
            _this.previewImage(files[i], function(imgsrc) {
              $("#uploader_header")
                .find("img")
                .attr("src", imgsrc);
            });
          })(i);
        }
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
        _this.headerImgae = ossMap.host + "/" + _this.multipart_params.key;
      });
      this.fileUploader.init();
      setTimeout(() => {
        this.uploadAttr();
      }, 1000);
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
    }
  },

  activated() {
    this.selectFlag = false;
    this.educationFlag = false;
    this.showEducationValue = false;
    this.axios.get(this.ip + "/globalmate/rest/user/getUserByToken" +"?token=" +this.$route.query.token,
        {}).then(res => {
        if (res.success) {
          let data = res.data;
          this.userId = data.id;
          if (data.school) {
            this.educationValue = JSON.parse(data.school);
          }
          if (data.name) {
            this.$el.querySelector("#truenamesignup").value = data.name;
          }
          if (data.phone) {
            this.$el.querySelector("#phonesignup").value = data.phone;
          }
          if (data.country) {
            this.$el.querySelector("#countrysignup").value = data.country;
            this.country=data.country;
          }
          if (data.city) {
            this.$el.querySelector("#citysignup").value = data.city;
          }
          if (data.nikename) {
            this.$el.querySelector("#nicknamesignup").value = data.nikename;
          }
          if (data.hobby) {
            this.$el.querySelector("#hobbysignup").value = data.hobby;
          }
          if (data.helpAvailable) {
            this.selectHelpTypeValue = data.helpAvailable;
          }
          if (data.pic) {
            this.headerImgae = data.pic;
          }
        }
      }).catch(e => {
        console.log(e);
      });
  },
  deactivated () {
    this.show=false;
    this.selectItem=[];
  },
  created() {
    this.selectFlag = false;
    this.educationFlag = false;
    this.showEducationValue = false;
    this.selectFlag = false;
    setTimeout(() => {
      this.initUploader();
    }, 500);
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
  height: 34px;
  line-height: 34px;
  box-sizing: border-box;
  border: 1px solid #eee;
  padding: 0 0.2rem;
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
