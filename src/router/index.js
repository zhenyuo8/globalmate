import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
// import assist from '@/pages/assist'//帮代
// import mine from '@/pages/mine'//我的
// import mineInformation from '@/pages/mineInformation'//个人信息
// import myAssist from '@/pages/myAssist'//我发布的
// import seekHelpList from '@/pages/seekHelpList'//求助列表
// import detail from '@/pages/detail'//详情页
// import register from '@/pages/register'//注册
// import login from '@/pages/login'//登陆
// import im from '@/pages/im'//聊天
// import evaluate from '@/pages/evaluate'//求助详情页
// import feedback from '@/pages/feedback'//意见反馈
// import rankAll from '@/pages/rankAll'//排名
// import personalFile from '@/pages/personalFile'//个人资料
// import identify from '@/pages/identify' //身份验证
// import messageList from '@/pages/messageList' //身份验证
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      // component: index,
      component: resolve => require(['@/pages/index.vue'], resolve),
      meta:{
          index:1
      }
    },
    {
        path: '/assist',
        name: 'assist',
        // component: assist,
        component: resolve => require(['@/pages/assist.vue'], resolve),
        meta:{
            index:31
        }
    },
    {
        path: '/mine',
        name: 'mine',
        // component: mine,
        component: resolve => require(['@/pages/mine.vue'], resolve),
        meta:{
            index:6
        }
    },
    {
        path: '/mineInformation',
        name: 'mineInformation',
        // component: mineInformation,
        component: resolve => require(['@/pages/mineInformation.vue'], resolve),
        meta:{
            index:16
        }
    },{
        path: '/myAssist',
        name: 'myAssist',
        // component: myAssist,
        component: resolve => require(['@/pages/myAssist.vue'], resolve),        
        meta:{
            index:10
        }
    },{
        path: '/seekHelpList',
        name: 'seekHelpList',
        // component: seekHelpList,
        component: resolve => require(['@/pages/seekHelpList.vue'], resolve),        
        meta:{
            index:11
        }
    },
    {
        path: '/detail',
        name: 'detail',
        // component: detail,
        component: resolve => require(['@/pages/detail.vue'], resolve),        
        meta:{
            index:13
        }
    },
    {
        path: '/login',
        name: 'login',
        // component: login,
        component: resolve => require(['@/pages/login.vue'], resolve),        
        meta:{
            index:16
        }
    },
    {
        path: '/register',
        name: 'register',
        // component: register,
        component: resolve => require(['@/pages/register.vue'], resolve),        
        meta:{
            index:16
        }
    },
    {
        path: '/im',
        name: 'im',
        // component: im,
        component: resolve => require(['@/pages/im.vue'], resolve),                
        meta:{
            index:17
        }
    },
    {
        path: '/evaluate',
        name: 'evaluate',
        // component: evaluate,
        component: resolve => require(['@/pages/evaluate.vue'], resolve),        
        meta:{
            index:18
        }
    },
    {
        path: '/feedback',
        name: 'feedback',
        // component: feedback,
        component: resolve => require(['@/pages/feedback.vue'], resolve),                
        meta:{
            index:18
        }
    },
    {
        path: '/rankAll',
        name: 'rankAll',
        // component: rankAll,
        component: resolve => require(['@/pages/rankAll.vue'], resolve),                
        meta:{
            index:18
        }
    },
    {
        path: '/personalFile',
        name: 'personalFile',
        // component: personalFile,
        component: resolve => require(['@/pages/personalFile.vue'], resolve),                
        meta:{
            index:18
        }
    },{
        path: '/identify',
        name: 'identify',
        // component: identify,
        component: resolve => require(['@/pages/identify.vue'], resolve),
        meta:{
            index:19
        }
    },{
        path: '/messageList',
        name: 'messageList',
        // component: messageList,
        component: resolve => require(['@/pages/messageList.vue'], resolve),
        meta:{
            index:4
        }
    },
  ]
})
export default router
