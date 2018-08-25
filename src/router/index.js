import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import assist from '@/pages/assist'//帮代
import mine from '@/pages/mine'//我的
import mineInformation from '@/pages/mineInformation'//个人信息
import myAssist from '@/pages/myAssist'//我发布的
import seekHelpList from '@/pages/seekHelpList'//求助列表
import detail from '@/pages/detail'//详情页
import register from '@/pages/register'//注册
import login from '@/pages/login'//登陆
import im from '@/pages/im'//聊天
import evaluate from '@/pages/evaluate'//求助详情页
import feedback from '@/pages/feedback'//意见反馈
import rankAll from '@/pages/rankAll'//排名
import personalFile from '@/pages/personalFile'//个人资料
import identify from '@/pages/identify' //身份验证
import messageList from '@/pages/messageList' //身份验证
import allComments from '@/pages/allComments' //身份验证
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
        path: '/assist',
        name: 'assist',
        component: assist,
        meta:{
            index:31
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
            index:16
        }
    },{
        path: '/myAssist',
        name: 'myAssist',
        component: myAssist,
        meta:{
            index:10
        }
    },{
        path: '/seekHelpList',
        name: 'seekHelpList',
        component: seekHelpList,
        meta:{
            index:11
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
        path: '/login',
        name: 'login',
        component: login,
        meta:{
            index:16
        }
    },
    {
        path: '/register',
        name: 'register',
        component: register,
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
    {
        path: '/evaluate',
        name: 'evaluate',
        component: evaluate,
        meta:{
            index:18
        }
    },
    {
        path: '/feedback',
        name: 'feedback',
        component: feedback,
        meta:{
            index:18
        }
    },
    {
        path: '/rankAll',
        name: 'rankAll',
        component: rankAll,
        meta:{
            index:18
        }
    },
    {
        path: '/personalFile',
        name: 'personalFile',
        component: personalFile,
        meta:{
            index:18
        }
    },{
        path: '/identify',
        name: 'identify',
        component: identify,
        meta:{
            index:19
        }
    },{
        path: '/messageList',
        name: 'messageList',
        component: messageList,
        meta:{
            index:4
        }
    },{
        path: '/allComments',
        name: 'allComments',
        component: allComments,
        meta:{
            index:17
        }
    },
  ]
})
