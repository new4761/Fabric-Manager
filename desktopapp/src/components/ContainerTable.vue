<template>
  <div>
    <!-- <div class="table-header p-grid ">
      Network containers
    </div> -->
    <div class="table-wrapper p-grid p-jc-center">
      <TabView>
        <TabPanel header="container">
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
                  label="Execute"
                  class="p-button-outlined p-button-primary"
                  @click="openInfo(slotProps.data)"
                />
              </template>
            </Column>
          </DataTable>
        </TabPanel>
        <TabPanel header="organization">
          <DataTable
            :value="Object.values(org)"
            class="custom-table"
            :autoLayout="true"
          >
            <Column field="Names" header="Name">
              <template #body="slotProps">
                <div class="p-text-nowrap p-text-truncate">
                  {{ slotProps.data.name }}
                </div>
              </template>
            </Column>

            <Column field="Full name" header="Full name">
              <template #body="slotProps">
                <div class="p-text-nowrap p-text-truncate">
                  {{ slotProps.data.fullname }}
                </div>
              </template>
            </Column>

            <Column field="Type" header="Type">
              <template #body="slotProps">
                <div class="p-d-flex">
                  <span class="p-mx-1" v-if="slotProps.data.orderer">
                    <Tag
                      class="p-mr-2"
                      severity="warning"
                      value="orderer"
                    ></Tag>
                  </span>
                  <span class="p-mx-1" v-if="slotProps.data.ca">
                    <Tag severity="danger" value="ca"></Tag>
                  </span>
                  <span class="p-mx-1" v-if="slotProps.data.peer > 0">
                    <Tag
                      class="p-mr-2"
                      severity="info"
                      value="peer"
                      v-badge="slotProps.data.peer"
                    ></Tag>
                  </span>
                </div>
              </template>
            </Column>
            <Column header="Status"> </Column>
          </DataTable>
        </TabPanel>
      </TabView>
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
    org: Object,
  },
})
export default class ContainerTable extends Vue {}
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
  height: calc(94vh - 390px);
  width: 100%;
}

.custom-table .p-column-title {
  font-size: 17px;
}

.custom-table tr,
th {
  background-color: $SubBgColor !important;
  transition: all 0.3s !important;
}
.custom-table tr {
  font-size: 15px;
}
.custom-table tr:hover {
  color: $primaryColor;
  background-color: $SubBgColorHover !important;
}

.custom-table a {
  color: $primaryColor;
}

.container-info {
  width: 50vh;
}

.custom-table .p-datatable-header {
  background-color: $SubBgColor !important;
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
