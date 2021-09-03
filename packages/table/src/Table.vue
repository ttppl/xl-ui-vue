<script type="text/ecmascript-6">
import { h, defineComponent, vShow, withDirectives, computed } from 'vue'
import Tooltip from '../../tooltip/src/Tooltip'

export default defineComponent({
  name: 'XlTable',

  components: {
    Tooltip
  },

  provide () {
    return {
      XlTable: computed(() => {
        return {
          columns: this.columns
        }
      })
    }
  },

  props: {
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    },

    type: {
      type: String,
      default: 'primary'
    },

    showArrow: Boolean,

    border: {
      type: String,
      default: 'border'
    },

    width: {
      type: [String, Number],
      default: '100%'
    },

    height: {
      type: [String, Number],
      default: ''
    },

    popHeaderStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },

    popDataStyle: {
      type: Object,
      default: () => {
        return {}
      }
    }

  },

  data () {
    return {
      columns: [],
      arrowDown: require('./icons/expander-down.png')
    }
  },

  computed: {
    $lp () {
      return function (name) {
        if (!name) {
          return name
        }
        return this.$t('table.' + name)
      }
    },

    headerClass () {
      const classes = []
      if (this.type === 'primary') {
        classes.push('sp-color-bg-3')
      }
      if (this.border === 'border') {
        classes.push('border')
      }
      return classes
    },

    dataClass () {
      const classes = []
      if (this.border === 'border') {
        classes.push('border')
      }
      return classes
    }
  },

  methods: {
    style (width) {
      if (Array.isArray(width)) {
        return width.reduce((pre, cur) => pre + cur)
      }
      return { width: width !== 0 ? width + 'px' : 'auto' }
    },

    getHeader () {
      const headChildren = []
      const renderHearder = (c, colspan) => {
        headChildren.push(h('td', { class: [...this.headerClass], colspan: colspan, style: Object.assign(this.style(c.width), this.popHeaderStyle) },
          h('div', { class: 'head-column flex-center', style: this.style(c.width) }, c.header ? c.header(h) : (c.label || c.columnName))))
      }
      this.columns.forEach(c => {
        if (c.render instanceof Array) {
          renderHearder(c, c.render.length)
        } else {
          renderHearder(c)
        }
      })
      return h('thead', { class: 'table-head' }, h('tr', null, headChildren))
    },

    getColumnsrender () {
      const children = []
      this.dataList.forEach((d, index) => {
        const trChildren = []
        const renderDataColumn = (c, width, slot, render) => {
          trChildren.push(h('td', { class: [...this.dataClass], style: Object.assign(this.style(width), this.popDataStyle), onClick: (e) => { this.click(d, e) } },
            h('div', { class: [{ 'default-column': !slot }, 'flex-center data-column ellipsis'], style: this.style(width) },
              !slot ? h(Tooltip, { width: width }, render(h, d, index))
                : h('div', { class: 'flex-100' }, render(h, d, index)))))
        }
        this.columns.forEach(c => {
          if (typeof c.render === 'function') {
            renderDataColumn(c, c.width, c.slot, c.render)
          } else if (c.render instanceof Array) {
            c.render.forEach((r, index) => {
              renderDataColumn(c, c.width[index], c.slot[index], r)
            })
          }
        })
        if (this.$slots.expand && this.showArrow) {
          trChildren.push(h('td', { class: ['arrow', { 'arrow-down': d.expand }], width: '30px', onClick: () => { this.expand(d) } },
            h('img', { src: this.arrowDown })))
        }
        children.push(h('tr', {}, trChildren))
        if (this.$slots.expand) {
          d.$index = index
          children.push(withDirectives(h('tr', {}, h('td', { class: [...this.dataClass, 'expand data-column'], style: this.popDataStyle, colspan: this.getExpandCols() },
            this.$slots.expand(d))), [[vShow, d.expand]]))
        }
      })

      return children
    },

    getExpandCols () {
      let sum = 0
      this.columns.forEach(c => {
        if (typeof c.render === 'function') {
          sum++
        } else if (c.render instanceof Array) {
          sum += c.render.length
        }
      })
      return sum
    },

    expand (d) {
      console.log(this.$refs.table.scrollWidth, this.$refs.table.clientWidth)
      d.expand = !d.expand
    },

    click (d) {
      if (!this.showArrow) {
        d.expand = !d.expand
      }
    }
  },

  render () {
    return h('div', { ref: 'table', class: 'SpTableDIY table-container', style: { width: typeof this.width === 'number' ? `${this.width}px` : this.width, height: this.height } },
      [h('div', { class: 'hiddenc-column' }, this.$slots.default()),
        h('table', { class: 'table', border: 0, cellspacing: 0, cellpadding: 0},
          [this.getHeader(), this.getColumnsrender()])])
  }
})
</script>

<style scoped lang="less">
@gap:20px;
.SpTableDIY{
  overflow-x: auto;
  overflow-y: hidden;
  .hiddenc-column{
    visibility: hidden;
    position: absolute;
    z-index: -100;
  }
  .table{
    overflow:hidden;
    width: 100%;
    border-collapse: collapse;
    .border{
      border:1px solid #DBDBDB;
    }
    .head-column{
      min-height: 60px;
      font-size: 18px;
      font-family: Arial;
      font-weight: bold;
      text-align: center;
      white-space: nowrap;
    }
    .data-column{
      font-size: 15px;
      font-family: Arial;
      font-weight: bold;
      vertical-align: middle;
      text-align: center;
      min-height: 60px;
      padding:0 @gap/3;
      box-sizing: border-box;
    }
    .flex-center{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ellipsis{
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .arrow{
      vertical-align: middle;
      transition-duration: .5s;
      cursor: pointer;
    }
    .arrow-down{
      transform: rotate(180deg);
      transition-duration: .5s;
    }
    .expand{
      padding: 0;
    }
  }
}
</style>
