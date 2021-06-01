<template>
  <div>
    <Dialog
      v-bind:visible="_displaylog"
      :closable="false"
      modal
      :style="{ width: '80vw' }"
      :contentStyle="{ overflow: 'visible' }"
    >
      <p>{{ this.$store.state.processContext }}</p>

      <Terminal @update:_finish="(val) => (finish = val)" />

      <Button
        class="p-button-danger p-m-2"
        label="close"
        @click="close()"
        v-if="this.$store.state.processStatus"
      />
    </Dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Terminal from "./Terminal.vue";
const DialogueProps = Vue.extend({
  props: {
    _displaylog: Boolean,
  },
});
/* eslint-disable no-unused-vars */
@Component({
  components: { Terminal },
})
export default class ExplorerButton extends DialogueProps {
  finish: boolean = false;
  // @ts-ignore
  unwatch: Function;
  created() {
    this.unwatch = this.$store.watch(
      (state) => {
        return this.$store.state.processStatus; // could also put a Getter here
      },
      (newValue, oldValue) => {
        //something changed do something
        console.log(this.$store.state.processStatus);
      },
      //Optional Deep if you need it
      {
        deep: true,
      }
    );
  }
  beforeDestroy() {
    this.unwatch();
  }
  showClose() {}
  close() {
    this.$store.commit("setProcessStatus", false);
    this.$emit("update:_displaylog", false);
  }
}
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";
</style>
