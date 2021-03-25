<template>
  <Dialog
    modal
    :dismissableMask="true"
    :closable="false"
    v-bind:visible="_display"
  >
    <div class="p-d-flex p-jc-center ">
    <div class="p-mt-2 p-mr-2"><h5> Calling Chaincode</h5>	</div>	<ProgressSpinner  r style="width:50px;height:50px" strokeWidth="4"/></div>
  </Dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
const ccCommandLoadingProps = Vue.extend({
  props: {
    _display: Boolean,
  },
});
@Component({
  components: {},
})
export default class ccCommandLoading extends ccCommandLoadingProps {}
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";
</style>
