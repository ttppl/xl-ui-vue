
// import XlBookmark from './xl-bookmark'
// import XlBookmarkGroup from './xl-bookmark-group'
// import XlButton from './xl-button'
// import XlCard from './xl-card'
// import XlChoose from './xl-choose'
// import XlChooseGroup from './xl-choose-group'
// import XlCollapse from './xl-collapse'
// import XlIdentify from './xl-identify'
// import XlInput from './xl-input'
// import XlPagenation from './xl-pagenation'
// import XlPopover from './xl-popover'
// import XlPopup from './xl-popup'
// import XlScroll from './xl-scroll'
// import XlSelect from './xl-select'
// import XlSelectOption from './xl-select-option'
// import XlTable from './xl-table'
// import XlTableColumn from './xl-table-column'
// import XlTooltip from './xl-tooltip'

import main from './xl-ui.umd'
import './xl-ui.css'
const install = main.install
// 检测到 Vue 才执行
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install
export {
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
