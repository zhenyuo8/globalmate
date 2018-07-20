import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import index from '@/pages/index'
import assist from '@/pages/assist'//帮代
import carryAssist from '@/pages/carryAssist'//帮代
import accompany from '@/pages/accompany'//帮代
import mine from '@/pages/mine'//我的
import mineInformation from '@/pages/mineInformation'//个人信息
import mineInformationEdit from '@/pages/mineInformationEdit'//个人资料编辑
import other from '@/pages/other'//其他
import myAssist from '@/pages/myAssist'//我发布的
import seekHelpList from '@/pages/seekHelpList'//求助列表
import chart from '@/pages/chart'//聊天页面
import detail from '@/pages/detail'//求助详情页
import selectList from '@/pages/selectList'//求助详情页
import register from '@/pages/register'//求助详情页
import login from '@/pages/login'//求助详情页
import im from '@/pages/im'//求助详情页
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta:{
          index:1
      }
    },
    {
        path: '/Home',
        name: 'Home',
        component: Home,
        meta:{
            index:2
        }
    },
    {
        path: '/assist',
        name: 'assist',
        component: assist,
        meta:{
            index:3
        }
    },
    {
        path: '/carryAssist',
        name: 'carryAssist',
        component: carryAssist,
        meta:{
            index:4
        }
    },
    {
        path: '/accompany',
        name: 'accompany',
        component: accompany,
        meta:{
            index:5
        }
    },
    {
        path: '/mine',
        name: 'mine',
        component: mine,
        meta:{
            index:6
        }
    },
    {
        path: '/mineInformation',
        name: 'mineInformation',
        component: mineInformation,
        meta:{
            index:7
        }
    },
    {
        path: '/mineInformationEdit',
        name: 'mineInformationEdit',
        component: mineInformationEdit,
        meta:{
            index:8
        }
    },
    {
        path: '/other',
        name: 'other',
        component: other,
        meta:{
            index:9
        }
    },
    {
        path: '/myAssist',
        name: 'myAssist',
        component: myAssist,
        meta:{
            index:10
        }
    },
    {
        path: '/seekHelpList',
        name: 'seekHelpList',
        component: seekHelpList,
        meta:{
            index:11
        }
    },
    {
        path: '/chart',
        name: 'chart',
        component: chart,
        meta:{
            index:12
        }
    },
    {
        path: '/detail',
        name: 'detail',
        component: detail,
        meta:{
            index:13
        }
    },
    {
        path: '/selectList',
        name: 'selectList',
        component: selectList,
        meta:{
            index:14
        }
    },
    {
        path: '/register',
        name: 'register',
        component: register,
        meta:{
            index:15
        }
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        meta:{
            index:16
        }
    },
    {
        path: '/im',
        name: 'im',
        component: im,
        meta:{
            index:17
        }
    },
  ]
})
