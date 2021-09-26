import { createApp } from 'vue'
import App from './App.vue'
// import '~/styles/setting.less'
// import '~/styles/themBase.less'

import '~/styles'

// import xlui from 'xl-ui-vue3'

const app = createApp(App)

// 注册公共组件
const locales = require.context('~/', true, /[A-Za-z0-9-_,\s]+\.vue$/i)
locales.keys().forEach(key => {
  const matched = key.match(/([A-Za-z0-9-_]+)\./i)
  if (matched && matched.length > 1) {
    // const name = matched[1]
    console.log('commomcomp:', locales(key).default.name)
    app.component(locales(key).default.name, locales(key).default)
  }
})

// app.use(xlui)

// app.use(xlInput)
app.config.unwrapInjectedRef = true
app.config.warnHandler = function () {
  // `trace` 是组件的继承关系追踪
}
app.mount('#app')
