<template>
  <div class="gl_list seek-help-list">
    <!--搜索框-->
    <searchInput :searchCallBack="searchCallBack" :childMsg='msg' v-if="!isSOS" @search='searchForContent'></searchInput>
    <div class="list_wrap" :class="{dataLoaded: allLoaded, notAllLoad: !allLoaded}">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :bottomPullText="bottomPullText">
        <div class="list_repeat" v-for="(item,index) in myAssistList" @click='showDetail(item)' :key='index'>
          <div class="list_repeat_user">
            <div class="image_user" @click='goDetail($event,item)'>
              <img :src="item.need.pic" alt="">
            </div>
            <div class="name_user">
              <span class="name">{{item.need.userName}}</span>
              <span class="type">{{item.conceretNeed.tag}}</span>
              <span class="type">{{$t('formTitle.reward')}}(￥)
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
              <img :src="items" alt="" v-if="indexs<3" @click='previewImage($event,items)'>
            </div>
          </div>
          <div class="list_repeat_action" v-if="item.need.enable==1&&!item.self">
            <span @click='goHelp($event,item)'>{{$t('button.gohelp')}}</span>
          </div>
        </div>
        <div class="show_all_data" v-show="canNotLoadMore">
          已加载所有数据
        </div>
      </mt-loadmore>
    </div>

    <div v-if="nodataFlag" class="yy_nodata_class" style="">
      <div class="yy_icon_img">
        <img src="../assets/images/business_nodata.png" alt="">
        <span class="yy_nodata_text">{{noDataTips}}</span>
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
import { MessageBox, Toast, Loadmore } from "mint-ui";
Vue.component(Loadmore.name, Loadmore);
Vue.component(Toast.name, Toast);
Vue.component(MessageBox.name, MessageBox);
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
      searchCountry: '',
      searchCity: '',
      isSOS: false,
      loadingShow: true,
      show: false,
      selectItem: [],
      listType: "",
      allLoaded:false,
      pageNum:1,
      pageSize:10,
      canNotLoadMore:false,
      bottomPullText:'上拉加载'
    };
  },
  methods: {
    searchForContent(val) {
      this.searchVal = val;
      this.pageNum = 1;
      this.loadTopFlag = true;
      this.loadData()
    },
    showDetail(item) {
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
      e.preventDefault;
      e.cancelBubble = true;
      this.previewImageFlag = true;
      this.$router.push({
        path: "mineInformation",
        query: {
          token: this.userInfo.token,
          title: item.need.userName,
          otherUserId: item.need.userId,
          id: item.need.id,
          currentuser: this.userInfo.userId,
          seeOther: true
        }
      });
    },
    goHelp(e, item) {
      e.preventDefault;
      e.cancelBubble = true;
      let _this = this;
      if (item.need.enable != 1) {
        Toast({
          message: "当前任务已完成或者正在执行中！",
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
          if (res && res.success) {
            callback(res.data);
          }
        })
        .catch(e => {});
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
      // this.searchContent["type"] = this.$el.querySelector("#typesearch").value;
      // this.searchContent["where"] =
      //   this.$el.querySelector("#countrysearch").value +
      //   "_" +
      //   this.$el.querySelector("#citysearch").value;
      if (this.searchCountry || this.searchCity) {
        this.searchContent["where"] =
        this.searchCountry + "_" + this.searchCity;
      } else {
        this.searchContent["where"] = ''
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
          // this.$el.querySelector("#countrysearch").value = value;
          this.searchCountry = value;
          this.searchCity = '';
          // this.$el.querySelector("#citysearch").value = "";
        } else {
          // this.$el.querySelector("#citysearch").value = value;
          this.searchCity = value;
        }
      }
    },
    getSelectItem(key) {
      let url = "",
        _this = this,
        postData = {};
      this.show = true;
      let lang = navigator.language || "zh-CN";
      let isEN = /^zh/.test(lang)
        ? false
        : /^en/.test(lang) ? true : /^es/.test(lang) ? true : true;
      if (key == "city" && this.country) {
        url = "/globalmate/rest/user/city";
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
              let result = res.data,
                resultArr = [];
              if (this.country == "中国" || this.country == "China") {
                resultArr = [
                  this.$t("cityName.beijing"),
                  this.$t("cityName.tianjing"),
                  this.$t("cityName.shanghai"),
                  this.$t("cityName.chongqing")
                ];
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
          .get(this.ip + url, {
            params: {
              token: this.userInfo.token,
              isEN: isEN
            }
          })
          .then(res => {
            if (res.success) {
              _this.buildItem(res.data, key);
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
        let _index = Number(
          _this.$utils.getFirstLetter(data[i]).charCodeAt() - 65
        );
        if (_index >= 0 && _index < 26) {
          letter[_index].citylist.push(data[i]);
        }
      }
      let showCity = letter.filter(function(value) {
        let len = value.citylist.length;
        return len > 0;
      });
      if (key == "country") {
        let hotcountry = this.getCountryHot();
        showCity.unshift(hotcountry);
      } else {
        let hotcity = this.getHotCity(this.country);
        showCity.unshift(hotcity);
      }
      this.show = true;
      this.listType = key;
      this.selectItem = showCity;
      this.updateTodoList(this.selectItem);
    },
    getCountryHot() {
      let obj = {};
      obj["letter"] = "热门国家";
      obj["citylist"] = [
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
      return obj;
    },
    getHotCity(country) {
      let obj = {};
      obj["letter"] = "热门城市";
      switch (country) {
        case "中国":
          obj["citylist"] = [
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
          obj["citylist"] = [
            this.$t("city.beijing"),
            this.$t("city.shanghai"),
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
            this.$t("city.sShenyang"),
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
          obj["citylist"] = [this.$t("city.Seoul"), this.$t("city.Busan")];
          break;
        case "Korea":
          obj["citylist"] = [this.$t("city.Seoul"), this.$t("city.Busan")];
          break;
        case "日本":
          obj["citylist"] = [
            this.$t("city.Tokyo"),
            this.$t("city.Nagoya"),
            this.$t("city.Osaka")
          ];
          break;
        case "Japan":
          obj["citylist"] = [
            this.$t("city.Tokyo"),
            this.$t("city.Nagoya"),
            this.$t("city.Osaka")
          ];
          break;
        case "新加坡":
          obj["citylist"] = [this.$t("city.Singapore")];
          break;
        case "Singapore":
          obj["citylist"] = [this.$t("city.Singapore")];
          break;
        case "泰国":
          obj["citylist"] = [this.$t("city.Bangkok")];
          break;
        case "Thailand":
          obj["citylist"] = [this.$t("city.Bangkok")];
          break;
        case "越南":
          obj["citylist"] = [this.$t("city.HoChiMinhCity")];
          break;
        case "Vietnam":
          obj["citylist"] = [this.$t("city.HoChiMinhCity")];
          break;
        case "美国":
          obj["citylist"] = [
            this.$t("city.NewYork"),
            this.$t("city.LosAngeles"),
            this.$t("city.Hawaii")
          ];
          break;
        case "US":
          obj["citylist"] = [
            this.$t("city.NewYork"),
            this.$t("city.LosAngeles"),
            this.$t("city.Hawaii")
          ];
          break;

        case "德国":
          obj["citylist"] = [this.$t("city.Frankfurt")];
          break;
        case "Germany":
          obj["citylist"] = [this.$t("city.Frankfurt")];
          break;
        case "加拿大":
          obj["citylist"] = [this.$t("city.Vancouver")];
          break;
        case "Canada":
          obj["citylist"] = [this.$t("city.Vancouver")];
          break;
        case "英国":
          obj["citylist"] = [this.$t("city.Landon")];
          break;
        case "UK":
          obj["citylist"] = [this.$t("city.Landon")];
          break;
        case "澳大利亚":
          obj["citylist"] = [this.$t("city.Sydney")];
          break;
        case "Australia":
          obj["citylist"] = [this.$t("city.Sydney")];
          break;
        case "法国":
          obj["citylist"] = [this.$t("city.Paris")];
          break;
        case "France":
          obj["citylist"] = [this.$t("city.Paris")];
          break;
        case "马来西亚":
          obj["citylist"] = [this.$t("city.KualaLumpur")];
          break;
        case "Malaysia":
          obj["citylist"] = [this.$t("city.KualaLumpur")];
          break;
        default:
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
    previewImage(e, item) {
      e.preventDefault();
      e.cancelBubble = true;
      this.previewImageFlag = true;
      this.$router.push({
        path: "previewImage",
        query: {
          url: item
        }
      });
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
        this.isSOS = true;
      } else {
        this.isSOS = false;
      }
      let _this = this;
      let url = "/globalmate/rest/need/query";
      let postData = {
        onlyCurrentUser: ""
      };
      if (this.isSOS) {
        url = "/globalmate/rest/assist/listSOS";
      } else {
        postData["type"] = this.searchContent.type || "";
        postData["where"] = this.searchContent.where || "";
      }
      this.axios
        .get(this.ip + url, {
          params: {
            token: this.userInfo.token,
            type: this.searchContent.type,
            where: this.searchContent.where,
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            searchText: this.searchVal
          }
        })
        .then(res => {
          if (res.success) {
            if (!res.data) {
              this.loadingShow = false;
              this.myAssistList = [];
              return;
            }
            let data = res.data ? res.data : [];
            this.listm = [];
            // if (data.length >= this.pageSize) {
            //   this.allLoaded = false;
            // }
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
            }
            if (data) {
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
                    case "3":
                      data[i].need.status = "编辑中";
                      break;
                    case "4":
                      data[i].need.status = "洽谈中";
                      break;
                    case "5":
                      data[i].need.status = "执行中";
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
                        if (
                          curData.need.enable != 0 &&
                          curData.need.enable != 6
                        ) {
                          _this.myAssistList.push(curData);
                        }
                        let len = _this.myAssistList.length;
                        _this.myAssistList.sort((a,b) => {
                          return b.need.createTime - a.need.createTime
                        })
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
                this.noDataTips = "暂无相关数据";
              }
            }
          } else {
            if (this.myAssistList.length == 0) {
              setTimeout(() => {
                this.nodataFlag = true;
                this.loadingShow = false;
              }, 500);
              this.noDataTips = "暂无相关数据";
            }
          }
        })
        .catch(e => {
          if (this.myAssistList.length == 0) {
            setTimeout(() => {
              this.nodataFlag = true;
              this.loadingShow = false;
            }, 500);
            this.noDataTips = "暂无相关数据";
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
    if (this.userInfo.token) {
      if (!this.previewImageFlag) {
        this.loadData();
      }
    } else {
      this.timer = setInterval(() => {
        if (this.userInfo.token) {
          if (!this.previewImageFlag) {
            this.loadData();
          }
          clearInterval(this.timer);
        }
      }, 200);
    }
  },
  deactivated() {
    this.pageNum = 1;
    this.show = false;
    this.selectItem = [];
    clearInterval(this.timer);
    this.searchContent.type = ''
    this.searchContent.where = ''
    this.searchCountry = ''
    this.searchCity = ''
    this.searchVal = ''
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
  .list_repeat {
    background: #fff;
    padding: 0.2rem 0.4rem;
    margin: auto;
    margin-bottom: 10px;
    position: relative;
    & > div {
      margin-top: 10px;
    }
    .list_repeat_title {
      text-align: left;
      margin-top: 10px;
      margin-bottom: 6px;
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
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid #eee;
        img {
          display: inline-block;
          width: 100%;
          height: 100%;
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
      // position: absolute;
      // top: 0;
      // bottom: 0;
      // left: 0;
      // right: 0;
      // overflow: auto;
    }
  }
  .search-box {
    position: relative;
    /*width: 315px;*/
    /*height:100%;*/
    line-height: 0;
    background: #eee;
    opacity: 0.82;
    overflow: hidden;
    // margin:0px 0.24rem;
    // padding: 0.16rem;
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
      /*width: 6.3rem;*/
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
      /*display:none;*/
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
