<script type="text/ecmascript-6">
import { h, Teleport, Transition, vShow, withDirectives, withCtx } from 'vue'
import zIndexManager from '../../utils/zIndexManager'
import Scroll from '../../scroll/src/Scroll'
import whCompute from '../../mixins/whCompute'
const TYPES={
  primary : 'xl-popper-primary-style',
  select : 'xl-popper-none-style'
}
export default {
  name: 'XlPropper',

  nameSpace: '',
  mixins:[whCompute],
  components: {
  },
  inject:['XlPopperTrigger'],
  props: {
    modelValue: Boolean,

    width: {
      type: [Number,String],
      default: 0
    },

    height: {
      type: [Number,String],
      default: 0
    },

    type: {
      type: String,
      default: 'primary'
    },

    position:{
      type:String,
      default:'bottom'
    },

    popStyle: {
      type: Object,
      default: function () { return null }
    },

    showArrow: {
      type: Boolean,
      default: true
    },
    minWidthFollowParent: Boolean
  },

  emits: ['update:modelValue', 'close','mouseover', 'mouseout'],

  data () {
    return {
      zIndex: 100,
      parentwidth: '',
      popperPosition:{
        left: 0,
        right:0,
        top: 0,
        bottom: 0,
      },
      arrowAttr:{
        position:{
          left: 0,
          right:0,
          top: 0,
          bottom: 0,
        },
        arrowSize:10,//border-width
        color:'white'
      },
      
      finalPosition:''
    }
  },

  computed: {
    model: {
      get () {
        return this.modelValue
      },

      set (nv) {
        this.$emit('update:modelValue', nv)
      }
    },
    xlPopperTrigger(){
      return this.XlPopperTrigger.value||this.XlPopperTrigger
    },

    widthC () {
      if(isNaN(this.width)){
        return this.width
      }
      if (this.width === 0) {
        return 'auto'
      } else if (this.width > 1) {
        return this.width + 'px'
      } else if (this.width < 1) {
        return `${window.innerWidth * this.width}px`
      } else {
        return window.innerWidth + 'px'
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
        return `${window.innerHeight * this.height}px`
      } else {
        return  `${window.innerHeight}px`
      }
    },

    style () {
      const style = {}
      style.zIndex = this.zIndex
      if(this.popperPosition.left){
        style.left = `${this.popperPosition.left}px`
      }
      if(this.popperPosition.right){
        style.right = `${this.popperPosition.right}px`
      }
      if(this.popperPosition.top){
        style.top = `${this.popperPosition.top}px`
      }
      if(this.popperPosition.bottom){
        style.bottom = `${this.popperPosition.bottom}px`
      }
      return style
    },

    contentStyle () {
      const style = this.popStyle || {}
      style.zIndex = this.zIndex
      if (this.width !== 0) {
        style.width = this.widthC
      }
      if (this.height !== 0) {
        style.height = this.heightC
      }
      if (this.minWidthFollowParent) {
        style.minWidth = `${this.parentwidth}px`
      }
      return style
    },

    arrowStyle () {
      const style = {}
      style.zIndex = this.zIndex-1
      if(this.arrowAttr.position.left){
        style.left = `${this.arrowAttr.position.left}px`
      }
      if(this.arrowAttr.position.right){
        style.right = `${this.arrowAttr.position.right}px`
      }
      if(this.arrowAttr.position.top){
        style.top = `${this.arrowAttr.position.top}px`
      }
      if(this.arrowAttr.position.bottom){
        style.bottom = `${this.arrowAttr.position.bottom}px`
      }
      style.backgroundColor = this.arrowAttr.color
      style.width = `${this.arrowAttr.arrowSize}px`
      style.height = `${this.arrowAttr.arrowSize}px`
      return style
    }
  },

  created () {
    this.zIndex = zIndexManager.nextIndex()
  },

  updated () {
    // this.calcPosition()
  },

  mounted () {
    this.calcPosition()
    if (!this.isFixed(this.$parent.$refs.popover)) { // 固定位置不监听滚动事件
      document.addEventListener('scroll', this.calcPosition)
    }
    window.addEventListener('resize', this.calcPosition)
  },

  unmounted () {
    if (!this.isFixed(this.$parent.$refs.popover)) {
      document.removeEventListener('scroll', this.calcPosition)
    }
    window.removeEventListener('resize', this.calcPosition)
  },

  watch: {
    modelValue (nv) {
      if (nv) { this.calcPosition() }
    }
  },

  methods: {
    calcPosition () {
      if (!this.modelValue) {
        return
      }
      const parent = this.xlPopperTrigger.dom()
      if (parent) {
        const parentOffetLeft = parent.getBoundingClientRect().left
        const parentOffsetRight = parent.getBoundingClientRect().right
        const parentOffsetTop = parent.getBoundingClientRect().top
        const parentOffsetBottom = parent.getBoundingClientRect().bottom
        const parentwidth = parent.getBoundingClientRect().width
        this.parentwidth = parentwidth
        const parentHeight = parent.getBoundingClientRect().height

        const ownWidthOrig = this.$refs.popper?.getBoundingClientRect().width
        const ownWidth = this.minWidthFollowParent ? Math.max(ownWidthOrig, parentwidth) : ownWidthOrig

        const ownHeight = this.$refs.popper?.getBoundingClientRect().height
        const arrowSize = this.showArrow?this.arrowAttr.arrowSize:0
        if(this.position==='bottom'){
          this.finalPosition = (parentOffsetBottom + ownHeight + arrowSize)>window.innerHeight?'top':'bottom'
        }
        if(this.position==='top'){
          this.finalPosition = (parentOffsetTop - ownHeight - arrowSize)<0?'bottom':'top'
        }
        if(this.position==='left'){
          if((parentOffetLeft - ownWidth - arrowSize)<0){
            if((parentOffsetRight + ownWidth + arrowSize)>window.innerWidth){
              this.finalPosition = (parentOffsetBottom + ownHeight + arrowSize)>window.innerHeight?'top':'bottom'
            }else{
              this.finalPosition = 'right'
            }
          }else{
            this.finalPosition = 'left'
          }
        }
        if(this.position==='right'){
          if((parentOffsetRight + ownWidth + arrowSize)>window.innerWidth){
            if((parentOffetLeft - ownWidth - arrowSize)<0){
              this.finalPosition = (parentOffsetBottom + ownHeight + arrowSize)>window.innerHeight?'top':'bottom'
            }else{
              this.finalPosition = 'left'
            }
          }else{
            this.finalPosition = 'right'
          }
        }

        // console.log("finaPosition:",this.finalPosition);
        const position = {transition:'tst-scale-down'}
        if(this.finalPosition === 'bottom'){
          const maxOffSetLeft = window.innerWidth - ownWidth
          let left = parentOffetLeft + parentwidth/2 - ownWidth/2
          left = left>0?left:0
          position.left = maxOffSetLeft < left?maxOffSetLeft : left
          position.top = parentOffsetBottom + arrowSize
          if(this.showArrow){
            const arrow = {}
            arrow.top=-(arrowSize/2)
            arrow.left = parentOffetLeft-left+parentwidth/2-arrowSize/2
            this.arrowAttr.position=arrow
          }
        }
        if(this.finalPosition === 'top'){
          const maxOffSetLeft = window.innerWidth - ownWidth
          let left = parentOffetLeft + parentwidth/2 - ownWidth/2
          left = left>0?left:0
          position.left = maxOffSetLeft < left?maxOffSetLeft : left
          position.top = parentOffsetTop - arrowSize - ownHeight
          position.transition='tst-scale-up'
          if(this.showArrow){
            const arrow = {}
            arrow.bottom=-(arrowSize/2)
            arrow.left = parentOffetLeft-left+parentwidth/2-arrowSize/2
            this.arrowAttr.position=arrow
          }
        }
        if(this.finalPosition === 'left'){
          let left = parentOffetLeft - ownWidth-arrowSize
          left = left>0?left:0
          position.left = left
          const maxOffsetTop = window.innerHeight - ownHeight
          const top = parentOffsetTop + parentHeight/2 - ownHeight/2
          position.top = top > maxOffsetTop?maxOffsetTop:top
          position.transition='tst-scale-left'
          if(this.showArrow){
            const arrow = {}
            arrow.right=-(arrowSize/2)
            arrow.top =  parentOffsetTop- top +parentHeight/2-arrowSize/2
            this.arrowAttr.position=arrow
          }
        }
        if(this.finalPosition === 'right'){
          let left = parentOffsetRight + arrowSize
          left = left>0?left:0
          position.left = left
          const maxOffsetTop = window.innerHeight - ownHeight
          const top = parentOffsetTop + parentHeight/2 - ownHeight/2
          position.top = top > maxOffsetTop?maxOffsetTop:top
          position.transition='tst-scale-right'
          if(this.showArrow){
            const arrow = {}
            arrow.left=-(arrowSize/2)
            arrow.top =  parentOffsetTop- top +parentHeight/2-arrowSize/2
            this.arrowAttr.position=arrow
          }
        }
        this.popperPosition=position
      }
      
    
      
    },

    contains (e) {
      return this.$refs?.popperInner?.contains(e)
    },

    isFixed (e) {
      if (!e || e.nodeName === 'BODY') {
        return false
      }
      const pos = window.getComputedStyle(e).position
      if (pos === 'fixed') {
        return true
      }
      if (e.parentNode) {
        return this.isFixed(e.parentNode)
      }
    },
    mouseover (e) {
      this.$emit('mouseover', e)
    },

    mouseout (e) {
      this.$emit('mouseout', e)
    }
  },

  render () {
    return h(Teleport, { to: 'body' }, [h(
      Transition,
      {
        name: this.popperPosition.transition
      },
      {
        default: withCtx(() => [withDirectives(
          h(
            'div',
            {
              class: 'popper-out',
              style: this.style,
              onMouseover: this.mouseover,
              onMouseout: this.mouseout

            }, [h(
              'div',
              { class: [{ arrow: this.showArrow }], style: this.arrowStyle },
              null
            ), h(
              'div',
              { class: [TYPES[this.type], 'xl-popper'], style: this.contentStyle, ref: 'popperInner' },
              h(Scroll, null, this.$slots.default())
            )]

          ),
          [[vShow, this.model]]
        )])
      }
    ), this.width === 0 || this.height === 0 ? h(
      'div',
      { class: [TYPES[this.type] , 'xl-hidden-popper'], ref: 'popper', style: this.contentStyle },
      h(Scroll, null, this.$slots.default())
    ) : null])
  }
}
</script>

<style lang="less">
@gap:20px;
.popper-out{
  position: fixed;
  z-index: 100;
  left:0;
  top:0;
  border-radius: 5px;
  box-shadow: 0px 3px 21px 0px rgba(0, 0, 0, 0.17);
  >.arrow{
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    box-shadow: 0px 3px 21px 0px rgba(0, 0, 0, 0.17);
    transform: rotate(45deg);
  }
}
.xl-popper{
  position: relative;
  overflow: hidden;
}
.xl-popper-primary-style{
  padding:@gap/2 @gap/2 @gap/2 @gap/2;
  background-color: white;
}
.xl-popper-none-style{
  background-color: white;
}
.xl-hidden-popper{
  position: absolute;
  top:0;
  visibility: hidden;
  z-index: -100;
}


.tst-scale-down-enter-active,
.tst-scale-down-leave-active {
  opacity: 1;
  -webkit-transform: scaleY(1);
  transform: scaleY(1);
  -webkit-transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  -webkit-transform-origin: center top;
  transform-origin: center top; 
}

.tst-scale-down-enter-from,
.tst-scale-down-leave-to {
  opacity: 0;
  -webkit-transform: scaleY(0);
  transform: scaleY(0); 
}

.tst-scale-up-enter-active,
.tst-scale-up-leave-active {
  opacity: 1;
  -webkit-transform: scaleY(1);
  transform: scaleY(1);
  -webkit-transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  -webkit-transform-origin: center bottom;
  transform-origin: center bottom; 
}

.tst-scale-up-enter-from,
.tst-scale-up-leave-to {
  opacity: 0;
  -webkit-transform: scaleY(0);
  transform: scaleY(0); 
}

.tst-scale-right-enter-active,
.tst-scale-right-leave-active {
  opacity: 1;
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
  -webkit-transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  -webkit-transform-origin: left center ;
  transform-origin: left center ; 
}

.tst-scale-right-enter-from,
.tst-scale-right-leave-to {
  opacity: 0;
  -webkit-transform: scaleX(0);
  transform: scaleX(0); 
}

.tst-scale-left-enter-active,
.tst-scale-left-leave-active {
  opacity: 1;
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
  -webkit-transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  -webkit-transform-origin: right center ;
  transform-origin: right center ; 
}

.tst-scale-left-enter-from,
.tst-scale-left-leave-to {
  opacity: 0;
  -webkit-transform: scaleX(0);
  transform: scaleX(0); 
}
</style>
