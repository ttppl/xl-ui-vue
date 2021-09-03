<template>
  <div ref="XlButton" class="XlButton" :style="styleC" :class="classC" @click.stop="clickHandler">
    <slot><span class="label">{{ label }}</span></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import whCompute from '../../mixins/whCompute'
import {themeType} from '../../types'
export default {
  name: 'XlButton',

  mixins:[whCompute],
  
  components: {
  },

  emits:['click'],

  props: {
    type: {
      type: String,
      default: 'notice'
    },
    lightStyle:Boolean,

    popStyle: {
      type: Object,
      default () {
        return null
      }
    },

    circle: {
      type: Boolean,
      default:false
    },

    label: { // 内容
      type: String,
      default: ''
    },

    to: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      maxSize:0
    }
  },

  computed: {

    styleC () {
      const style = this.popStyle||{}
      if (this.width !== 0) {
        style.width=this.widthC
      }
      if (this.height !== 0) {
        style.height=this.heightC
      }
      if (this.circle) {
        style.width=this.maxSize+'px'
        style.height=this.maxSize+'px'
        style.borderRadius =  '50%'
      }
      if(this.lightStyle){
        style.borderWidth = '0.5px'
        style.borderStyle = 'solid'
      }
      return style
    },

    classC () {
      const bg = themeType(this.type,'bg',this.lightStyle)
      let color = themeType('white')
      let border = ''
      if(this.lightStyle){
        color = themeType(this.type)
        border = themeType(this.type,'bd')
      }
      return [bg,color,border]
    }

  },

  created () {
  },

  mounted () {
    this.$nextTick(()=>{
      this.maxSize = Math.max(this.$refs.XlButton.clientWidth,this.$refs.XlButton.clientWidth)
    })
  },

  methods: {
    clickHandler () {
      this.go()
      this.$emit('click')
    },

    go () {
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
      if (this.type === 'back') {
        this.$router?.go(-1)
      }
    }
  }
}
</script>

<style lang="less">
.XlButton{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  min-width: 56px;
  min-height: 14px;
  @gap:10px;
  padding: @gap/2 @gap @gap/2 @gap;
  border-radius: 3px;
  font-size: 14px;
  box-sizing: border-box;
}
</style>
