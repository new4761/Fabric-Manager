<template>
<Button label="Submit" @click="testFunction()"/> 
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import ConfigtxConfig from '../../models/ConfigtxConfig'

@Component({
  components: {
  }
})
export default class ButtonConfigtx extends Vue {
data(){
    return{}
}
testFunction(){
    ConfigtxConfig.createFile();
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
