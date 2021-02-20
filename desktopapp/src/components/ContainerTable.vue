<template>
  <div>
    <div class="p-grid p-jc-center  p-my-1">
      <div class="container p-col-12 ">
        {{ container }}
      </div>
    </div>

    <DataTable :value="container" class="custom-table">
      <Column field="Names" header="Name"></Column>
      <Column field="Image" header="Image"></Column>
      <Column field="State" header="State"></Column>
      <Column field="Status" header="Status"></Column>
    </DataTable>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

// const TerminalProps = Vue.extend({
//   props: {
//     input: String,
//   },
// });

@Component({
  components: {},
  props: {
    container: Array,
  },
})
export default class ContainerTable extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
