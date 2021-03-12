<template>
  <div>
    <!-- <div class="table-header p-grid ">
      Network containers
    </div> -->
    <div class="table-wrapper p-grid p-jc-center">
      <TabView>
        <TabPanel header="container">
          <DataTable
            :value="container"
            class="container-table"
            :autoLayout="true"
          >
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
                  label="exec"
                  icon="fas fa-terminal"
                  class="p-button-outlined p-button-primary p-button-sm"
                  @click="func(slotProps.data.Names[0])"
                />
              </template>
            </Column>
          </DataTable>
        </TabPanel>
        <TabPanel header="organization">
          <div class="org-table-wrapper">
            <div class="p-datatable p-component">
              <table role="grid" class="p-my-1">
                <thead class="p-datatable-thead">
                  <tr>
                    <th>
                      <span class="p-column-title">Name</span>
                    </th>
                    <th>
                      <span class="p-column-title">Fullname</span>
                    </th>
                    <th>
                      <span class="p-column-title">Role</span>
                    </th>
                    <th>
                      <span class="p-column-title">Status</span>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>

            <div
              class="org-table p-datatable p-component"
              v-for="(item, index) in Object.values(org)"
              :key="index"
            >
              <OrgColumn v-bind:item="item" />
            </div>
          </div>
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>

<script lang="ts">
import { exec } from "child_process";
import Vue from "vue";
import Component from "vue-class-component";
import OrgColumn from "../container/OrgColumn.vue";

@Component({
  components: { OrgColumn },
  props: {
    container: Array,
    org: Object,
  },
})
export default class ContainerTable extends Vue {
  showSection: boolean = false;
  toggle() {
    this.showSection = !this.showSection;
  }

  func(container: string) {
    exec(' start cmd.exe @cmd /k "docker exec -it ' + container + ' /bin/sh"');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
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

.container-table.p-datatable {
  background-color: $SubBgColor;
  font-size: 12px;
  overflow: auto;
  height: calc(94vh - 400px);
  width: 100%;
}

.container-table .p-column-title {
  font-size: 17px;
}

.container-table tr,
th {
  background-color: $SubBgColor !important;
  transition: all 0.3s !important;
}
.container-table tr {
  font-size: 15px;
}
.container-table tr:hover {
  color: $primaryColor;
  background-color: $SubBgColorHover !important;
}

.container-table a {
  color: $primaryColor;
}

.container-info {
  width: 50vh;
}

.container-table .p-datatable-header {
  background-color: $SubBgColor !important;
}

.org-table-wrapper {
  height: calc(94vh - 400px);
  overflow: scroll;
  width: 100%;
}

.org-table tr,
th {
  background-color: $SubBgColor !important;
  transition: all 0.3s !important;
}
.org-table tr {
  font-size: 15px;
}
.org-table tr:hover {
  color: $primaryColor;
  background-color: $SubBgColorHover !important;
}

.org-table a {
  color: $primaryColor;
}

.org-table .p-datatable-header {
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
