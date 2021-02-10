<template>
  <div style="background-color: powderblue;">
    <div class="p-grid p-jc-center">
      <div class="el p-col-4 "></div>
      <div class="el p-col-4 "></div>
      <div class="el p-col-4 "></div>
    </div>

    <div class="p-grid p-jc-center">
      <div class="el p-col-12 " style=" height: 100vh;">
        <div class="p-py-5">
          <Button label=" demo " @click="$router.push('demo')" class="p-m-1" />
          <Button
            label=" channel "
            @click="$router.push('channel')"
            class="p-m-1"
          />
          <Button
            label=" project "
            @click="$router.push('project')"
            class="p-m-1"
          />
          <Button label=" org " @click="$router.push('org')" class="p-m-1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import DemoSpecButton from "./components/DemoSpecButton.vue";
@Component({
  components: {
    DemoSpecButton,
  },
})
export default class Index extends Vue {
  // test(){
  //   FileJsonBuilder.addProject();
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el {
  background-color: white;
  height: 100px;
  border-style: solid;
}
</style>
