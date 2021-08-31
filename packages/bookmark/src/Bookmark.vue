<template>
  <div class="XlBookmark" :class="classes" :style="style" @click="clickHandler">
    <div class="xl-bookmark-label" :class="classesInner">
      <div><slot>{{ label }}</slot></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {themeType} from '../../types'
export default {
  name: 'XlBookmark',

  nameSpace: 'XlBookmark',
  components: {
  },
  inject:['XlBookmarkGroup'],

  props: {
    modelValue: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'primary'
    },

    lightStyle:Boolean,

    label: {
      type: String,
      default: ''
    },

    clickHandle: {
      type: Function,
      default () {
        return ''
      }
    },

    to: {
      type: [String,Object],
      default: ''
    },
    width: {
      type: Number,
      default: 0
    },

    height: {
      type: Number,
      default: 0
    },
  },

  emits: ['update:modelValue','click-handle'],

  data () {
    return {
      clicked: false
    }
  },

  computed: {
    xlBookmarkGroup(){
      return this.XlBookmarkGroup.value||this.XlBookmarkGroup
    },
    isGroup () {
      return this.xlBookmarkGroup.name === 'XlBookmarkGroup'
    },

    isLight(){
      return this.isGroup?this.xlBookmarkGroup.lightStyle:this.lightStyle
    },

    themeType(){
      return this.isGroup ? this.xlBookmarkGroup.type : this.type
    },

    model: {
      get () {
        return this.isGroup ? this.xlBookmarkGroup.modelValue : this.modelValue
      },

      set (nv) {
        this.isGroup ? this.xlBookmarkGroup.update(nv) : this.$emit('update:modelValue', nv)
      }
    },

    classes(){
      const classes = [themeType(this.themeType,'bg',this.isLight),themeType(this.themeType,'',this.isLight)]
      return classes
    },
    classesInner(){
      let classes = [themeType('white','bg')]
      if(this.model===this.label){
        classes = [themeType(this.themeType,'bg',this.isLight),themeType('white')]
      }
      return [...classes]
    },
    widthC () {
      if (this.width === 0) {
        return 'auto'
      } else if (this.width > 1) {
        return this.width + 'px'
      } else if (this.width < 1) {
        return this.width * 100 + '%'
      } else {
        return '100%'
      }
    },

    heightC () {
      if (this.height === 0) {
        return 'auto'
      } else if (this.height > 1) {
        return this.height + 'px'
      } else if (this.height < 1) {
        return this.height * 100 + '%'
      } else {
        return '100%'
      }
    },
    style () {
      const style = {}
      if (this.width !== 0) {
        style.width = this.widthC
      }
      if (this.height !== 0) {
        style.height = this.heightC
      }
      return style
    },
  },

  watch: {
  },

  created () {
    if (this.model === this.label) {
      this.go()
    }
  },

  mounted () {
  },

  methods: {
    clickHandler (e) {
      e.stopPropagation();
      this.model = this.label
      this.go()
      this.$emit('click-handle',this.label)
      this.XlBookmarkGroup?.value?.clickHandle?.(this.label)
    },

    go () {
      //设置路由跳转
      if(this.to&&this.$router){
        if (typeof this.to === 'string') {
          if (this.to?.slice(1) !== '/') {
            this.$router.push({ name: this.to })
          }else{
            this.$router.push({ path: this.to })
          } 
        } else {
          this.$router.push(this.to)
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.XlBookmark{
  @gap:20px;
  margin-right: @gap/4;
  width:fit-content;
  width:-webkit-fit-content;
  width:-moz-fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 1px;
  cursor: pointer;
  >.xl-bookmark-label{
    width: 100%;
    height: 100%;
    padding:0 (@gap+5) 0 15px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
