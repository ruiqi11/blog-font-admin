import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import Request from './utils/Request.js'
import Message from './utils/Message.js'
import ElementPlus from 'element-plus'
import "element-plus/dist/index.css"
import '@/assets/icon/iconfont.css'

const app = createApp(App)
app.config.globalProperties.Request = Request;
app.config.globalProperties.Message = Message
app.use(router)
app.use(ElementPlus)
app.mount('#app')
