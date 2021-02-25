<template>
  <div>
    <div @click="toggle()" class="p-grid p-jc-end p-p-3">
      <i class="fas fa-angle-double-down"></i>
    </div>

    <transition name="smooth">
      <div v-show="showSection">
        <div v-for="(item, index) in object" :key="index">
          <div class="org-item p-m-0 p-grid p-ai-center vertical-container">
            <div class="p-col-4 p-mx-3" >{{ item }}</div>
            <div class="p-col-4 p-ml-auto">
              <Button
                icon="fas fa-code"
                class="p-button-sm p-button-secondary p-mx-1"
                @click="func(item)"
              />
              <Button
                icon="fas fa-info"
                class="p-button-sm p-button-secondary p-mx-1"
                @click="func()"
              />
              <Button
                icon="fas fa-wrench"
                class="p-button-sm p-button-secondary p-mx-1"
                @click="func()"
              />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
const { exec } = require('child_process');

@Component({
  props: {
    object: Array,
  },
})
export default class OrgDetail extends Vue {
  showSection: boolean = false;

  toggle() {
    this.showSection = !this.showSection;
  }

  func(container:string){
    exec(' start cmd.exe @cmd /k "docker exec -it ' + container +' /bin/sh"');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
