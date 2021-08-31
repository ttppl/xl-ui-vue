<template>
  <div ref="popover" @[popTrigger]="show" v-clickoutside="closePopOutSide" class="XlPopover" :class="{'inline-block':inline}">
      <slot name="reference" />
    <popper ref="popper" v-model="model" :position="position" :show-arrow="showArrow" :width="width" :height="height" :pop-style="popStyle" @close="closePop">
      <slot />
    </popper>
  </div>
</template>

<script type="text/ecmascript-6">
import clickoutside from '../../utils/clickouside'
import popper from './Popper'
import {computed} from 'vue'
export default {
  name: 'XlPopover',

  nameSpace: 'XlPopover',
  directives: { clickoutside },
  provide () {
    return {
      XlPopover: computed(() => {
        return {
          name: 'XlPopover',
          dom:()=>{
            return this.$refs.popover
          }
        }
      })
    }
  },
  components: {
    popper
  },

  props: {
    modelValue: Boolean,
    inline: Boolean,
    width: {
      type: Number,
      default: 0
    },

    height: {
      type: Number,
      default: 0
    },

    trigger: {
      type: String,
      default: 'click'
    },

    borderRadius: {
      type: Number,
      default: 3
    },

    popStyle: {
      type: Object,
      default: function () { return null }
    },

    showArrow: {
      type: Boolean,
      default: true
    },
    position:{
      type:String,
      default:'bottom'
    }
  },

  emits: ['update:modelValue'],
  setup () {

  },

  data () {
    return {
      showPanel: false
    }
  },

  computed: {
    model: {
      get () {
        if (this.trigger === 'manual') { return this.modelValue }
        return this.showPanel
      },

      set (nv) {
        if (this.trigger === 'manual') {
          this.$emit('update:modelValue', nv)
        } else {
          this.showPanel = nv
        }
      }
    },

    popTrigger () {
      if (this.trigger === 'hover') {
        return 'mouseover'
      }
      if (this.trigger === 'click' || this.trigger === 'manual') {
        return 'click'
      }
      return this.trigger
    },

    style () {
      const style = {}
      if (this.borderRadius > 0) {
        style.borderRadius = this.borderRadius + 'px'
      }
      if (this.width !== 0) {
        style.width = this.widthC
      }
      if (this.height !== 0) {
        style.height = this.heightC
      }
      return style
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
    }
  },

  created () {
  },

  mounted () {
  },

  methods: {
    show () {
      this.model = !this.model
    },

    closePopOutSide (e) {
      if (!this.$refs?.popper?.contains(e.target)) {
        this.model = false
      }
    },

    closePop () {
      this.model = false
    }
  }
}
</script>

<style scoped lang="less">
@gap:20px;
.inline-block{
  display: inline-block;
}
.XlPopover{
  position: relative;
}
</style>
