<template>
  <div class="layout">
    <el-container>
      <el-header class="header">
        <div class="logo">EasyBlog</div>
        <div class="user-info">
          <span>欢迎回来，</span>
          <el-dropdown trigger="click">
            <span class="nick-name">
              {{userInfo.nickName}}
              <span class="iconfont icon-close"></span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="goUserInfo">
                  个人信息
                </el-dropdown-item>
                <el-dropdown-item @click="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <div class="avatar"><img :src="userInfo.avatar"></div>
        </div>
      </el-header>
      <el-container class="container">
        <el-aside width="200px"
                  class="left-aside">
          <div>
            <el-button class="post-btn"
                       @click="createHtml"> 发布</el-button>
          </div>
          <div class="menu-panel">
            <ul>
              <li v-for="(menu,index) in menuList" :key="menu.title">
                <span class="menu-title-p"
                      @click="openClose(index)">
                  <span :class="['iconfont',menu.icon]"></span>
                  <span class="menu-title">{{menu.title}}</span>
                  <span :class="['iconfont','open-close',menu.open?'icon-open':'icon-close']"></span>
                </span>
                <ul class="sub-menu"
                    v-show="menu.open">
                  <li v-for="subMenu in menu.children" :key="subMenu.title">
                    <router-link :to="subMenu.path"
                                 :class="['sub-menu-item',activePath==subMenu.path?'active':'']"
                                 v-if="subMenu.roleType == null || subMenu.roleType == userInfo.roleType">{{subMenu.title}}</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

        </el-aside>
        <el-main class="right-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
// import { useStore } from "vuex";
import { getCurrentInstance, ref, watch, reactive } from "vue"
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
// const store = useStore();
const { proxy } = getCurrentInstance();
const menuList = ref([
  {
    title: "博客",
    icon: "icon-blog",
    open: true,
    children: [
      {
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
    children: [
      {
        title: "专题管理",
        path: "/special/list",
      },
    ],
  },
  {
    title: "设置",
    icon: "icon-settings",
    open: true,
    children: [
      {
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
    children: [
      {
        title: "回收站",
        path: "/recovery/list",
      },
    ],
  },
]);
const api = {
  "getUserInfo": "getUserInfo",
  "logout": "logout",
  "createHtml": "createHtml",
  "checkProgress": "checkProgress",
}
const openClose = (index) => {
  const open = menuList.value[index].open;
  menuList.value[index].open = !open;
}

const userInfo = ref({});

// 获取用户信息
const getUserInfo = async () => {
  let result = await proxy.Request({
    url: api.getUserInfo
  })

  if (!result) {
    return;
  }
  userInfo.value = result.data;
  userInfo.value.avatar = 'http://localhost:8081/api/file/getImage/' + result.data.avatar;
}
getUserInfo();


const logout = () => {
  proxy.Confirm(`你确定要删除退出吗`, async () => {
    let result = await proxy.Request({
      url: api.logout,
    })
    if (!result) {
      return;
    }
    router.push("/login");
  })
}


</script>

<style lang="scss">
.layout {
  .header {
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      font-size: 30px;
    }
    .user-info {
      display: flex;
      align-items: center;
      .nick-name {
        cursor: pointer;
        color: rgb(6, 143, 234);
        .icon-close {
          font-size: 14px;
        }
      }
      .avatar {
        margin-left: 10px;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 25px;
        background: #ddd;
        img {
          width: 50px;
          border-radius: 25px;
        }
      }
    }
  }
  .container {
    padding-top: 10px;
    background: #f5f6f7;
    height: calc(100vh - 60px);
    .left-aside {
      padding: 0px 15px;
      width: 280px;
      .post-btn {
        background: green;
        color: #fff;
        height: 40px;
        width: 100%;
      }
      .menu-panel {
        margin-top: 5px;
        ul,
        li {
          padding: 0px;
          margin: 0px;
          list-style: none;
        }

        .menu-title-p {
          padding: 0px 5px;
          line-height: 45px;
          cursor: pointer;
          display: flex;
          .iconfont {
            font-size: 18px;
            color: #91949a;
          }
          .menu-title {
            flex: 1;
            color: #3f4042;
            margin-left: 10px;
          }
          .open-close {
            width: 20px;
            font-size: 16px;
          }
        }

        .menu-title-p:hover {
          background: #ddd;
        }

        .sub-menu {
          font-size: 14px;
          .sub-menu-item {
            padding: 0px 10px 0 33px;
            display: block;
            cursor: pointer;
            line-height: 40px;
            text-decoration: none;
            color: #3f4042;
          }
          .active {
            background: #ddd;
          }
          .sub-menu-item:hover {
            background: #ddd;
          }
        }
      }
    }
    .right-main {
      position: relative;
      background: #fff;
      padding: 20px 10px 10px 10px;
    }
  }
}

.progress-container {
  .progress-panel {
    display: flex;
    justify-content: center;
  }

  .error {
    color: red;
    margin-top: 20px;

    .info {
      font-size: 13px;
    }
  }

  .success {
    margin-top: 20px;
    text-align: center;
    font-size: 16px;
    color: green;
  }

  .btn-panel {
    text-align: center;
    margin-top: 20px;

    .btn {
      margin: 0px auto;
    }
  }
}
</style>
