<template>
  <div>
    <div class="p-d-flex">
      <div class="scroll-main layout-main">
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
export default class CleanLayout extends Vue {
  mounted() {
    this.$store.commit("docker/setActiveContainer");
  }
}
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";
</style>
