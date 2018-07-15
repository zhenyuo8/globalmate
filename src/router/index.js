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
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
        path: '/index',
        name: 'index',
        component: index,
    },
    {
        path: '/assist',
        name: 'assist',
        component: assist,
    },
    {
        path: '/carryAssist',
        name: 'carryAssist',
        component: carryAssist,
    },
    {
        path: '/accompany',
        name: 'accompany',
        component: accompany,
    },
    {
        path: '/mine',
        name: 'mine',
        component: mine,
    },
    {
        path: '/mineInformation',
        name: 'mineInformation',
        component: mineInformation,
    },
    {
        path: '/mineInformationEdit',
        name: 'mineInformationEdit',
        component: mineInformationEdit,
    },
    {
        path: '/other',
        name: 'other',
        component: other,
    },
    {
        path: '/myAssist',
        name: 'myAssist',
        component: myAssist,
    },
    {
        path: '/seekHelpList',
        name: 'seekHelpList',
        component: seekHelpList,
    },
    {
        path: '/chart',
        name: 'chart',
        component: chart,
    },
    {
        path: '/detail',
        name: 'detail',
        component: detail,
    },
  ]
})
