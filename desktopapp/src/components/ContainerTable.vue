<template>
  <div>
    <Dialog :visible="display" :closable="false" class="container-info">
      {{ containerData }}
      <div class="p-grid p-mt-5">
        <Button
          class="p-button-danger p-ml-auto p-my-2"
          label="close"
          @click="display = false"
        />
      </div>
    </Dialog>

    <!-- <div class="p-grid p-jc-center  p-my-1">
      <div class="container p-col-12 ">
        {{ container }}
      </div>
    </div> -->

    <div class="table-wrapper p-grid p-jc-center p-my-4">
      <div class="table-header">
        Network containers
        <Button icon="pi pi-refresh" />
      </div>
      <DataTable :value="container" class="custom-table" :autoLayout="true">
        <Column field="Names" header="Name">
          <template #body="slotProps">
            <div class="p-text-nowrap p-text-truncate">
              {{ slotProps.data.Names[0] }}
            </div>
          </template>
        </Column>
        <Column field="Image" header="Image"></Column>

        <Column header="Status" field="Status">
          <template #body="slotProps">
            <a v-if="slotProps.data.State == 'running'">●</a>

            {{ slotProps.data.Status }}
          </template>
        </Column>

        <Column header="Action">
          <template #body="slotProps">
            <Button
              label="Primary"
              class="p-button-outlined"
              @click="openInfo(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {},
  props: {
    container: Array,
  },
})
export default class ContainerTable extends Vue {
  containerData: object = {};
  display: boolean = false;
  openInfo(containerData: Object) {
    this.containerData = containerData;
    this.display = true;
  }

  closeinfo() {
    this.display = false;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* .custom-table .p-datatable-header {
  background-color: rgb(255, 255, 255);
  font-size: 20px;
} */
.table-wrapper {
  padding-left: 1em;
  padding-right: 1em;
}

.table-header {
  border-radius: 5px 5px 0px 0px;
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(49, 155, 255);
  color: white;
  font-size: 20px;
  font-weight: bold;
}

.custom-table.p-datatable {
  background-color: rgb(219, 219, 219);
  border-radius: 5px;
  font-size: 12px;
  overflow: auto;
  height: 350px;
  width: 100%;
}

.custom-table .p-column-title {
  color: rgb(74, 147, 255);
  font-size: 15px;
}
.container-info {
  width: 50vh;
}
/* p-datatable-header
p-datatable-footer
p-column-title
p-sortable-column
p-column-filter
p-datatable-scrollable-header
p-datatable-scrollable-body
p-datatable-scrollable-footer
p-datatable-responsive
p-datatable-emptymessage
p-rowgroup-header
p-rowgroup-footer */
</style>
