<template>
  <div>
    <div class="title-bar">
      <div class="title">
        Current Path : {{ $route.name }} Project ID:
        {{ this.$store.state.project.id }}
      </div>

      <div class="title-btn">
        <div class="minimize" @click="minimizeWindow()"></div>
        <div class="maximize" @click="maximizeWindow()"></div>
        <div class="close" @click="closeWindow()"></div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <component :is="layout">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </component>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import DemoNetupButton from "./components/DemoNetupButton.vue";
import AppProfile from "./components/menu/AppProfile.vue";
import AppMenu from "./components/menu/AppMenu.vue";
const remote = require("electron").remote;

@Component({
  components: { DemoNetupButton, AppProfile, AppMenu },
})
export default class App extends Vue {
  // path: any = this.$router.currentRoute.name;

   mounted () {
     if(this.$store.state.project.id == null){
       this.$router.push('project')
     }
   }
  
  get layout() {
    return this.$route.meta.layout || "default-layout";
  }

  maximizeWindow() {
    const window = remote.getCurrentWindow();
    if (!window.isMaximized()) {
      window.maximize();
    } else {
      window.unmaximize();
    }
  }
  
  minimizeWindow() {
    const window = remote.getCurrentWindow();
    window.minimize();
  }

  closeWindow() {
    const window = remote.getCurrentWindow();
    window.close();
  }

  data() {
    return {
      menu: [
        { label: "Home", icon: "pi pi-fw pi-home", to: "/" },
        { label: "Demo", icon: "pi pi-fw pi-pencil", to: "/demo" },
        {
          label: "Organization",
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
          label: "Channel",
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
          label: "ChainCode",
          icon: "pi pi-fw pi-clone",
          to:"/chaincode"
        //  items: [
            //{ label: "Crud", icon: "pi pi-fw pi-user-edit", to: "/crud" },
            //{
              //label: "Calendar",
              //icon: "pi pi-fw pi-calendar-plus",
              //to: "/calendar",
            //},
            //{
              //label: "Empty Page",
              //icon: "pi pi-fw pi-circle-off",
              //to: "/empty",
       //     },
          //]
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

<style></style>
