<template>
  <div>
  <button @click="testFunnction()">sadsasd</button>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from './components/HelloWorld.vue';
import  CaServerConfig  from './models/CaServerConfig';



@Options({
  components: {
    HelloWorld,
  },
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
