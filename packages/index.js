import XlInput from './input'
import XlScroll from './scroll'
import XlPopup from './popup'
import XlChoose from './choose'
import XlChooseGroup from './chooseGroup'
import './styles/transition.less'
import './styles/themBase.less'
// 所有组件列表
const components = [
  XlInput,
  XlScroll,
  XlPopup,
  XlChoose,
  XlChooseGroup
]
// 定义 install 方法，接收 Vue 作为参数
const install = function (Vue) {
  // 判断是否安装，安装过就不继续往下执行
  if (install.installed) return
  install.installed = true
  // 遍历注册所有组件
  // components.map(component => Vue.component(component.name, component))
  // 下面这个写法也可以
  components.map(component => Vue.use(component))
}

// 检测到 Vue 才执行
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  // 所有组件，必须具有 install，才能使用 Vue.use()
  ...components
}
