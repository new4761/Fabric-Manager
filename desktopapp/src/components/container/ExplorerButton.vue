<template>
  <div>
    <div class="p-grid p-jc-end">
      <div class="explorer-wrapper">
        <div class="explorer-header p-grid p-ai-center">
          <div class="explorer-title">
            Hyperledger explorer
          </div>
          <div class="explorer-status">
            <Button
              label="connect"
              class="explorer-button p-button-primary p-button-sm p-mx-3 p-button-outlined"
              @click="explorerUp()"
            />
          </div>
        </div>

        <div class="explorer-content p-grid p-ai-center p-my-1">
          <div class="explorer-text">
            - Network: http://192.168.1.2:8080/
            <br />
            - Username : admin
            <br />
            - Password : adminpw
          </div>
        </div>
        <div class="explorer-footer p-grid p-ai-center"></div>
        <!-- <img src="../assets/explorer.svg" class="icon" /> -->
      </div>


      
    </div>

    <ConsoleDialogue
      :_displaylog="displaylog"
      @update:_displaylog="(val) => (displaylog = val)"
    />

    <!-- 
    <div>
      <img src="../assets/portainer.svg" class="icon" />
    </div> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ConsoleDialogue from "../ConsoleDialogue.vue";

@Component({
  components: { ConsoleDialogue },
})
export default class ExplorerButton extends Vue {
  displaylog: boolean = false;

  explorerUp() {
    this.displaylog = true;
  }
}
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";

.icon {
  will-change: width, transform;
  height: 50px;
  padding: 2px;
  border-radius: 50%;
  fill: #fff;
  background: rgb(255, 255, 255);
  margin-left: 0;
  width: 50px;
  transform: scale(1);
  margin-left: 8.333333333333334px;
}

.explorer-button {
  font-size: 15px !important;
  padding: 0px !important;
}
.explorer-header {
  font-size: 15px;
}
.explorer-content {
  font-size: 15px;
  font-weight: lighter;
}
</style>
