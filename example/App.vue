<template>
  <div class="content">
    <div class="main">
      <XlIcon />
      <XlInput type="warn" />
      <div class="none" />
      <button type="button" @click="popleft=true">left</button>
      <XlPopup v-model="popleft" direction="left" :mask="false" :width="50" :height="50">
        <XlInput pop-class="warn" :width="1" :height="50" />
        <XlInput pop-class="warn" :width="1" :height="50" />
        <XlInput pop-class="warn" :width="1" :height="50" />
        <XlInput pop-class="warn" :width="1" :height="50" />
        <XlInput pop-class="warn" :width="1" :height="50" />
      </XlPopup>
      <button type="button" @click="poptop=true">top</button>
      <XlPopup v-model="poptop" direction="top" :mask="false" :width="50" :height="50">
        <XlInput pop-class="warn" :width="1" :height="50" />
        <XlInput pop-class="warn" :width="1" :height="50" />
        <XlInput pop-class="warn" :width="1" :height="50" />
        <XlInput pop-class="warn" :width="1" :height="50" />
        <XlInput pop-class="warn" :width="1" :height="50" />
      </XlPopup>
      <button type="button" @click="popright=true">right</button>
      <XlPopup v-model="popright" direction="right" :mask="false" :width="50" :height="50">
        <XlInput pop-class="warn" :width="1" :height="50" />
        <XlInput pop-class="warn" :width="1" :height="50" />
        <XlInput pop-class="warn" :width="1" :height="50" />
        <XlInput pop-class="warn" :width="1" :height="50" />
        <XlInput pop-class="warn" :width="1" :height="50" />
      </XlPopup>
      <button type="button" @click="popbottom=true">111</button>
      <XlPopup v-model="popbottom" direction="bottom" :mask="false" :width="50" :height="50">
        <XlInput pop-class="warn" :width="1" :height="50" />
        <XlInput pop-class="warn" :width="1" :height="50" />
        <XlInput pop-class="warn" :width="1" :height="50" />
        <XlInput pop-class="warn" :width="1" :height="50" />
        <XlInput pop-class="warn" :width="1" :height="50" />
      </XlPopup>
      <button type="button" @click="popcenter=true">center</button>
      <XlPopup v-model="popcenter" type="dialog" :mask="false" title="111" :width="80" :height="20">
        11111111111111111111111111111111111111111111111111111111111111111111111111111
      </XlPopup>
    </div>

    <div>
      {{ choose }}
      <XlChooseGroup v-model="chooseradio" class="text-left" icon-style-type="warn" light-style icon-type="radio" type="checkbox">
        <XlChoose value="111">111</XlChoose>
        <XlChoose value="222">222</XlChoose>
      </XlChooseGroup>
      <XlChooseGroup v-model="choose" class="text-left" icon-style-type="warn" icon-type="checkbox" type="radio">
        <XlChoose value="111">111</XlChoose>
        <XlChoose value="222">222</XlChoose>
      </XlChooseGroup>
    </div>
    <div>
      <XlInput light-style type="warn" :height="50" placeholder="1111" />
    </div>

    <div style="margin-top:20px">
      <button @click="collapse=!collapse">collapse</button>
      <XlCollapse>
        <div v-show="collapse">
          <div>111111111</div>
          <div>111111111</div>
          <div>111111111</div>
          <div>111111111</div>
          <div>111111111</div>
        </div>
      </XlCollapse>
    </div>

    <div style="margin-top:20px">
      <XlPopover v-model="popover" position="bottom" height="400" width="200" offset-parent="100" offset="-200"
                 always-in-view :show-arrow="false" inline>
        <template #reference>
          <button @click="popover=!popover">collapse</button>
        </template>
        <div>111111111</div>
        <div>111111111</div>
        <div>111111111</div>
        <div>111111111</div>
      </XlPopover>
    </div>
    <div style="margin-top:20px">
      <XlPopover v-model="popoverTop" position="top" offset="1000" :show-arrow="true" inline>
        <template #reference>
          <button @click="popoverTop=!popoverTop">collapse-top</button>
        </template>
        <div>111111111</div>
        <div>111111111</div>
        <div>111111111</div>
        <div>111111111</div>
        <div>111111111</div>
        <div>111111111</div>
        <div>111111111</div>
        <div>111111111</div>
      </XlPopover>
    </div>
    <div style="margin-top:20px">
      <XlPopover v-model="popoverleft" position="left" inline>
        <template #reference>
          <button @click="popoverleft=!popoverleft">collapse-left</button>
        </template>
        <div>111111111</div>
        <div>111111111</div>
        <div>111111111</div>
        <div>111111111</div>
        <div>111111111</div>
      </XlPopover>
    </div>
    <div style="margin-top:20px">
      <XlPopover v-model="popoverright" position="right" offset="200" trigger="click" width="200" inline>
        <template #reference>
          <button @click="popoverright=!popoverright">collapse-right</button>
        </template>
        <div>111111111</div>
        <div>111111111</div>
        <div>111111111</div>
        <div>111111111</div>
        <div>1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111112</div>
      </XlPopover>
    </div>
    <div>
      <XlBookmarkGroup v-model="bookmark" light type="notice" @click-handle="click">
        <XlBookmark label="111" />
        <XlBookmark label="222" />
        <XlBookmark label="333" />
      </XlBookmarkGroup>
    </div>
    <XlCard light>111</XlCard>
    <div>
      <div>code:{{ code }}</div>
      <XlIdentify v-model="code" />
    </div>
    <div>
      <XlButton type="primary" plain>button</XlButton>
      <XlButton type="primary" plain light-style>button</XlButton>
      <XlButton type="primary" light-style>button</XlButton>
      <XlButton type="primary">button</XlButton>
    </div>
    <div>
      <XlTooltip width="50">2111111111111111111111111111111111111111111111111</XlTooltip>
    </div>
    <div class="gap">
      <XlTable v-model:currPage="currPage" type="primary" :data-list="dataList" show-arrow column-height="70" total="500">
        <XlTableColumn column-name="a" width="100" />
        <XlTableColumn column-name="b" />
        <XlTableColumn column-name="c" />
        <XlTableColumn column-name="d" />

        <template #expand="row">
          <div>{{ row.$index }}</div>
          <div>{{ row.a }}</div>
          <div>{{ row.b }}</div>
        </template>
      </XlTable>

      <div />
    </div>
    <XlSelect v-model="select" size="1" type="primary" multi-select placeholder="jjj">
      <XlSelectOption type="warn" value="111" label="111" />
      <XlSelectOption value="222" label="222" />
      <XlSelectOption value="333" label="333" />
      <XlSelectOption type="warn" value="111" label="111" />
      <XlSelectOption value="222" label="222" />
      <XlSelectOption value="333" label="333" />
      <XlSelectOption type="warn" value="111" label="111" />
      <XlSelectOption value="222" label="222" />
      <XlSelectOption value="333" label="333" />
      <XlSelectOption type="warn" value="111" label="111" />
      <XlSelectOption value="222" label="222" />
      <XlSelectOption value="333" label="333" />
    </XlSelect>
    <div class="none" />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },

  data: () => {
    return {
      popleft: false,
      popright: false,
      poptop: false,
      popbottom: false,
      popcenter: false,
      choose: '111',
      chooseradio: [''],
      select: '',
      collapse: false,
      popoverleft: false,
      popover: false,
      popoverright: false,
      popoverTop: false,
      popoverbottom: false,
      // popover:false,
      bookmark: '111',
      code: '',
      dataList: [{
        a: 'aaaaaaaaaaaaaaaaaaaaaaaaa',
        b: 'bbb',
        c: 'cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
        d: 'dddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'
      },
      {
        a: 'aaaaaaaaaaaaaaaaaaaaaaaaa',
        b: 'bbb',
        c: 'cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
        d: 'dddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'
      }, {
        a: 'aaaaaaaaaaaaaaaaaaaaaaaaa',
        b: 'bbb',
        c: 'cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
        d: 'dddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'
      }, {
        a: 'aaaaaaaaaaaaaaaaaaaaaaaaa',
        b: 'bbb',
        c: 'cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
        d: 'dddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'
      }],

      currPage: 2
    }
  },

  methods: {
    click (e) {
      console.log(e)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height:100%;
  /* background-color: gray; */
  /* overflow: hidden; */
}
.content{
  text-align: center;
}
.main{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}
.none{
  height:3000px;
}
.warn{
  background-color: burlywood;
  opacity: 0.9;
}
.text-left{
  text-align: left;
}
.gap{
  margin:40px;
}
</style>
