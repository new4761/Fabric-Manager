<template>
  <div class="p-m-5">
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
<style scoped></style>
