<template>
  <div class="XlSelect" :style="style">
    <div ref="select" tabindex="0" v-clickoutside="closeSelect" :class="classes" class="xl-select-label" :style="styleInner" @click="showList">
      <span v-if="selected" :style="textStyle" class="selected">{{ selected }}</span>
      <span v-else class="placeholder">{{ placeholder }}</span>
      <!-- <sp-icon :size="arrowSize" class="select-icon" :class="{'select-icon-checked':showSelectMenu}" type="arrowDown" /> -->
      <svg t="1629969520836" class="select-icon" :class="{'select-icon-checked':showSelectMenu}" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2710" :width="arrowSize" :height="arrowSize"><path d="M132.577882 283.648c7.710118-8.041412 18.251294-12.589176 29.214118-12.589176 10.992941 0 21.534118 4.517647 29.214118 12.589176L514.349176 619.218824l318.644706-330.812236c7.710118-8.041412 18.251294-12.589176 29.214118-12.589176 11.023059 0 21.534118 4.517647 29.244235 12.589176 8.071529 8.372706 12.107294 19.335529 12.107294 30.328471 0 10.992941-4.065882 21.985882-12.107294 30.32847L543.533176 710.234353a40.448 40.448 0 0 1-29.214117 12.589176c-10.992941 0-21.504-4.517647-29.214118-12.589176L132.577882 344.304941a44.001882 44.001882 0 0 1 0-60.656941z" p-id="2711" fill="#bfbfbf"></path></svg>
    </div>
    <!-- <transition name="tst-scale-down">
      <div v-show="showSelectMenu" class="xl-select-list" :style="{ width: '100%'}">
        <div class="xl-select-options">
          <slot>
            <div class="no-data-tip">
              No data
            </div>
          </slot>
        </div>
      </div>
    </transition> -->
    <Popper v-model="showSelectMenu" type="select" min-width-follow-parent>
      <div class="options">
        <slot><div class="no-data-tip">No data</div></slot>
      </div>
    </Popper>
  </div>
</template>

<script type="text/ecmascript-6">
import clickoutside from '../../utils/clickouside'
import { computed } from 'vue'
import {InputThemeType,themeType} from '../../types'
import Popper from '../../popover/src/Popper.vue'
export default {
  name: 'XlSelect',

  directives: { clickoutside },

  components: {
    Popper
  },

  provide () {
    return {
      XlSelect:  computed(()=>{
        return{
          name: 'XlSelect',
          model: this.model,
          multiSelect: this.multiSelect,
          update: (nv) => {
            this.model=nv
          }
        }
      }),
      XlPopperTrigger: computed(() => {
        return {
          dom: () => {
            return this.$refs.select
          }
        }
      })
    }
  },

  props: {
    type: {
      type: String,
      default: 'primary'
    },

    size: {
      type: String,
      default: ''
    },

    multiSelect: Boolean,

    lightStyle:Boolean,

    modelValue: {
      type: [String,Array],
      required: true,
      default: ''
    },

    placeholder: {
      type: String,
      default: ''
    },

    width: {
      type: [Number, String],
      default: 1
    },

    height: {
      type: [Number, String],
      default: 50
    },

    popClass: {
      type: Array,
      default: () => {
        return []
      }
    },

    outerStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },

    popStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },

    textStyle: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  emits: ['update:modelValue'],

  data () {
    return {
      showSelectMenu: false
    }
  },

  computed: {
    classes () {
      const cls = this.popClass || []
      const type = InputThemeType(this.type || 'primary',this.lightStyle)
      if(this.showSelectMenu){
        type.splice(1,1,themeType(this.type||'primary','bd',this.lightStyle))
      }
      return [...type, ...cls,focus]
    },

    model: {
      get () {
        return this.modelValue
      },

      set (val) {
        this.$emit('update:modelValue', val)
      }
    },

    selected () {
      if (this.model?.length > 0) {
        if (this.multiSelect) {
          return this.model.join(',')
        } else {
          return this.model
        }
      }
      return null
    },

    widthC () {
      if(isNaN(this.width)){
        return this.width
      }
      if (this.width === 0) {
        return 'auto'
      } else if (this.width > 1) {
        return `${this.width}px`
      } else if (this.width < 1) {
        return `${this.width*100}%`
      } else {
        return '100%'
      }
    },

    heightC () {
      if(isNaN(this.height)){
        return this.height
      }
      if (this.height === 0) {
        return 'auto'
      } else if (this.height > 1) {
        return `${this.height}px`
      } else if (this.height < 1) {
        return `${this.height*100}%`
      } else {
        return '100%'
      }
    },

    style () {
      const style = this.outerStyle||{}
      if (this.width !== 0) {
        style.width = this.widthC
      }
      if (this.height !== 0) {
        style.height = this.heightC
      }
      if (this.size === 'small') {
        style.height = '30px'
        style.width = '255px'
      }
      return style
    },

    styleInner () {
      const style = this.popStyle || {}
      if (this.size === 'small') {
        style.height = '30px'
        style.width = '255px'
      } else {
        style.height = '100%'
        style.width = '100%'
      }
      // if(this.lightStyle){style.opacity="0.5"}
      return style
    },

    arrowSize () {
      if (this.size === 'small') {
        return 20
      }
      return this.height / 4
    }
  },

  methods: {
    showList(){
      this.showSelectMenu=!this.showSelectMenu
    },

    closeSelect () {
      if (this.showSelectMenu === false) {
        return
      }
      this.showSelectMenu = false
    }
  },
  watch:{
    showSelectMenu(nv){
      if(nv){
        this.$refs.select.focus()
      }
    }
  }
}
</script>

<style lang="less">
// @import '../../styles/transition.less';
.XlSelect{
  display: inline-block;
  position: relative;
  >.xl-select-label{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    position: relative;
    cursor: pointer;
    border-style: solid;
    border-width: 1px;
    outline: none;
    border-radius: 3px;
      >.selected{
        text-indent: 1em;
      }
      >.placeholder{
        text-indent: 1em;
        color: #909399;
      }
      >.select-icon{
        cursor: pointer;
        text-align: left;
        right:5%;
        position: relative;
        vertical-align: middle;
        transition-duration: 0.5s;
      }
      >.select-icon-checked{
        transform: rotate(-180deg);
        -moz-transform: rotate(-180deg);
        -webkit-transform: rotate(-180deg);
        -o-transform: rotate(-180deg);
        transition-duration: 0.5s;
      }
  }
}
// .xl-select-list{
//   position: absolute;
//   background-color: transparent;
//   z-index: 9999;
//   >.xl-select-options{
//     background-color: white;
//     box-shadow: 0px 3px 21px 0px rgba(0, 0, 0, 0.17);
//     padding: 10px 0 10px 0;
//     >.no-data-tip{
//       padding: 10px 0 10px 0;
//       text-align: center;
//       cursor: default;
//     }
//   }
// }
// .xl-select-list::before{
//   content: '';
//   display: block;
//   width: 0;
//   height: 0;
//   border: 10px solid;
//   position: relative;
//   margin: 0 auto;
//   border-color: transparent transparent white;
// }

</style>
