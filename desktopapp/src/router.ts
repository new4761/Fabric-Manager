import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: 'Project',
      component: () => import('./pages/ProjectsPage.vue'),
      meta: {
          layout: "clean-layout"
        },
    },
    {
      path: "/demo",
      name: "Demo",
      component: () => import("./pages/Demo.vue"),
    },
    {
      path: "/channel",
      name: "Channel",
      component: () => import("./pages/ChannelPage.vue"),
    },

    {
      path: "/org",
      name: "Org",
      component: () => import("./pages/OrgPage.vue"),
    },

    {
      path: "/chaincode/manager",
      name: "CCManager",
      component: () => import("./pages/ChaincodePage.vue"),
    },
    {
      path: "/chaincode/console",
      name: "ConsoleCC",
      component: () => import("./pages/ccPage/CCconsole.vue"),
      props: true
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
