<template>
  <div class="gl_list seek-help-list">
    <!--搜索框-->
    <searchInput :searchCallBack="searchCallBack" :childMsg='msg' v-if="!isSOS" @search='searchForContent'></searchInput>
    <div class="list_wrap" :class="{dataLoaded: allLoaded, notAllLoad: !allLoaded}">
        <mt-navbar v-model="selected">
            <mt-tab-item id="1" @click.native="TabChange('1')">{{$t('status.open')}}</mt-tab-item>
            <mt-tab-item id="2" @click.native="TabChange('2')">{{$t('status.complete')}}</mt-tab-item>
        </mt-navbar>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :bottomPullText="bottomPullText" :topDropText='topDropText' :topLoadingText='topLoadingText' :topPullText='topPullText' :bottomDropText='bottomDropText'>
           <mt-tab-container v-model="selected">
               <mt-tab-container-item id="1">
                   <div class="list_repeat" v-for="(item,index) in myAssistList" @click='showDetail(item)' :key='index'>
                     <div class="list_repeat_user">
                       <div class="image_user" @click.stop.prevent='goDetail($event,item)'>
                         <img :src="item.need.pic" alt="" class="gl_user_img">
                         <img :src="item.need.userTag=='vGold'?vGold:item.need.userTag=='vSilver'?vSilver:''" v-if="item.need.userTag&&item.need.userTag!='vCopper'" alt="" class="gl_cetifiy_medal">
                       </div>
                       <div class="name_user">
                         <span class="name">{{item.need.userName}}</span>
                         <span class="type">{{item.conceretNeed.tag}}</span>
                         <span class="type">{{$t('formTitle.reward')}}
                           <i style="color:red" v-if="!item.conceretNeed.reward">{{item.conceretNeed.rewardAmount}}</i>
                           <i style="color:red" v-if="item.conceretNeed.reward">{{item.conceretNeed.reward}}</i>
                         </span>
                       </div>
                       <div class="status_user">
                         <span :class="'status_'+item.need.enable">{{item.need.status}}</span>
                         <span class="created_time">{{item.need.time}}</span>
                       </div>
                     </div>
                     <p class="list_repeat_title"><span class="gl_title_color">{{$t('formTitle.head')}}：</span>{{item.conceretNeed.title}}</p>
                     <div class="list_repeat_img" v-if="item.conceretNeed.pic&&item.conceretNeed.pic.length!=0">
                       <div class="list_content_img" v-for="(items,indexs) in item.conceretNeed.pic" :key='indexs'>
                         <img :src="items" alt="" v-if="indexs<3" @click.stop.prevent='previewImage($event,items, item.conceretNeed.pic)'>
                       </div>
                     </div>
                     <div class="list_repeat_action" v-if="item.need.enable==1&&!item.self">
                       <span @click='goHelp($event,item)'>{{$t('button.gohelp')}}</span>
                     </div>
                   </div>
                   <div class="show_all_data" v-show="canNotLoadMore">
                     {{$t('allDataDisplayed')}}
                   </div>
               </mt-tab-container-item>
               <mt-tab-container-item id="2">
                   <div class="list_repeat" v-for="(item,index) in myAssistListDone" @click='showDetail(item)' :key='index'>
                     <div class="list_repeat_user">
                       <div class="image_user" @click.stop.prevent='goDetail($event,item)'>
                         <img :src="item.need.pic" alt="" class="gl_user_img">
                         <img :src="item.need.userTag=='vGold'?vGold:item.need.userTag=='vSilver'?vSilver:item.need.userTag=='vCopper'?vCopper:''" v-if="item.need.userTag" alt="" class="gl_cetifiy_medal">
                         <!-- <i class="gl_identify icon-globalmate5" v-if="item.need.userTag" :class="'gl_'+item.need.userTag"></i> -->
                       </div>
                       <div class="name_user">
                         <span class="name">{{item.need.userName}}</span>
                         <span class="type">{{item.conceretNeed.tag}}</span>
                         <span class="type">{{$t('formTitle.reward')}}
                           <i style="color:red" v-if="!item.conceretNeed.reward">{{item.conceretNeed.rewardAmount}}</i>
                           <i style="color:red" v-if="item.conceretNeed.reward">{{item.conceretNeed.reward}}</i>
                         </span>
                       </div>
                       <div class="status_user">
                         <span :class="'status_'+item.need.enable">{{item.need.status}}</span>
                         <span class="created_time">{{item.need.time}}</span>
                       </div>
                     </div>
                     <p class="list_repeat_title">{{$t('formTitle.head')}}：{{item.conceretNeed.title}}</p>
                     <div class="list_repeat_img" v-if="item.conceretNeed.pic&&item.conceretNeed.pic.length!=0">
                       <div class="list_content_img" v-for="(items,indexs) in item.conceretNeed.pic" :key='indexs'>
                         <img :src="items" alt="" v-if="indexs<3" @click.stop.prevent='previewImage($event,items, item.conceretNeed.pic)'>
                       </div>
                     </div>
                     <div class="list_repeat_action" v-if="item.need.enable==1&&!item.self">
                       <span @click='goHelp($event,item)'>{{$t('button.gohelp')}}</span>
                     </div>
                   </div>
                   <div class="show_all_data" v-show="canNotLoadMore">
                     {{$t('allDataDisplayed')}}
                   </div>
               </mt-tab-container-item>
           </mt-tab-container>
        </mt-loadmore>
        <div v-if="nodataFlag" class="yy_nodata_class" style="">
          <div class="yy_icon_img">
            <img src="../assets/images/business_nodata.png" alt="">
            <span class="yy_nodata_text">{{noDataTips}}</span>
          </div>
        </div>
    </div>

    

    <div class="mask" v-show="rightIn" @click="hideMask">
    </div>

    <div class="defindloadig" v-if="loadingShow">
      <loading></loading>
    </div>
    <div :class="rightIn?'slide_in_one':'slide_out_one'" class="filter_right">
      <form class="rightIn_form" action="" method="post" onsubmit='return false'>
        <div class="name">
          <p @click="getSelectItem('country')">
            <label for="countrysearch" class="country" data-icon="u">{{$t('formTitle.country')}}</label>&nbsp;&nbsp;&nbsp;
            <!-- <input v-model='searchCountry' id="countrysearch" name="countrysearch" required="required" type="text" :placeholder="$t('formTitle.country')" readonly='readonly' disabled='disabled' /> -->
            <span class='ipt'>
              <i class='remove' v-if='searchCountry' @click.capture.stop.prevent='searchCountry = "";searchCity=""'>x</i>
              <span>{{searchCountry}}</span>
            </span>
          </p>
          <p @click.capture="getSelectItem('city')">
            <label for="citysearch" class="city" data-icon="u">{{$t('formTitle.city')}}</label>&nbsp;&nbsp;&nbsp;
            <span class='ipt'>
              <i class='remove' v-if='searchCity' @click.capture.stop.prevent='searchCity = ""'>x</i>
              <span>{{searchCity}}</span>
            </span>
            <!-- <input v-model='searchCity' id="citysearch" name="citysearch" required="required" type="text" :placeholder="$t('formTitle.city')" readonly='readonly' disabled='disabled' /> -->
          </p>
          <p @click='selectHelpType'>
            <label for="typesearch" class="type" data-icon="u">{{$t('formTitle.type')}}</label>&nbsp;&nbsp;&nbsp;
            <input id="typesearch" name="typesearch" required="required" type="text" :placeholder="$t('formTitle.selectPlace')" readonly='readonly' disabled='disabled' :value="selectHelpTypeValue" />
          </p>
        </div>
      </form>
      <div class="action">
        <span class="cancel" @click='hideMask'>{{$t('button.cancel')}}</span>
        <span class="confirm" @click='confirmSearch'>{{$t('button.confirm')}}</span>
      </div>
      <div :class="selectFlag?'select_in':'select_out'">
        <ul class="list_ul">
          <li v-for="(item,index) in list" @click='selectItemType(item,index)' :key='index'>
            <span class="list_item">{{item}}</span>
            <span class="icon-checkbox"></span>
          </li>
        </ul>
        <div class="buttom_action" v-show="selectFlag">
          <span class="cancel" @click='cancel'>{{$t('button.cancel')}}</span>
          <span class="confirm" @click='confirm1'>{{$t('button.confirm')}}</span>
        </div>
      </div>
    </div>
    <indexList :class="show?'list_show':'list_hide'" :selectItem='selectItem' :countrySityCallBack='countrySityCallBack' :listType='listType'></indexList>
  </div>

</template>

<script>
import searchInput from "../components/searchInput.vue";
import loading from "../components/loading.vue";
import indexList from "../components/indexList.vue";
import {
  MessageBox,
  Toast,
  Loadmore,
  Navbar,
  TabItem,
  TabContainer,
  TabContainerItem
} from "mint-ui";
Vue.component(Loadmore.name, Loadmore);
Vue.component(Toast.name, Toast);
Vue.component(MessageBox.name, MessageBox);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);

import userMix from "../mixins/userInfo";
export default {
  name: "seekHelpList",
  mixins: [userMix],
  components: {
    searchInput,
    loading,
    indexList
  },
  data() {
    return {
      myAssistList: [],
      myAssistListDone: [],
      searchVal: "",
      msg: false,
      nodataFlag: false,
      noDataTips: "",
      rightIn: false,
      selectFlag: false,
      selectHelpTypeValue: "",
      type_list: [],
      hasSelect_list: [],
      list: [],
      searchContent: {
        type: "",
        where: ""
      },
      searchCountry: "",
      searchCity: "",
      isSOS: false,
      loadingShow: true,
      show: false,
      selectItem: [],
      listType: "",
      allLoaded: false,
      pageNum: 1,
      pageSize: 10,
      canNotLoadMore: false,
      bottomPullText: this.$t("loadText.loadMore"),
      topPullText: this.$t("loadText.refresh"),
      topLoadingText: this.$t("loadText.loading"),
      topDropText: "",
      bottomDropText: "",
      selected: "1",
      loadCompleted: false,
      vGold: require("../assets/images/vGold.png"),
      vSilver: require("../assets/images/vSilver.png"),
      vCopper: require("../assets/images/vCopper.png")
    };
  },
  methods: {
    TabChange(number) {
      this.pageNum = 1;
      this.canNotLoadMore = false;
      this.allLoaded = false;
      this.loadCompleted = false;
      if (number == "2") {
        this.loadCompleted = true;
        this.myAssistListDone = [];
        this.loadData();
      } else {
        this.myAssistList = [];
        this.loadData();
      }
    },
    searchForContent(val) {
      this.searchVal = val;
      this.pageNum = 1;
      this.loadTopFlag = true;
      this.loadData();
    },
    showDetail(item) {
      let _this = this;
      this.$router.push({
        path: "detail",
        query: {
          token: this.userInfo.token,
          title: item.conceretNeed.title,
          id: item.need.id,
          otherUserId: item.need.userId,
          userId: this.userInfo.userId
        }
      });
    },
    goDetail(e, item) {
      if(item.need.userId==this.userInfo.userId) return;
      this.$router.push({
        path: "im",
        query: {
          token: this.userInfo.token,
          toChartId: item.need.userId,
          id: item.need.id,
          currentuser: this.userInfo.userId,
        }
      });
    },
    goHelp(e, item) {
      e.preventDefault;
      e.cancelBubble = true;
      let _this = this;
      if (false) {
        //!this.completePersonal()
        MessageBox.confirm("", {
          title: "",
          message: this.$t("totastTips.warningIdentify"),
          confirmButtonText: _this.$t("button.confirm"),
          cancelButtonText: _this.$t("button.cancel"),
          showCancelButton: true
        })
          .then(action => {
            this.$router.push({
              path: "personalFile",
              query: {
                token: this.userInfo.token
              }
            });
          })
          .catch(cancel => {});
      } else if (false) {
        //this.userInfo&&!this.userInfo["identified"]
        MessageBox.confirm("", {
          title: "",
          message: this.$t("totastTips.warningIdentify"),
          confirmButtonText: _this.$t("button.confirm"),
          cancelButtonText: _this.$t("button.cancel"),
          showCancelButton: true
        })
          .then(action => {
            this.$router.push({
              path: "identify",
              query: {
                token: this.userInfo.token,
                id: "identify"
              }
            });
          })
          .catch(cancel => {});
      } else {
        if (item.need.enable != 1) {
          Toast({
            message: this.$t("totastTips.completedOrExecution"),
            duration: 2000
          });
          return;
        }
        this.getUserInfo(item.need.userId, function(data) {
          _this.$router.push({
            path: "im",
            query: {
              token: _this.userInfo.token,
              title: data.nikename,
              id: item.need.id,
              toChartUser: data.nikename,
              toChartId: item.need.userId,
              whoNeedHelf: item.need.userId,
              userId: _this.userInfo.userId
            }
          });
        });
      }
    },
    getUserInfo(userId, callback) {
      let url = "";
      if (this.$route.query.id === "sos") {
        url = "/globalmate/rest/assist/listSOS";
      } else {
        url = "/globalmate/rest/user/list/" + userId;
      }
      this.axios
        .get(this.ip + url + "/?token=" + this.userInfo.token, {})
        .then(res => {
          if (res && res.success && res.data) {
            callback(res.data);
          }
        })
        .catch(e => {});
    },
    hasReadAgreementYet() {
      let _this = this;
      MessageBox.confirm("", {
        title: "",
        message: this.$t("totastTips.notReadAgreement"),
        confirmButtonText: _this.$t("button.confirm"),
        cancelButtonText: _this.$t("button.cancel"),
        showCancelButton: true
      })
        .then(action => {
          _this.$router.go(-1);
        })
        .catch(cancel => {});
    },
    completePersonal() {
      let curUser = this.userInfo.curUser;
      let flag = true;
      for (var key in curUser) {
        if (
          key == "country" ||
          key == "city" ||
          key == "phone" ||
          key == "helpAvailable" ||
          key == "school" ||
          key == "name" ||
          key == "nikename"
        ) {
          if (!curUser[key]) {
            flag = false;
          }
        }
      }
      return flag;
    },

    searchCallBack(data) {
      this.msg = !this.msg;
      this.list = [
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
      ];
      this.rightIn = !this.rightIn;
    },
    hideMask() {
      this.rightIn = !this.rightIn;
      this.selectFlag = false;
    },
    confirmSearch() {
      this.nodataFlag = false;
      this.myAssistList = [];
      this.noDataTips = "";
      this.rightIn = !this.rightIn;
      this.searchContent = {};
      if (this.searchCountry || this.searchCity) {
        this.searchContent["where"] =
          this.searchCountry + "_" + this.searchCity;
      } else {
        this.searchContent["where"] = "";
      }
      this.myAssistList = [];
      this.loadData();
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
    confirm1() {
      this.selectHelpTypeValue = this.type_list.join("、");
      this.selectFlag = false;
    },
    countrySityCallBack(items, value) {
      this.show = false;
      this.selectItem = [];
      if (value) {
        if (items == "country") {
          this.country = value;
          this.searchCountry = value;
          this.searchCity = "";
        } else {
          this.searchCity = value;
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
        : /^en/.test(lang)
          ? true
          : /^es/.test(lang)
            ? true
            : true;
      if (key == "city" && this.country) {
        this.listType = key;
        this.show = true;
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
              let list = [],
                obj = {};
              for (var key in res.data) {
                obj = {};
                obj["letter"] = key;
                obj["list"] = res.data[key];
                if (this.country == "中国" || this.country == "China") {
                  if (key === "B") {
                    obj["list"].unshift({
                      city: this.$t("city.Beijing"),
                      cityInitials: "B",
                      countryInitials: "",
                      countryregion: "",
                      id: "",
                      state: ""
                    });
                  }
                  if (key === "C") {
                    obj["list"].unshift({
                      city: this.$t("city.Chongqing"),
                      cityInitials: "C",
                      countryInitials: "",
                      countryregion: "",
                      id: "",
                      state: ""
                    });
                  }
                  if (key === "S") {
                    obj["list"].unshift({
                      city: this.$t("city.Shanghai"),
                      cityInitials: "S",
                      countryInitials: "",
                      countryregion: "",
                      id: "",
                      state: ""
                    });
                  }
                  if (key === "T") {
                    obj["list"].unshift({
                      city: this.$t("city.Tianjin"),
                      cityInitials: "T",
                      countryInitials: "",
                      countryregion: "",
                      id: "",
                      state: ""
                    });
                  }
                }
                list.push(obj);
              }
              let city = this.getHotCity(this.country);
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
        this.show = true;
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
              let list = [],
                obj = {};
              for (var key in res.data) {
                obj = {};
                obj["letter"] = key;
                obj["list"] = res.data[key];
                list.push(obj);
              }
              let hotcity = this.getCountryHot();
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
          message: this.$t("totastTips.selectCountry"),
          duration: 2000
        });
      }
    },

    getCountryHot() {
      let obj = {};
      obj["letter"] = this.$t("formTitle.hotCountry");
      obj["list"] = [];
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

      for (var i = 0; i < list.length; i++) {
        let commonObj = {
          city: "",
          cityInitials: "",
          countryInitials: "",
          countryregion: "埃及",
          id: "",
          state: ""
        };
        commonObj.countryregion = list[i];
        obj["list"].push(commonObj);
      }
      return obj;
    },
    getHotCity(country) {
      let obj = {},
        list = [];
      obj["letter"] = this.$t("formTitle.hotCity");
      obj["list"] = [];
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
          list = [this.$t("city.Singapore")];
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
          list = [this.$t("city.Frankfurt")];
          break;
        case "Germany":
          list = [this.$t("city.Frankfurt")];
          break;
        case "加拿大":
          list = [this.$t("city.Vancouver")];
          break;
        case "Canada":
          list = [this.$t("city.Vancouver")];
          break;
        case "英国":
          list = [this.$t("city.Landon")];
          break;
        case "UK":
          list = [this.$t("city.Landon")];
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
          list = [this.$t("city.KualaLumpur")];
          break;
        default:
      }
      for (var i = 0; i < list.length; i++) {
        let commonObj = {
          city: "",
          cityInitials: "",
          countryInitials: "",
          countryregion: "",
          id: "",
          state: ""
        };
        commonObj.city = list[i];
        obj["list"].push(commonObj);
      }
      return obj;
    },
    keyWordsSearch(keywords) {
      this.searchVal = keywords;
      if (!keywords) {
        this.listData = this.loadData();
      } else {
        var advancedSearchData = [],
          obj = {};
        obj["pageNo"] = 1;
        obj["pageSize"] = 10000;
        obj["searchText"] = keywords;
        obj["advancedSearchData"] = advancedSearchData;
        this.listData = this.loadData(obj);
      }
    },
    previewImage(e, item, pics) {
      if (!item || !pics || !pics.length) return;
      wx.previewImage({
        current: item, // 当前显示图片的http链接
        urls: pics || [item] // 需要预览的图片http链接列表
      });
      return;
    },
    loadTop() {
      this.pageNum = 1;
      this.loadTopFlag = true;
      this.allLoaded = false;
      this.$refs.loadmore.onTopLoaded();
      this.loadData();
    },
    loadBottom() {
      this.allLoaded = false;
      this.loadTopFlag = false;
      this.$refs.loadmore.onBottomLoaded();
      this.pageNum += 1;
      this.loadData();
    },
    loadData() {
      this.rightIn = false;
      this.selectFlag = false;
      this.nodataFlag = false;
      this.loadingShow = true;
      this.isSOS = false;
      this.noDataTips = "";
      this.type = this.$route.query.id;
      if (this.type && this.type.toLocaleLowerCase() == "sos") {
        $(".list_wrap").css("top", 0);
        this.isSOS = true;
      } else {
        $(".list_wrap").css("top", "46px");
        this.isSOS = false;
      }
      let _this = this;
      let url = "/globalmate/rest/need/query";
      let postData = {
        onlyCurrentUser: ""
      };
      if (this.isSOS) {
        url = "/globalmate/rest/assist/listSOS";
      }
      if(this.$route.query.currentType){
        $(".list_wrap").css("top", 0);
        postData = {
          token: this.userInfo.token,
          type: this.searchContent.type,
          where: this.searchContent.where,
          pageNum: 1,
          pageSize: 100000,
          searchText: this.searchVal
        };
        if (this.loadCompleted) {
          postData["enable"] = "0,2,6";
        } else {
          postData["enable"] = "1";
        }
      }else{
        postData = {
          token: this.userInfo.token,
          type: this.searchContent.type,
          where: this.searchContent.where,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          searchText: this.searchVal
        };
        if (this.loadCompleted) {
          postData["enable"] = "0,6";
        } else {
          postData["enable"] = "1,2";
        }
      }
      
      
      this.axios
        .get(this.ip + url, {
          params: postData
        })
        .then(res => {
          if (res.success) {
            this.loadingShow = false;
            if (!res.data) {
              this.allLoaded = true;
              this.canNotLoadMore = true;
              this.myAssistList = [];
              return;
            }

            let data = res.data ? res.data : [];
            this.listm = [];

            if (data.length < this.pageSize) {
              this.allLoaded = true;
            } else {
              this.allLoaded = false;
            }
            if (data.length < this.pageSize && this.myAssistList.length != 0) {
              this.canNotLoadMore = true;
            }
            if (this.loadTopFlag) {
              this.myAssistList = [];
              this.myAssistListDone = [];
            }
            if(this.$route.query.currentType){
                let  hasRunningdata=data.some((item,index)=>{
                      return item.need.type==this.$route.query.currentType;
                });
                if(!hasRunningdata){
                  if (this.loadCompleted){
                      if(_this.myAssistListDone.length==0){
                        setTimeout(() => {
                          this.loadingShow = false;
                          this.nodataFlag = true;
                        }, 500);
                        this.noDataTips = this.$t("noDataDisplay");
                      }
                    }else{
                      if(_this.myAssistList.length==0){
                        setTimeout(() => {
                          this.loadingShow = false;
                          this.nodataFlag = true;
                        }, 500);
                        this.noDataTips = this.$t("noDataDisplay");
                      }
                    }
                }
            }
            if (data.length !== 0) {
              for (var i = 0; i < data.length; i++) {
                if (data[i].conceretNeed && data[i].conceretNeed.title) {
                  if (
                    data[i].conceretNeed.pic &&
                    data[i].conceretNeed.pic.indexOf("aliyuncs") > -1
                  ) {
                    data[i].conceretNeed.pic = data[i].conceretNeed.pic.split(
                      ";"
                    );
                  } else {
                    data[i].conceretNeed.pic = "";
                  }
                  if(data[i].conceretNeed.reward.indexOf('Please input')>-1||data[i].conceretNeed.reward.indexOf('请选择')>-1){
                      data[i].conceretNeed.reward=""
                    }
                  var status = data[i].need.enable + "";
                  switch (status) {
                    case "1":
                      data[i].need.status = this.$t("status.open");
                      break;
                    case "2":
                      data[i].need.status = this.$t("status.execute");
                      break;
                    case "0":
                      data[i].need.status = this.$t("status.closed");
                      break;
                    case "6":
                      data[i].need.status = this.$t("status.complete");
                      break;
                    default:
                  }

                  if (data[i] && data[i].need) {
                    let curData = data[i];
                    if (curData.need.userId == this.userInfo.userId) {
                      curData["self"] = true;
                    }
                    curData.need.time = this.moment(
                      curData.need.createTime
                    ).format("YYYY/MM/DD HH:mm");
                    for (var n = 0; n < this.userList.length; n++) {
                      if (curData.need.userId == this.userList[n].id) {
                        curData.need.pic = this.userList[n].pic;
                        curData.need.userTag = this.userList[n].userTag;
                        if (this.loadCompleted) {
                          // _this.myAssistListDone.push(curData);
                          if(this.$route.query.currentType){                               
                                if(this.$route.query.currentType==curData.need.type){
                                  _this.myAssistListDone.push(curData);
                                }
                              }else{
                                _this.myAssistListDone.push(curData);
                              }
                          _this.myAssistListDone.sort((a, b) => {
                            return b.need.createTime - a.need.createTime;
                          });
                        } else {
                         if (
                              curData.need.enable != 0 &&
                              curData.need.enable != 6
                            ) {
                              if(this.$route.query.currentType){                               
                                if(this.$route.query.currentType==curData.need.type){
                                  _this.myAssistList.push(curData);
                                }
                              }else{
                                _this.myAssistList.push(curData);
                              }                             
                            }
                          _this.myAssistList.sort((a, b) => {
                            return b.need.createTime - a.need.createTime;
                          });
                        }
                      }
                    }
                  }
                }
              }
              this.loadingShow = false;
            } else {
              if (this.myAssistList.length === 0) {
                setTimeout(() => {
                  this.loadingShow = false;
                  this.nodataFlag = true;
                }, 500);
                this.noDataTips = this.$t("noDataDisplay");
              }
            }
          } else {
            if (this.myAssistList.length == 0) {
              setTimeout(() => {
                this.nodataFlag = true;
                this.loadingShow = false;
              }, 500);
              this.noDataTips = this.$t("noDataDisplay");
            }
          }
        })
        .catch(e => {
          if (this.myAssistList.length == 0) {
            setTimeout(() => {
              this.nodataFlag = true;
              this.loadingShow = false;
            }, 500);
            this.noDataTips = this.$t("noDataDisplay");
          }
          console.log(e);
        });
    },
    getEveryItemPic(data, callback) {
      let data1 = data;
      this.axios
        .get(
          this.ip +
            "/globalmate/rest/user/list/" +
            data.need.userId +
            "?token=" +
            this.userInfo.token,
          {}
        )
        .then(res => {
          data1.need.pic = res.data.pic || "../assets/images/icon.png";
          callback && callback(data1);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  activated() {
    this.myAssistList = [];
    this.myAssistListDone = [];
    this.selected='1';
    this.loadCompleted = false;
    if (this.userInfo.token && this.userList && this.userList.length) {
      this.loadData();
    } else {
      this.timer = setInterval(() => {
        if (this.userInfo.token && this.userList && this.userList.length) {
          this.loadData();
          clearInterval(this.timer);
        }
      }, 200);
    }
  },
  deactivated() {
    this.pageNum = 1;
    this.show = false;
    this.allLoaded = false;
    this.selectItem = [];
    clearInterval(this.timer);
    this.searchContent.type = "";
    this.searchContent.where = "";
    this.searchCountry = "";
    this.searchCity = "";
    this.searchVal = "";
  },
  created() {}
};
</script>

<style scoped>
.gl_list {
  font-size: 14px;
  position: absolute;
  overflow: hidden;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: #eee;
  overflow-y: auto;
}
.filter_right > .select_out {
  position: fixed;
  left: 1rem;
  right: 0;
  bottom: 0;
  top: 100%;
  opacity: 0;
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
  background: #eee;
}
.filter_right > .select_in {
  position: fixed;
  left: 1rem;
  right: 0;
  bottom: 0;
  top: 43px;
  opacity: 1;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
}
.gl_list .list_ul {
  padding: 0 0.2rem;
  background: #fff;
}
.gl_list .list_ul li {
  height: 36px;
  line-height: 36px;
  border-bottom: 1px solid #eee;
  padding: 0 0.2rem;
}
.gl_list .list_ul li:last-child {
  border: none;
}
.gl_list .list_ul .select .icon-checkbox {
  color: rgb(41, 182, 246);
}
.gl_list .list_ul li .list_item {
  float: left;
}
.gl_list .list_ul li .icon-checkbox {
  float: right;
  line-height: 36px;
  color: #999;
  font-size: 16px;
}
.gl_list .buttom_action {
  height: 46px;
  background: #fff;
  line-height: 46px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
.gl_list .buttom_action span {
  display: inline-block;
  width: 40%;
  height: 36px;
  margin-left: 0.2rem;
  line-height: 36px;
  border-radius: 5px;
  color: #fff;
}
.gl_list .buttom_action .cancel {
  background: rgb(153, 153, 153);
}
.gl_list .buttom_action .confirm {
  background: rgb(41, 182, 246);
}
.bottom_right {
  color: #0400ff;
}
</style>
<style lang="less">
.slide_in_one {
  position: fixed;
  right: 0;
  top: 43px;
  bottom: 0;
  opacity: 1;
  width: 6.5rem;
  background: #f5f5f5;
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  /*background:#eee;*/
}
.slide_out_one {
  position: fixed;
  right: -6.5rem;
  top: 44px;
  bottom: 0;
  opacity: 0;
  width: 6.5rem;
  background: #fff;
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
}
.mask {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 0;
  background: rgba(153, 153, 153, 0.9);
}
.rightIn_form {
  display: flex;
  background: #fff;
  margin-top: 10px;
  padding: 0 0.3rem 0.2rem;
}
.rightIn_form .name {
  margin-right: 0.4rem;
}
.rightIn_form .name p {
  display: flex;
  height: 32px;
  line-height: 32px;
  margin-top: 10px;
}
.rightIn_form .name p label {
  width: 1.4rem;
  text-align: justify;
  text-justify: inter-ideograph;
  text-align-last: justify;
  line-height: 32px;
}
.rightIn_form .name p input {
  border: 1px solid #eee;
  padding: 0 0.2rem;
}
.gl_list .slide_in_one .action {
  position: absolute;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 36px;
  line-height: 36px;
}
.gl_list .slide_in_one .action span {
  flex: 1;
  text-align: center;
  font-size: 16px;
}
.gl_list .cancel {
  background: #ddd;
  color: #333;
}
.gl_list .confirm {
  background: #007aff;
  color: #fff;
}
</style>
<style media="screen" lang='less'>
form.rightIn_form {
  div {
    p {
      span.ipt {
        display: inline-block;
        flex: 1;
        box-sizing: border-box;
        border: 1px solid #ededed;
        position: relative;
        i {
          position: absolute;
          right: 0;
          top: 0;
          padding: 0 10px;
          line-height: 28px;
          font-size: 14px;
        }
      }
    }
  }
}
.list_wrap {
  background: #f7f5f3;
  overflow: scroll;
  .yy_nodata_class{
    top:46px;
  }
  .list_repeat {
    background: #fff;
    padding: 0.2rem 0.4rem;
    margin: auto;
    margin-bottom: 10px;
    margin-top: 10px;
    position: relative;
    & > div {
      margin-top: 10px;
    }
    .list_repeat_title {
      text-align: left;
      padding: 8px 0;
      font-size: 15px;
      color: #333;
      font-weight: 500;
      max-width: 80%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .list_repeat_action {
      text-align: right;
      position: absolute;
      right: 0.4rem;
      bottom: 0.2rem;
      span {
        padding: 6px 0.15rem;
        background: linear-gradient(
          103.1deg,
          rgba(251, 141, 22, 1),
          rgba(235, 122, 52, 1)
        );
        border-radius: 12px;
        color: #fff;
        text-align: center;
      }
    }
    .list_repeat_user {
      display: flex;
      .image_user {
        width: 1.2rem;
        height: 1.2rem;
        position: relative;
        .gl_user_img {
          display: inline-block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .name_user {
        display: flex;
        flex: 2;
        flex-direction: column;
        text-align: left;
        margin-left: 0.24rem;
        span {
          &.name {
            font-size: 14px;
            color: #333;
          }
          &.type {
            font-size: 13px;
            color: #888;
            margin-top: 0.1rem;
          }
        }
      }
      .status_user {
        span {
          font-size: 14px;
          display: block;
          text-align: right;
          margin-bottom: 10px;
          &.created_time {
            font-size: 12px;
            color: blue;
          }
        }
      }
      .status_close {
        span {
          color: red !important;
        }
      }
    }
    .list_repeat_img {
      display: flex;
      .list_content_img {
        width: 1.6rem;
        height: 1.6rem;
        margin-right: 0.2rem;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          display: inline-block;
        }
      }
    }
  }
}
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
<style lang="less">
.seek-help-list {
  .list_wrap {
    position: absolute;
    top: 46px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
    &.dataLoaded {
      .mint-loadmore-bottom {
        display: none;
      }
    }
    &.notAllLoad {
      .show_all_data {
        display: none;
      }
    }
    .mint-loadmore {
      min-height: 100%;
    }
  }
  .mint-navbar .mint-tab-item {
    padding: 10px 0 !important;
  }
  .search-box {
    position: relative;
    line-height: 0;
    background: #eee;
    opacity: 0.82;
    overflow: hidden;
    padding: 8px;
    .search_icon {
      position: absolute !important;
      height: 16px;
      top: 15px;
      left: 0.3rem;
      img {
        width: 15px;
        vertical-align: middle;
      }
    }
    .search-input {
      width: 90%;
      height: 30px;
      border: none;
      border-radius: 6px;
      float: left;
      font-size: 13px !important;
      line-height: 20px;
      vertical-align: middle;
      background: #fff;
      padding: 5px 0.3rem 5px 0.7rem !important;
      cursor: text;
      outline: none;
      font-weight: 300;
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
      tap-highlight-color: transparent;
      &::-webkit-input-placeholder {
        color: #bbbbbb;
        line-height: 20px;
        font-size: 15px;
      }
      &:-moz-placeholder {
        color: #bbbbbb;
        line-height: 20px;
        font-size: 15px;
      }
      &::-moz-placeholder {
        color: #bbbbbb;
        line-height: 20px;
        font-size: 15px;
      }
      &:-ms-input-placeholder {
        color: #bbbbbb;
        line-height: 20px;
        font-size: 15px;
      }
    }
    .search_delete {
      position: absolute;
      right: 1.1rem;
      height: 18px;
      padding: 6px 0;
      background: #fff;
      img {
        width: 17px;
        vertical-align: middle;
      }
    }
    .hide {
      display: none;
    }
    .select_icon {
      float: right;
      height: 24px;
      padding: 3px 0;
      img {
        width: 23px;
        height: 23px;
        vertical-align: middle;
      }
    }
    input {
      caret-color: red;
    }
  }
}
</style>
