
import XlBookmark from './components/bookmark'
import XlBookmarkGroup from './components/bookmarkGroup'
import XlButton from './components/button'
import XlCard from './components/card'
import XlChoose from './components/choose'
import XlChooseGroup from './components/chooseGroup'
import XlCollapse from './components/collapse'
import XlIdentify from './components/identify'
import XlInput from './components/input'
import XlPagenation from './components/pagenation'
import XlPopover from './components/popover'
import XlPopup from './components/popup'
import XlScroll from './components/scroll'
import XlSelect from './components/select'
import XlSelectOption from './components/selectOption'
import XlTable from './components/table'
import XlTableColumn from './components/tableColumn'
import XlTooltip from './components/tooltip'

import './styles/transition.less'
import './styles/themBase.less'
// 所有组件列表
const components = [
  XlBookmark,
  XlBookmarkGroup,
  XlButton,
  XlCard,
  XlChoose,
  XlChooseGroup,
  XlCollapse,
  XlIdentify,
  XlInput,
  XlPagenation,
  XlPopover,
  XlPopup,
  XlScroll,
  XlSelect,
  XlSelectOption,
  XlTable,
  XlTableColumn,
  XlTooltip
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
  install
  // 所有组件，必须具有 install，才能使用 Vue.use()
  // ...components
  // XlBookmark,
  // XlBookmarkGroup,
  // XlButton,
  // XlCard,
  // XlChoose,
  // XlChooseGroup,
  // XlCollapse,
  // XlIdentify,
  // XlInput,
  // XlPagenation,
  // XlPopover,
  // XlPopup,
  // XlScroll,
  // XlSelect,
  // XlSelectOption,
  // XlTable,
  // XlTableColumn,
  // XlTooltip
}
