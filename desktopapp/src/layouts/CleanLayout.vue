<template>
  <div>
    <div class="p-d-flex">
      <div class="scroll-main layout-main p-col p-as-stretch">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {},
})
export default class CleanLayout extends Vue {}
</script>

<style></style>
