<template>
  <div class="app">
    <div class="p-d-flex">
      <div class="menu p-col-2 p-mr-2 p-as-stretch">

        <Card class="p-mb-5"></Card>
        <div v-for="item in items" :key="item.label" class="p-grid p-jc-center">

           <Button
        :label=item.label
        @click="$router.push(item.to)"
        class="menubutton p-button p-my-2"
      />
        </div>
      </div>
      <div class="page p-col p-mr-2 p-as-stretch">
        <ScrollPanel class="scroll">
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
          label: "Organization",
          icon: "pi pi-fw pi-pencil",
          to: "/org",
        },
        {
          label: "Channel",
          icon: "pi pi-fw pi-pencil",
          to: "/channel",
        },
        {
          label: "ChainCode",
          icon: "pi pi-fw pi-pencil",
          to: "/demo",
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

<style>
.scroll {
  width: 100%;
  height: 90vh;
}
.scroll .p-scrollpanel-wrapper {
  border-right: 15px solid #ffffff00;
}

.custom .p-scrollpanel-bar {
  background-color: #1976d2;
  opacity: 1;
  transition: background-color 0.3s;
}

.scroll .p-scrollpanel-bar:hover {
  background-color: #1783f0;
  transition: background-color 0.3s;
}
.bg {
  height: 90vh;
}
.menu {
  background-color: #969696;
  height: 90vh;
}
.page {
  background-color: #f3f2f2;
  height: 90vh;
}

.menubutton{
  color:#ffffff
}
</style>
