<template>
<div class="p-m-5">

<div class = "p-py-5">
   <Button label="goto demo page" @click="$router.push('demo')" />
   <!-- <Button label="test json" @click="test()" /> -->
</div>
 
</div>

</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DemoSpecButton from './components/DemoSpecButton.vue'
@Component({
  components: {
    DemoSpecButton
  }
})
export default class Index extends Vue {
  // test(){
  //   FileJsonBuilder.addProject();
  // }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
