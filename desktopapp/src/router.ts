import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Project",
      component: () => import("./pages/ProjectsPage.vue"),
      meta: {
        layout: "clean-layout",
      },
    },
    {
      path: "/console",
      name: "SplashConsole",
      component: () => import("./pages/SplashConsolePage.vue"),
      meta: {
        layout: "clean-layout",
      },
      props: true,
    },
    {
      path: "/demo",
      name: "Demo",
      component: () => import("./pages/Demo.vue"),
      meta: {
        layout: "default-layout",
      },
    },
    {
      path: "/channel",
      name: "Channel",
      component: () => import("./pages/ChannelPage.vue"),
      meta: {
        layout: "default-layout",
      },
    },
    {
      path: "/channel/edit",
      name: "ChannelEdit",
      component: () => import("./pages/ChannelEditPage.vue"),
      meta: {
        layout: "default-layout",
      },
      props: true,
    },

    {
      path: "/org",
      name: "Org",
      component: () => import("./pages/OrgPage.vue"),
      meta: {
        layout: "default-layout",
      },
    },

    {
      path: "/chaincode/manager",
      name: "CCManager",
      component: () => import("./pages/ChaincodePage.vue"),
      meta: {
        layout: "default-layout",
      },
    },
    {
      path: "/chaincode/console",
      name: "ConsoleCC",
      component: () => import("./pages/ccPage/CCconsole.vue"),
      meta: {
        layout: "default-layout",
      },
      props: true,
    },
    {
      path: "/exportConnectionProfile",
      name: "ExportConnectionProfile",
      component: () => import("./pages/ExportConnectionProfile.vue"),
      props: true,
      meta: {
        layout: "default-layout",
      },
    },
    {
      path: "/identityManger",
      name: "IdentityManger",
      component: () => import("./pages/IdentityManger.vue"),
      meta: {
        layout: "default-layout",
      },
    },

    {
      path: "/home",
      name: "home",
      component: () => import("./index.vue"),
      meta: {
        layout: "default-layout",
      },
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});
