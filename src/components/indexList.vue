<template>
  <div class="">
    <div class="">
      <searchInput :searchCallBack="searchCallBack" :childMsg='msg' :keyWordsSearch="keyWordsSearch" :searchVal="searchVal" :hideFilter='hideFilter'></searchInput>
      <div class="back" @click='back'>
        返回
      </div>
    </div>


    <mt-index-list>
      <mt-index-section :index="item.letter" v-for="(item,index) in selectItem " :key='index' :name='item'>
        <mt-cell :title="items" v-for="(items,indexs) in item.citylist" :key='indexs' :name='items' @click.native='pickCountry($event,items)'></mt-cell>
      </mt-index-section>
    </mt-index-list>
  </div>
</template>

<script>
import Vue from "vue";
import { IndexSection, IndexList ,Cell} from "mint-ui";
import searchInput from "../components/searchInput.vue";
import userMix from "../mixins/userInfo";
Vue.component(IndexList.name, IndexList);
Vue.component(Cell.name, Cell);
Vue.component(IndexSection.name, IndexSection);
export default {
  mixins: [userMix],
  components: {
    searchInput
  },
  data() {
    return {
      msg: false,
      searchVal: "",
      select: false,
      list: [],
      hideFilter: true
    };
  },
  props: {
    selectItem: {
      type: Array,
      default: function() {}
    },
    countrySityCallBack: {
      type: Function,
      default: function() {}
    },
    listType: {
      type: String,
      default: ""
    }
  },
  methods: {
    searchCallBack(data) {
      this.msg = !this.msg;
    },
    keyWordsSearch(keywords) {
      if (keywords) {
        keywords = keywords.toUpperCase();
        // let list = JSON.parse(.getItem("LIST"));
        let list = this.todoList;
        this.selectItem = list.filter(function(item) {
          return item.letter == keywords;
        });
      } else {
        // this.selectItem = JSON.parse(.getItem("LIST"));
        this.selectItem = this.todoList;
      }
    },
    pickCountry(e, item) {
      this.countrySityCallBack(this.listType, item);
    },
    back() {
      this.countrySityCallBack(this.listType, "");
    }
  },

  activated() {
  },
  created() {}
};
</script>
<style media="screen">
li {
  list-style: none;
}
.back {
  position: absolute;
  right: 0.08rem;
  top: 0;
  font-size: 14px;
  color: blue;
  height: 44px;
  line-height: 44px;
}
.mint-cell {
  display: inline-block !important;
  height: 32px;
  min-height: 32px;
  margin: 0 2.1667%;
  width: 29%;
  border-radius: 4px;
  border: 1px solid #eee;
  box-sizing: border-box;
  background-image: none !important;
}
.picked {
  border-color: red;
}
.mint-cell-title {
  height: 32px;
  text-align: center;
}

.mint-cell-wrapper {
  background: none;
  height: 100%;
  padding: 0 0.04rem;
  background-image: none !important;
}
.mint-cell-text {
  font-size: 13px !important;
  line-height: 32px;
  max-width: 1.4rem;
  height: 32px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  margin: auto;
  -webkit-line-clamp: 2;
  vertical-align: middle;
  text-align: center;
}
.mint-indexsection-index {
  font-size: 14px;
  text-align: left;
  font-weight: 600;
  color: red;
  padding: 4px 0.2rem;
  background: #fff;
}
.mint-indexsection-index + ul {
  padding: 10px;
  text-align: left;
}

.mint-indexlist-nav {
  color: #077fc5;
}
.mint-indexlist-navitem {
  font-size: 12px;
  padding: 4px 8px;
}
</style>

<style scoped>
</style>
