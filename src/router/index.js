import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/pages/index.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/assist',
      name: 'assist',
      component: () => import('../pages/assist.vue'),
      meta: {
        index: 31
      }
    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import('@/pages/mine.vue'),
      meta: {
        index: 6
      }
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: () => import('@/pages/aboutUs.vue'),
      meta: {
        index: 7
      }
    },
    {
      path: '/mineInformation',
      name: 'mineInformation',
      component: () => import('@/pages/mineInformation.vue'),
      meta: {
        index: 16
      }
    }, {
      path: '/myAssist',
      name: 'myAssist',
      component: () => import('@/pages/myAssist.vue'),
      meta: {
        index: 10
      }
    }, {
      path: '/seekHelpList',
      name: 'seekHelpList',
      component: () => import('@/pages/seekHelpList.vue'),
      meta: {
        index: 11
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('@/pages/detail.vue'),
      meta: {
        index: 13
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login.vue'),
      meta: {
        index: 16
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/register.vue'),
      meta: {
        index: 16
      }
    },
    {
      path: '/im',
      name: 'im',
      component: () => import('@/pages/im.vue'),
      meta: {
        index: 17
      }
    },
    {
      path: '/evaluate',
      name: 'evaluate',
      component: () => import('@/pages/evaluate.vue'),
      meta: {
        index: 18
      }
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: () => import('@/pages/feedback.vue'),
      meta: {
        index: 18
      }
    },
    {
      path: '/rankAll',
      name: 'rankAll',
      component: () => import('@/pages/rankAll.vue'),
      meta: {
        index: 6
      }
    },
    {
      path: '/personalFile',
      name: 'personalFile',
      component: () => import('@/pages/personalFile.vue'),
      meta: {
        index: 18
      }
    }, {
      path: '/identify',
      name: 'identify',
      component: () => import('@/pages/identify.vue'),
      meta: {
        index: 19
      }
    }, {
      path: '/messageList',
      name: 'messageList',
      component: () => import('@/pages/messageList.vue'),
      meta: {
        index: 7
      }
    },
    {
      path: '/allComments',
      name: 'allComments',
      component: () => import('@/pages/allComments.vue'),
      meta: {
        index: 17
      }
    },
    {
      path: '/previewImage',
      name: 'previewImage',
      component: () => import('@/pages/previewImage.vue'),
      meta: {
        index: 20
      }
    }
  ]
})
