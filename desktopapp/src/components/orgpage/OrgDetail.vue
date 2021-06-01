<template>
  <div>
    <div @click="toggle()" class="org-sub p-d-flex p-jc-center">
      <div>container <i class="fas fa-angle-double-down"></i></div>
    </div>

    <transition name="smooth">
      <div v-show="showSection">
        <div v-for="(item, index) in object" :key="index">
          <div class="org-item p-m-0 p-d-flex p-ai-center vertical-container">
            <div class="p-col-4 p-mx-3">{{ item }}</div>
            <div class="p-col-4 p-ml-auto">
              <Button
                icon="fas fa-code"
                class="p-button-sm p-button-secondary p-mx-1"
                @click="func(item)"
              />
              <Button
                icon="fas fa-certificate"
                class="p-button-sm p-button-secondary p-mx-1"
                @click="func()"
              />
              <Button
                icon="fas fa-info"
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
const { exec } = require("child_process");

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

  func(container: string) {
    exec(' start cmd.exe @cmd /k "docker exec -it ' + container + ' /bin/sh"');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/assets/style/_variables.scss";

.org-sub {
  background-color: rgb(110, 110, 110);
  padding: 10px;
  color: rgb(255, 255, 255);
  overflow: hidden;
  transition: all 0.5s;
  cursor: pointer;
}

.org-sub:hover {
  color: #6bc1ff;
}

.org-item {
  background-color: rgb(192, 192, 192);
  color: rgb(0, 0, 0);
  overflow: hidden;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: all 0.5s;
}

.org-item:hover {
  color: #0076ca;
}

.smooth-enter,
.smooth-leave-to {
  overflow: hidden;
  max-height: 0;
}

.smooth-enter-to,
.smooth-leave {
  overflow: hidden;
  max-height: 1000px;
}

.smooth-leave-active {
  overflow: hidden;
  transition: max-height 0.3s;
}

.smooth-enter-active {
  overflow: hidden;
  transition: max-height 1s;
}
</style>
