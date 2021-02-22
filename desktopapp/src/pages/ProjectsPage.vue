<template>
  <div>
    <h1>
      Projects
    </h1>
    <ConfirmDialog />
    <Dialog :visible="display" :closable="false" :modal="true" class="info">
      {{ dataSelected }}
      <div class="p-grid p-mt-5">
        <Button
          class="p-button-danger p-ml-auto p-my-2"
          label="close"
          @click="display = false"
        />
      </div>
    </Dialog>

    <DataView
      :value="data"
      :layout="layout"
      :paginator="true"
      :rows="9"
      :sortOrder="sortOrder"
      :sortField="sortField"
    >
      <template #header>
        <div class="p-grid p-nogutter">
          <div class="p-col-6" style="text-align: left">
            <Dropdown
              v-model="sortKey"
              :options="sortOptions"
              optionLabel="label"
              placeholder="Sort By Price"
              @change="onSortChange($event)"
            />
            <Button
              :icon="icon"
              class="p-button-rounded p-button-text p-button-plain p-mx-1"
              @click="switchSort()"
            />
          </div>
          <div class="p-col-6" style="text-align: right">
            <div class="p-d-flex  p-ai-center p-jc-end">
              <CreateNetButton class="p-mx-1" />
              <DataViewLayoutOptions v-model="layout" />
            </div>
          </div>
        </div>
      </template>

      <template #list="slotProps">
        <div class="p-col-12">
          <div class="list-item p-m-3" @click="confirmOpen(slotProps.data.id)">
            <div class="list-detail p-d-flex p-jc-between">
              <div class="name">{{ slotProps.data.name }}</div>
              <div class="date">
                 create date:
                <Chip class="p-m-1">
                 {{ toDate(slotProps.data.date_create) }}
                </Chip>
                last updated:
                <Chip class="p-m-1">
                 {{ toDate(slotProps.data.date_modify) }}
                </Chip>
              </div>
            </div>
            <div class="p-d-flex  p-ai-center p-jc-between">
              <div class="directory">
                {{ slotProps.data.directory }}
              </div>
              <div>
                <Button
                  icon="pi pi-trash"
                  class="p-button-sm p-button-danger p-mx-1"
                  @click.stop="confirmDelete(slotProps.data.id)"
                />

                <Button
                  icon="fas fa-info"
                  class="p-button-sm p-button-info"
                  @click.stop="openInfo(slotProps.data.id)"
                />
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="p-col-2 p-md-4">
          <div class="card-project " @click="confirmOpen(slotProps.data.id)" >
            <Card class="p-m-3" >
              <template #title>
                <div>
                  {{ slotProps.data.name }}
                </div>
              </template>
              <template #content>
                <div>
                  <Chip class="p-m-1">
                    {{ toDate(slotProps.data.date_create) }}
                  </Chip>
                  <Chip class="p-m-1">
                    {{ toDate(slotProps.data.date_modify) }}
                  </Chip>
                </div>
              </template>

              <template #footer>
                <div class="p-d-flex  p-ai-center p-jc-end">
                  <Button
                    icon="pi pi-trash"
                    class="p-button-sm p-button-danger p-mx-1"
                    @click.stop="confirmDelete(slotProps.data.id)"
                  />

                  <Button
                    icon="fas fa-info"
                    class="p-button-sm p-button-info"
                    @click.stop="openInfo(slotProps.data.id)"
                  />
                </div>
              </template>
            </Card>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import data from "../../tests/projects.json";
import ProjectConfig from "../models/ProjectConfig";
import CreateNetButton from "../components/CreateNetButton.vue";

@Component({
  components: { CreateNetButton },
})
export default class ProjectPage extends Vue {
  display: boolean = false;
  data: any = null;
  dataSelected: any = null;
  layout: string = "grid";
  sortKey: any = null;
  sortOrder: any = null;
  sortField: any = null;
  icon: string = "pi pi-filter";
  desc: boolean = false;
  sortOptions: object = [
    { label: "date_create", value: "date_create" },
    { label: "date_modify", value: "date_modify" },
    { label: "Name", value: "name" },
  ];
  mounted() {
    this.init();
  }

  init() {
    this.data = data;
  }

  openInfo(id: number) {
    this.dataSelected = data[id];
    this.display = true;
  }

  closeinfo() {
    this.display = false;
  }

  confirmOpen(id: number) {
    this.$confirm.require({
      message: "go to project id: " + id + " ?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.$store.commit("project/setId", id);
        this.$router.push("/home");
      },
      reject: () => {},
    });
  }

  confirmDelete(id: number) {
    this.$confirm.require({
      message: "delete project " + this.data[id].name + " ?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        ProjectConfig.deleteProject(id);
      },
      reject: () => {},
    });
  }

  toDate(stamp: any) {
    var date = new Date(stamp).toDateString();
    return date;
  }

  onSortChange(event: any) {
    const value = event.value.value;
    const sortValue = event.value;

    if (this.desc) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
      this.sortKey = sortValue;
    } else {
      this.sortOrder = 1;
      this.sortField = value;
      this.sortKey = sortValue;
    }
  }
  switchSort() {
    this.desc = !this.desc;
    if (this.desc) {
      this.icon = "pi pi-sort-amount-down";
    } else {
      this.icon = "pi pi-sort-amount-up";
    }

    if (this.sortKey != null) {
      this.onSortChange({ value: this.sortKey });
    }
  }
}
</script>

<style>
.card-project {
  cursor: pointer;
}
</style>
