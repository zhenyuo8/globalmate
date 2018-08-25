import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: reslove=>require(['@/pages/index'],reslove),
      meta:{
          index:1
      }
    },
    {
        path: '/assist',
        name: 'assist',
        component: reslove=>require(['@/pages/assist'],reslove),
        meta:{
            index:31
        }
    },
    {
        path: '/mine',
        name: 'mine',
        component: reslove=>require(['@/pages/mine'],reslove),
        meta:{
            index:6
        }
    },
    {
        path: '/mineInformation',
        name: 'mineInformation',
        component: reslove=>require(['@/pages/mineInformation'],reslove),
        meta:{
            index:16
        }
    },{
        path: '/myAssist',
        name: 'myAssist',
        component: reslove=>require(['@/pages/myAssist'],reslove),
        meta:{
            index:10
        }
    },{
        path: '/seekHelpList',
        name: 'seekHelpList',
        component: reslove=>require(['@/pages/seekHelpList'],reslove),
        meta:{
            index:11
        }
    },
    {
        path: '/detail',
        name: 'detail',
        component: reslove=>require(['@/pages/detail'],reslove),
        meta:{
            index:13
        }
    },
    {
        path: '/login',
        name: 'login',
        component: reslove=>require(['@/pages/login'],reslove),
        meta:{
            index:16
        }
    },
    {
        path: '/register',
        name: 'register',
        component: reslove=>require(['@/pages/register'],reslove),
        meta:{
            index:16
        }
    },
    {
        path: '/im',
        name: 'im',
        component: reslove=>require(['@/pages/im'],reslove),
        meta:{
            index:17
        }
    },
    {
        path: '/evaluate',
        name: 'evaluate',
        component: reslove=>require(['@/pages/evaluate'],reslove),
        meta:{
            index:18
        }
    },
    {
        path: '/feedback',
        name: 'feedback',
        component: reslove=>require(['@/pages/feedback'],reslove),
        meta:{
            index:18
        }
    },
    {
        path: '/rankAll',
        name: 'rankAll',
        component: reslove=>require(['@/pages/rankAll'],reslove),
        meta:{
            index:18
        }
    },
    {
        path: '/personalFile',
        name: 'personalFile',
        component: reslove=>require(['@/pages/personalFile'],reslove),
        meta:{
            index:18
        }
    },{
        path: '/identify',
        name: 'identify',
        component: reslove=>require(['@/pages/identify'],reslove),
        meta:{
            index:19
        }
    },{
        path: '/messageList',
        name: 'messageList',
        component: reslove=>require(['@/pages/messageList'],reslove),
        meta:{
            index:4
        }
    },{
        path: '/allComments',
        name: 'allComments',
        component: reslove=>require(['@/pages/allComments'],reslove),
        meta:{
            index:17
        }
    },
  ]
})
