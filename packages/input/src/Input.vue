<template>
  <div ref="input" v-if="textType=='text'" class="XlInput" :class="classes" :style="style">
    <input v-model="model" :style="inputStyle" :class="inputClasses" type="text" :placeholder="placeholder" @change="input" @blur="blur">
  </div>
  <div ref="input" v-else class="XlInput" :class="classes" :style="style">
    <textarea v-model="model" :class="inputClasses" :style="inputStyle" :rows="row" :placeholder="placeholder" />
  </div>
</template>

<script type="text/ecmascript-6">
import {InputThemeType} from '../../types'
export default {
  name: 'XlInput',

  nameSpace: 'XlInput',

  components: {
  },

  props: {
    type: {
      type: String,
      default: 'ini'
    },

    textType: {
      type: String,
      default: 'text'
    },

    row: {
      type: String,
      default: '3'
    },

    width: { // 0-1为百分比，>1为px
      type: [Number, String],
      default: 0
    },

    height: {
      type: [Number, String],
      default: 50
    },

    modelValue: {
      type: String,
      default: ''
    },

    placeholder: {
      type: String,
      default: ''
    },

    popClass: {
      type: [Array, String],
      default: () => {
        return []
      }
    },

    popStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },

    lightStyle:Boolean
  },

  emits: ['update:modelValue', 'input', 'change'],
  data () {
    return {
    }
  },

  computed: {
    model: {
      get () {
        return this.modelValue
      },

      set (val) {
        this.$emit('update:modelValue', val)
      }
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

    classes () {
      const type = InputThemeType(this.type,this.lightStyle)|| 'xl-none'
      return type
    },

    inputClasses () {
      let classes = this.popClass || []
      return classes
    },

    style () {
      const style=this.$refs.input?.style||{}
      // 宽高
      if (!style.width && this.width !== 0) { style.width = this.widthC }
      if (!style.borderRadius) { style.borderRadius = '4px' }
      // textarea不设置高度，由row定义
      if (!style.height && this.height !== 0 && this.textType.toLowerCase() !== 'textarea') { style.height = this.heightC }
      // if(this.lightStyle){style.opacity="0.5"}
      return style
    },
    inputStyle() {
      // 自定义style
      const style = this.popStyle || {}
      if (!style.height && this.height !== 0 && this.textType.toLowerCase() !== 'textarea') { style.height = this.heightC }
      if (!style.fontSize && this.height > 1) { style.fontSize = this.height / 3 + 'px' }
      return style
    }
  },

  methods: {
    input () {
      this.$emit('input')
    },

    blur () {
      this.$emit('change')
    }
  }
}
</script>

<style lang="less">
.XlInput{
  display: inline-flex;
  align-items: center;
  border-width: 0.5px;
  border-style: solid;
  >input,textArea{
    border:none;
    outline: none;
    font-size: 18px;
    width: 100%;
    padding: 0 1em 0 1em;
    background-color: transparent;
    z-index: 10;
  }
  >textArea{
    padding: 1em 1em 1em 1em;
    resize:none;
  }
}
</style>
