<template>
  <div class="project-wrapper">
    <ConfirmDialog />
    <Dialog :visible="display" :closable="false" :modal="true" class="project-info">
      {{ dataSelected }}
      <div class="p-grid p-mt-5">
        <Button class="p-button-danger p-ml-auto p-my-2" label="close" @click="display = false" />
      </div>
    </Dialog>

    <div class="p-grid p-jc-center">
      <div class="project-table-wrapper p-col">
        <h1>
          Projects
        </h1>
        <DataView :value="data" :layout="layout" :sortOrder="sortOrder" :sortField="sortField" class="project-table">
          <template #header>
            <div class="p-grid p-nogutter">
              <div class="p-col-6" style="text-align: left">
                <Dropdown
                  v-model="sortKey"
                  :options="sortOptions"
                  optionLabel="label"
                  placeholder="Sort"
                  @change="onSortChange($event)"
                />
                <Button
                  :icon="icon"
                  class="p-button-rounded p-button-text p-button-plain p-mx-1"
                  @click="switchSort()"
                />
              </div>
              <div class="p-col-6">
                <div class="p-d-flex  p-ai-center p-jc-end">
                  <CreateNetButton class="p-mx-1" />
                  <!-- <DataViewLayoutOptions v-model="layout" /> -->
                </div>
              </div>
            </div>
          </template>

          <template #list="slotProps">
            <div class="p-col-12 p-my-1">
              <div class="list-item" @click="confirmOpen(slotProps.data.id)">
                <div class="list-detail p-grid p-ai-center vertical-container">
                  <div class="p-col-6">
                    <div class="list-detail-name p-d-flex  p-ai-center p-jc-between p-my-1">
                      {{ slotProps.data.name }}
                    </div>

                    <div class="p-d-flex  p-ai-center p-jc-between  p-my-1">
                      <div class="list-detail-directory p-text-nowrap p-text-truncate">
                        {{ slotProps.data.directory }}
                      </div>
                    </div>
                  </div>

                  <div class="p-col-5">
                    <div class="p-d-flex  p-ai-center  p-jc-end  p-my-1">
                      <div class="list-detail-date">
                        create date:
                        <Chip class="p-mx-1">
                          {{ convertDate(slotProps.data.date_create) }}
                        </Chip>
                      </div>
                    </div>
                    <div class="p-d-flex  p-ai-center  p-jc-end p-my-1">
                      <div class="list-detail-date">
                        last updated:
                        <Chip class="p-mx-1">
                          {{ convertTime(slotProps.data.date_modify) }}
                        </Chip>
                      </div>
                    </div>
                  </div>
                  <div class="p-col-1">
                    <div class="p-d-flex  p-ai-center p-my-1  p-jc-center">
                      <div class="list-detail-date">
                        <Button
                          icon="pi pi-trash"
                          class="p-button-sm p-button-danger p-mx-2 p-button-outlined"
                          @click.stop="confirmDelete(slotProps.data.id)"
                        />

                        <!-- <Button
                      icon="fas fa-info"
                      class="p-button-sm p-button-info p-button-outlined"
                      @click.stop="openInfo(slotProps.data.id)"
                    /> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import data from "../../tests/projects.json";
import ProjectConfig from "../models/ProjectConfig";
import CreateNetButton from "../components/project/CreateNetButton.vue";
import TimeConverter from "@/module/Util/TimeConverter";

@Component({
  components: { CreateNetButton },
})
export default class ProjectPage extends Vue {
  display: boolean = false;
  data: any = null;
  dataSelected: any = null;
  layout: string = "list";
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
    let target = this.data.find((element: any) => element.id == id);
    this.$confirm.require({
      message: "open project " + target.name + " ?",
      header: "Confirmation",
      icon: "pi pi-info-circle",
      accept: () => {
        this.$store.commit("project/setId", id);
        this.$router.push("/home");
      },
      reject: () => {},
    });
  }

  confirmDelete(id: number) {
    let target = this.data.find((element: any) => element.id == id);
    this.$confirm.require({
      message: "delete project " + target.name + " ?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      acceptClass: "p-button-danger",
      accept: () => {
        ProjectConfig.deleteProject(target.id);
      },
      reject: () => {},
    });
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

  convertTime(unix: number) {
    return TimeConverter.convertTime(unix);
  }

  convertDate(unix: number) {
    return TimeConverter.convertDate(unix);
  }
}
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";
.project-wrapper {
  background-color: $bodyBgColorDarker;
  padding: 80px;
}

.project-table .p-dataview-content {
  height: calc(94vh - 302px);
  overflow: auto;
}

.project-table-wrapper {
  max-width: 1000px;
}
.project-card {
  padding: 20px;
  cursor: pointer;
}

.project-card.p-card {
  background-color: $bodyBgColor;
  transition: all 0.2s;
}

.project-card.p-card:hover {
  color: $primaryColor;
  background-color: $SubBgColorHover;
}

.project-card-title {
  font-size: 25px;
}
.project-card-content {
}
.project-card-text {
  font-size: 15px;
}
.project-card-text .p-chip {
  font-size: 15px;
}
.project-card-footer {
}
.project-info {
  width: 70vh;
}

.list-item {
  padding: 0.3rem 0.3rem 0.3rem 2rem;
  cursor: pointer;
}

.list-detail {
  transition: all 0.2s;
}

.list-detail:hover {
  color: $primaryColor;
  background-color: $SubBgColorHover;
}
.list-detail-name {
  color: $primaryColor;
  font-weight: bold;
  font-size: 18px;
}

.list-detail-directory {
  color: $textSecondaryColor;
}

.list-detail-date {
  color: $textSecondaryColor;
}
</style>
