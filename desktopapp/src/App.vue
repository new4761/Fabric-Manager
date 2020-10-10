<template>
  <div class="app">

      <!-- <div class="p-mr-2"><Button label="Submit" @click="goto('/')"/></div>
      <div class="p-mr-2"><Button label="Submit" @click="goto('/testing')"/></div> -->
      <Menubar :model="items" class = "p-mb-5">
        <template #end>
          <InputText placeholder="Search" type="text" />
        </template>
      </Menubar>

    <div class="p-d-flex" style="height: 500px">
      <div class="p-col-2 p-mr-2 p-as-stretch p-shadow-6">bar</div>
      <div class="p-col p-mr-2 p-as-stretch p-shadow-6">
        <ScrollPanel style="width: 100%; height: 400px" class="custom">
          <router-view />
        </ScrollPanel>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {},
})
export default class App extends Vue {
  goto(destination: string) {
    this.$router.push({ path: destination });
  }
  data() {
    return {
      items: [
        {
          label: "Home",
          icon: "pi pi-fw pi-home",
          to: "/",
        },
        {
          label: "Test-sql",
          icon: "pi pi-fw pi-pencil",
          to: "/testing",
        },
        {
          label: "Users",
          icon: "pi pi-fw pi-briefcase",
          to:"/orgchart"
        },
        {
          label: "Events",
          icon: "pi pi-fw pi-calendar",
          to:"/orgform"
        },
        {
          label: "Quit",
          icon: "pi pi-fw pi-power-off",
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
