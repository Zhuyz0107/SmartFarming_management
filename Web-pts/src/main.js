/*
 * @Description:主入口文件
 * @Author: Ronda
 * @Date: 2021-03-10 19:07:26
 * @LastEditors: Ronda
 * @LastEditTime: 2022-03-17 17:31:19
 */
import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

import Briupdrawer from '@/components/Briupdrawer'
import BriupMap from '@/components/BriupMap'

import Conditions from '@/components/Conditions'

// 引入动画
import 'animate.css'

// 自定义组件
Vue.component('Briupdrawer', Briupdrawer)
Vue.component('BriupMap', BriupMap)
Vue.component('Conditions', Conditions)

import Vant from 'vant'
import 'vant/lib/index.css'

import '@/styles/university.css'

Vue.use(Vant)

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
