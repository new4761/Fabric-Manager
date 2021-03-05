<template>
  <div>
    <Toast position="top-right" />
    <Dialog
      v-bind:visible="_displaylog"
      :closable="false"
      modal
      :style="{ width: '80vw' }"
      :contentStyle="{ overflow: 'visible' }"
    >
      <Terminal @toast="showSuccess" />
      <Button class="p-button-danger p-m-2" label="close" @click="close()" />
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
@Component({
  components: { Terminal },
})
export default class ExplorerButton extends DialogueProps {
  close() {
    this.$emit("update:_displaylog", false);
  }

  showSuccess() {
    this.$toast.add({
      severity: "success",
      summary: "Success",
      detail: "operation complete ",
      life: 3000,
    });
  }
}
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";
</style>
