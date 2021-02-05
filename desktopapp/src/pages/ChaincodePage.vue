<template>
  <div>
    <h1>
<Button label="setup" @click="setup()" />
<br>
<Button label="cleanup"  @click="cleanup()"   />
<br>
<Button label="go"  />
<br>
<Button label="node"  />
<br>
<Button label="java"  />
    </h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import  ChainCodeProcess from "../module/ChainCodeProcess"; 
import Component from "vue-class-component";
@Component({
  components: {},
})
export default class ChaincodePage extends Vue {

setup(){
  ChainCodeProcess.testFunction()
}
cleanup(){
  ChainCodeProcess.testClean()
}
}

</script>

<style></style>
