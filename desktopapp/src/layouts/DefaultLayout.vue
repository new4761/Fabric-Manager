<template>
  <div>
    <div class="p-d-flex">
      <transition name="layout-sidebar">
        <div class="layout-sidebar-dark  p-d-flex p-flex-column menu">
          <div class="p-d-flex p-jc-center p-mt-3">
            <div class="p-col-12"></div>
          </div>

          <div class="p-d-flex p-jc-center p-mt-3">
            <net-ops-button />
          </div>

          <AppProfile />
          <AppMenu :model="menu" class="scroll-menu" />
        </div>
      </transition>

      <div class="scroll-main layout-main p-col p-as-stretch">
        <div class=" p-d-flex p-jc-center">
          <div class="layout-wrapper">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import NetOpsButton from "../components/NetOpsButton.vue";
import AppProfile from "../components/menu/AppProfile.vue";
import AppMenu from "../components/menu/AppMenu.vue";

@Component({
  components: { NetOpsButton, AppProfile, AppMenu },
})
export default class DefaultLayout extends Vue {
  data() {
    return {
      menu: [
        { label: "Home", icon: "pi pi-fw pi-home", to: "/home" },

        {
          label: "Organization",
          icon: "pi pi-fw pi-sitemap",
          to: "/org",
        },
        {
          label: "Channel",
          icon: "pi pi-fw pi-globe",
          to: "/channel",
        },
        {
          label: "ChainCode",
          icon: "pi pi-fw pi-clone",
          to: "/chaincode",
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
