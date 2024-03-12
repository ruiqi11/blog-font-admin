import { createRouter, createWebHistory } from 'vue-router'
import VueCookies from 'vue-cookies'
const routes = [{
    name: '登录',
    path: '/login',
    component: () =>
      import ('../views/Login.vue')
  },
  {
    name: '框架页',
    path: '/',
    component: () =>
      import ('../views/frameWork/FrameWork.vue'),
    redirect: '/blog/list',
    children: [{
        name: '博客管理',
        path: '/blog/list',
        component: () =>
          import ('../views/blog/Blog.vue'),
      },
      {
        name: '博客分类',
        path: '/blog/category',
        component: () =>
          import ('../views/blog/BlogCategory.vue'),
      },
    ]
  },
]

//这里不是通过new来创建，通过createRouter 方法创建，使用的模式不是通过mode来定义
const router = createRouter({
  routes,
  history: createWebHistory(),
})

// 登录拦截，如果没有登录信息，则跳回
router.beforeEach((to, from, next) => {
  const userInfo = VueCookies.get('userInfo')
  if (!userInfo && to.path != '/login') {
    router.push('/login')
  }
  next()
})

export default router
