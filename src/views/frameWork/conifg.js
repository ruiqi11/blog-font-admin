import { ref } from 'vue'
const menuList = ref([{
    title: "博客",
    icon: "icon-blog",
    open: true,
    children: [{
        title: "博客管理",
        path: "/blog/list",
      },
      {
        title: "分类管理",
        path: "/blog/category",
      },
    ],
  },
  {
    title: "专题",
    icon: "icon-zhuanti",
    open: true,
    children: [{
      title: "专题管理",
      path: "/special/list",
    }, ],
  },
  {
    title: "设置",
    icon: "icon-settings",
    open: true,
    children: [{
        title: "个人信息设置",
        path: "/settings/my",
      },
      {
        title: "博客成员",
        path: "/settings/user",
      },
      {
        title: "系统设置",
        path: "/settings/sysInfo",
        roleType: 1,
      },
    ],
  },
  {
    title: "回收站",
    icon: "icon-delete",
    open: true,
    children: [{
      title: "回收站",
      path: "/recovery/list",
    }, ],
  },
])

const api = {
  "getUserInfo": "getUserInfo",
  "logout": "logout",
  "createHtml": "createHtml",
  "checkProgress": "checkProgress",
}

export {
  menuList,
  api
}
