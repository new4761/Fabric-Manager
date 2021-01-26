<template>
  <div class="layout-overlay-sidebar-active">
    <div class="p-d-flex">
      <!-- <div class="menu p-col-2 p-mr-2 p-as-stretch">

        <Card class="p-mb-5"></Card>
        <div v-for="item in items" :key="item.label" class="p-grid p-jc-center">

           <Button
        :label=item.label
        @click="$router.push(item.to)"
        class="menubutton p-button p-my-2"
      />
        </div>
      </div> -->

      <transition name="layout-sidebar">
        <div class="layout-sidebar-dark">
          <div class="layout-logo">
            <router-link to="/">
              <img alt="Logo" />
            </router-link>
          </div>

          <AppProfile />
          <AppMenu :model="menu"/>
        </div>
      </transition>

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
import AppProfile from "./components/AppProfile.vue";
import AppMenu from "./components/AppMenu.vue";

@Component({
  components: { DemoNetupButton, AppProfile, AppMenu },
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
      menu: [
        { label: "Dashboard", icon: "pi pi-fw pi-home", to: "/" },
        {
          label: "UI Kit",
          icon: "pi pi-fw pi-sitemap",
          items: [
            {
              label: "Form Layout",
              icon: "pi pi-fw pi-id-card",
              to: "/formlayout",
            },
            { label: "Input", icon: "pi pi-fw pi-check-square", to: "/input" },
            {
              label: "Float Label",
              icon: "pi pi-fw pi-bookmark",
              to: "/floatlabel",
            },
            { label: "Button", icon: "pi pi-fw pi-mobile", to: "/button" },
            { label: "Table", icon: "pi pi-fw pi-table", to: "/table" },
            { label: "List", icon: "pi pi-fw pi-list", to: "/list" },
            { label: "Tree", icon: "pi pi-fw pi-share-alt", to: "/tree" },
            { label: "Panel", icon: "pi pi-fw pi-tablet", to: "/panel" },
            { label: "Overlay", icon: "pi pi-fw pi-clone", to: "/overlay" },
            { label: "Menu", icon: "pi pi-fw pi-bars", to: "/menu" },
            { label: "Message", icon: "pi pi-fw pi-comment", to: "/messages" },
            { label: "File", icon: "pi pi-fw pi-file", to: "/file" },
            { label: "Chart", icon: "pi pi-fw pi-chart-bar", to: "/chart" },
            { label: "Misc", icon: "pi pi-fw pi-circle-off", to: "/misc" },
          ],
        },
        {
          label: "Utilities",
          icon: "pi pi-fw pi-globe",
          items: [
            { label: "Display", icon: "pi pi-fw pi-desktop", to: "/display" },
            {
              label: "Elevation",
              icon: "pi pi-fw pi-external-link",
              to: "/elevation",
            },
            {
              label: "Flexbox",
              icon: "pi pi-fw pi-directions",
              to: "/flexbox",
            },
            { label: "Icons", icon: "pi pi-fw pi-search", to: "/icons" },
            { label: "Grid System", icon: "pi pi-fw pi-th-large", to: "/grid" },
            {
              label: "Spacing",
              icon: "pi pi-fw pi-arrow-right",
              to: "/spacing",
            },
            {
              label: "Typography",
              icon: "pi pi-fw pi-align-center",
              to: "/typography",
            },
            { label: "Text", icon: "pi pi-fw pi-pencil", to: "/text" },
          ],
        },
        {
          label: "Pages",
          icon: "pi pi-fw pi-clone",
          items: [
            { label: "Crud", icon: "pi pi-fw pi-user-edit", to: "/crud" },
            {
              label: "Calendar",
              icon: "pi pi-fw pi-calendar-plus",
              to: "/calendar",
            },
            {
              label: "Empty Page",
              icon: "pi pi-fw pi-circle-off",
              to: "/empty",
            },
          ],
        },
        {
          label: "Menu Hierarchy",
          icon: "pi pi-fw pi-search",
          items: [
            {
              label: "Submenu 1",
              icon: "pi pi-fw pi-bookmark",
              items: [
                {
                  label: "Submenu 1.1",
                  icon: "pi pi-fw pi-bookmark",
                  items: [
                    { label: "Submenu 1.1.1", icon: "pi pi-fw pi-bookmark" },
                    { label: "Submenu 1.1.2", icon: "pi pi-fw pi-bookmark" },
                    { label: "Submenu 1.1.3", icon: "pi pi-fw pi-bookmark" },
                  ],
                },
                {
                  label: "Submenu 1.2",
                  icon: "pi pi-fw pi-bookmark",
                  items: [
                    { label: "Submenu 1.2.1", icon: "pi pi-fw pi-bookmark" },
                    { label: "Submenu 1.2.2", icon: "pi pi-fw pi-bookmark" },
                  ],
                },
              ],
            },
            {
              label: "Submenu 2",
              icon: "pi pi-fw pi-bookmark",
              items: [
                {
                  label: "Submenu 2.1",
                  icon: "pi pi-fw pi-bookmark",
                  items: [
                    { label: "Submenu 2.1.1", icon: "pi pi-fw pi-bookmark" },
                    { label: "Submenu 2.1.2", icon: "pi pi-fw pi-bookmark" },
                    { label: "Submenu 2.1.3", icon: "pi pi-fw pi-bookmark" },
                  ],
                },
                {
                  label: "Submenu 2.2",
                  icon: "pi pi-fw pi-bookmark",
                  items: [
                    { label: "Submenu 2.2.1", icon: "pi pi-fw pi-bookmark" },
                    { label: "Submenu 2.2.2", icon: "pi pi-fw pi-bookmark" },
                  ],
                },
              ],
            },
          ],
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
  height: 100vh;
}
.menu {
  background-color: #969696;
  height: 100vh;
}
.page {
  background-color: #f3f2f2;
  height: 100vh;
}

.menubutton {
  color: #ffffff;
}
</style>
