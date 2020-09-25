<template>
  <div>
  <Button label="Submit" icon="pi pi-check" iconPos="right" @click="testFunnction()"/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import HelloWorld from './components/HelloWorld.vue';
import CaServerConfig  from './models/CaServerConfig';

@Component({
  components: {
    HelloWorld
  }
})
export default class App extends Vue {

  testFunnction() {
  //console.log("called"); 
  CaServerConfig.myReadFile();
    
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
}
</style>
