<template>
  <div>
    <div class="main">
        <button @click="popleft=true">left</button>
        <XlPopup v-model="popleft" direction="left" :mask="false" :width="50" :height="50" >
          <XlInput pop-class="warn" :width="1" :height="50"></XlInput>
          <XlInput pop-class="warn" :width="1" :height="50"></XlInput>
          <XlInput pop-class="warn" :width="1" :height="50"></XlInput>
          <XlInput pop-class="warn" :width="1" :height="50"></XlInput>
          <XlInput pop-class="warn" :width="1" :height="50"></XlInput>
        </XlPopup>
        <button @click="poptop=true">top</button>
        <XlPopup v-model="poptop" direction="top" :mask="false" :width="50" :height="50" >
          <XlInput pop-class="warn" :width="1" :height="50"></XlInput>
          <XlInput pop-class="warn" :width="1" :height="50"></XlInput>
          <XlInput pop-class="warn" :width="1" :height="50"></XlInput>
          <XlInput pop-class="warn" :width="1" :height="50"></XlInput>
          <XlInput pop-class="warn" :width="1" :height="50"></XlInput>
        </XlPopup>
        <button @click="popright=true">right</button>
        <XlPopup v-model="popright" direction="right" :mask="false" :width="50" :height="50" >
          <XlInput pop-class="warn" :width="1" :height="50"></XlInput>
          <XlInput pop-class="warn" :width="1" :height="50"></XlInput>
          <XlInput pop-class="warn" :width="1" :height="50"></XlInput>
          <XlInput pop-class="warn" :width="1" :height="50"></XlInput>
          <XlInput pop-class="warn" :width="1" :height="50"></XlInput>
        </XlPopup>
        <button @click="popbottom=true">111</button>
        <XlPopup v-model="popbottom" direction="bottom" :mask="false" :width="50" :height="50" >
          <XlInput pop-class="warn" :width="1" :height="50"></XlInput>
          <XlInput pop-class="warn" :width="1" :height="50"></XlInput>
          <XlInput pop-class="warn" :width="1" :height="50"></XlInput>
          <XlInput pop-class="warn" :width="1" :height="50"></XlInput>
          <XlInput pop-class="warn" :width="1" :height="50"></XlInput>
        </XlPopup>
        <button  @click="popcenter=true">center</button>
        <XlPopup type="dialog" v-model="popcenter" direction="center" :mask="false" :width="50" :height="50" >
          <XlInput pop-class="warn" :width="1" :height="50"></XlInput>
          <XlInput pop-class="warn" :width="1" :height="50"></XlInput>
          <XlInput pop-class="warn" :width="1" :height="50"></XlInput>
          <XlInput pop-class="warn" :width="1" :height="50"></XlInput>
          <XlInput pop-class="warn" :width="1" :height="50"></XlInput>
        </XlPopup>     
      </div>
      <div>
        {{choose}} 
        <XlChooseGroup class="text-left" icon-style-type='warn' light-style v-model="chooseradio" icon-type="radio" type="checkbox">
            <XlChoose value="111">111</XlChoose>
            <XlChoose value="222">222</XlChoose>
        </XlChooseGroup>
        <XlChooseGroup class="text-left" icon-style-type='warn' v-model="choose" icon-type="checkbox" type="radio">
            <XlChoose value="111">111</XlChoose>
            <XlChoose value="222">222</XlChoose>
        </XlChooseGroup>
      </div>
      <div>
        <XlInput light-Style type="warn" :height="50" placeholder="1111"></XlInput>
      </div>
      <div style="margin-top:20px">
        <XlSelect light-Style size="small" type="primary" multi-select placeholder="jjj" v-model="select">
          <XlSelectOption type="warn" value="111" label="111"></XlSelectOption>
          <XlSelectOption value="222" label="222"></XlSelectOption>
          <XlSelectOption value="333" label="333"></XlSelectOption>
        </XlSelect>
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
        <XlPopover v-model="popover" inline>
          <template #reference>
            <button @click="popover=!popover">collapse</button>
          </template>
          <div>111111111</div>
            <div>111111111</div>
            <div>111111111</div>
            <div>111111111</div>
            <div>111111111</div>
        </XlPopover>
      </div>
      <div style="margin-top:20px">
        <XlPopover position="top" v-model="popoverTop" inline>
          <template #reference>
            <button @click="popoverTop=!popoverTop">collapse-top</button>
          </template>
          <div>111111111</div>
            <div>111111111</div>
            <div>111111111</div>
            <div>111111111</div>
            <div>111111111</div>
        </XlPopover>
      </div>
      <div style="margin-top:20px">
        <XlPopover position="left" v-model="popoverleft" inline>
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
        <XlPopover position="right" v-model="popoverright" inline>
          <template #reference>
            <button @click="popoverright=!popoverright">collapse-right</button>
          </template>
          <div>111111111</div>
            <div>111111111</div>
            <div>111111111</div>
            <div>111111111</div>
            <div>111111111</div>
        </XlPopover>
      </div>
      <div>
        <XlBookmarkGroup light @click-handle='click' v-model="bookmark" type="notice">
          <XlBookmark  label="111"></XlBookmark>
          <XlBookmark label="222"></XlBookmark>
          <XlBookmark label="333"></XlBookmark>
        </XlBookmarkGroup>
      </div>
      <XlCard light>111</XlCard>
      <div>
        <div>code:{{code}}</div>
        <XlIdentify v-model="code"></XlIdentify>
      </div>
      <div>
        <XlButton light-style >button</XlButton>
      </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data:()=>{
    return {
      popleft:false,
      popright:false,
      poptop:false,
      popbottom:false,
      popcenter:false,
      choose:'111',
      chooseradio:[''],
      select:'',
      collapse:false,
      popoverleft:false,
      popover:false,
      popoverright:false,
      popoverTop:false,
      popoverbottom:false,
      // popover:false,
      bookmark:"111",
      code:''
    }
  },
  methods:{
    click(e){
      console.log(e);
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
.main{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.warn{
  background-color: burlywood;
  opacity: 0.9;
}
.text-left{
  text-align: left;
}
</style>
