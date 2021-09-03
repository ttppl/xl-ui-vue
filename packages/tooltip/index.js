import ToolTip from './src/ToolTip.vue'

ToolTip.install = (App) => {
  App.component(ToolTip.name, ToolTip)
}


export default ToolTip