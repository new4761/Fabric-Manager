<template>
  <div>
    <!-- <Dialog :visible="display" :closable="false" class="container-info">
      {{ containerData }}
      <div class="p-grid">
        <Button
          class="p-button-danger p-ml-auto p-my-2"
          label="close"
          @click="display = false"
        />
      </div>
    </Dialog> -->

    <!-- <div class="p-grid p-jc-center  p-my-1">
      <div class="container p-col-12 ">
        {{ container }}
      </div>
    </div> -->
    <div class="table-header p-grid ">
      Network containers
      <!-- <Button icon="pi pi-refresh" /> -->
    </div>
    <div class="table-wrapper p-grid p-jc-center">
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
})
export default class ContainerTable extends Vue {
  envConfig: any;
  container: Array<Object> = [];
  activeContainer: number = 0;
  statusClass: string = "";

  updated() {
    // this.$store.commit("docker/setActiveContainer");
    this.container = this.$store.state.docker.activeContainer;
    this.activeContainer = this.$store.getters[
      "docker/getActiveContainerCount"
    ];
    if (this.activeContainer == 0) {
      this.statusClass = "offline";
    } else {
      this.statusClass = "online";
    }
  }

  mounted() {
    this.container = this.$store.state.docker.activeContainer;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
/* .custom-table .p-datatable-header {
  background-color: rgb(255, 255, 255);
  font-size: 20px;
} */
@import "@/assets/style/_variables.scss";
.table-wrapper {
  padding: 10px 40px 40px 40px;
  background-color: $SubBgColor;
}

.table-header {
  padding: 40px;
  align-items: center;
  background-color: $SubBgColor;
  color: white;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 9px solid rgb(161, 161, 161);
}

.custom-table.p-datatable {
  background-color: $SubBgColor;
  font-size: 12px;
  overflow: auto;
  height: calc(94vh - 420px);
  width: 100%;
}

.custom-table .p-column-title {
  font-size: 17px;
}

.custom-table tr,
th {
  background-color: $SubBgColor !important;
  transition: all 0.3s!important;
}
.custom-table tr {
  font-size: 15px;
}
.custom-table tr:hover {
  color: $primaryBgColor;
  background-color: $SubBgColorHover !important;
}

.custom-table a{
  color: $primaryBgColor;
}

// .container-info {
//   width: 50vh;
// }

// .custom-table .p-datatable-header{
//   background-color: $SubBgColor !important;
// }

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
