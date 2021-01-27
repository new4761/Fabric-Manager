<template>
  <div>
    <h1>
      Projects
    </h1>

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
            <DataViewLayoutOptions v-model="layout" />
          </div>
        </div>
      </template>

      <template #list="slotProps">
        <div class="p-col-12">
          <div class="list-item">
            <div class="list-detail">
              <div class="name">{{ slotProps.data.name }}</div>
              <div class="directory">
                {{ slotProps.data.directory }}
              </div>
              <div class="date">
                <Chip>
                  {{ toDate(slotProps.data.date_create) }}
                </Chip>
                <Chip>
                  {{ toDate(slotProps.data.date_modify) }}
                </Chip>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="p-col-2 p-md-4 ">
          <Card class="p-m-3">
            <template #header> </template>
            <template #title>
              {{ slotProps.data.name }}
            </template>
            <template #content> </template>
            <template #footer>
              <Chip>
                {{ toDate(slotProps.data.date_create) }}
              </Chip>
              <Chip>
                {{ toDate(slotProps.data.date_modify) }}
              </Chip>
            </template>
          </Card>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import data from "../../tests/projects.json";

@Component({
  components: {},
})
export default class ProjectPage extends Vue {
  data: any = null;
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
      this.onSortChange({value:this.sortKey})
    }
  }
}
</script>

<style></style>
