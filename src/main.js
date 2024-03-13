import { createApp } from 'vue'
import VueCookies from 'vue-cookies'

import App from './App.vue'
import Table from '@/components/Table.vue'
import Cover from '@/components/Cover.vue'

import ElementPlus from 'element-plus'
import "element-plus/dist/index.css"
import '@/assets/icon/iconfont.css'
import './style.css'

import router from './router/index.js'
import Request from './utils/Request.js'
import Message from './utils/Message.js'

const app = createApp(App)
app.config.globalProperties.Request = Request;
app.config.globalProperties.Message = Message
app.config.globalProperties.VueCookies = VueCookies;


app.use(router)
app.use(ElementPlus)

app.component("Table", Table);
app.component("Cover", Cover);
app.mount('#app')