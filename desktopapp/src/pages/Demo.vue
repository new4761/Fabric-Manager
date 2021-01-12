<template>
<div class="p-m-5">
<h1> This is an Demo index page V 1.0</h1> 
<h3> Nothing here ATM.</h3> 
<!-- <h5> Minimalist is the best.</h5> 
<small> I'm accidentally merging a branch so everything is gone. help. </small>  -->

<small> Create Network, Create/join channel and explorer. </small> 

<div class = "p-py-5">

<DemoSpecButton></DemoSpecButton>
</div>
 
</div>

</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DemoSpecButton from '../components/DemoSpecButton.vue'
@Component({
  components: {
    DemoSpecButton
  }
})
export default class Demo extends Vue {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
