<template>
  <div class="app">
    <Menubar :model="items" class="p-mb-5">
      <template #end>
        <InputText placeholder="Search" type="text" />
      </template>
    </Menubar>

    <div class="p-d-flex" style="height: 600px">
      <div class="p-col-2 p-mr-2 p-as-stretch p-shadow-6">
        <!-- <DemoNetupButton></DemoNetupButton> -->
      </div>
      <div class="p-col p-mr-2 p-as-stretch p-shadow-6">
        <ScrollPanel style="width: 100%; height: 500px" class="custom">
          <router-view />
        </ScrollPanel>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import DemoNetupButton from "./components/DemoNetupButton.vue";
@Component({
  components: { DemoNetupButton },
})
export default class App extends Vue {
  path: any = this.$router.currentRoute.name;
  data() {
    return {
      items: [
        {
          label: "Home",
          icon: "pi pi-fw pi-home",
          to: "/",
        },
        {
          label: "Demo",
          icon: "pi pi-fw pi-pencil",
          to: "/demo",
        },
      ],
    };
  }
}
</script>

<style scoped>
.custom .p-scrollpanel-wrapper {
  border-right: 9px solid #f4f4f4;
}
.custom .p-scrollpanel-bar {
  background-color: #1976d2;
  opacity: 1;
  transition: background-color 0.3s;
}
.custom .p-scrollpanel-bar:hover {
  background-color: #135ba1;
}
</style>
