<template>
<Button label="Submit" @click="testFunction()"/> 
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
//import ConfigtxConfig from '../../models/ConfigtxConfig'
//import OSProcess from '../../module/OSProcess'
import SpecConifg from '../../models/SpecConfig'
@Component({
  components: {
  }
})
export default class ButtonConfigtx extends Vue {
data(){
    return{}
}
testFunction(){
 //   ConfigtxConfig.createFile();
 //OSProcess.testfunction();
 SpecConifg.createFile();
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
