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
    },
    {
      path: "/channel",
      name: "Channel",
      component: () => import("./pages/ChannelPage.vue"),
    },
    {
      path: "/channel/edit",
      name: "ChannelEdit",
      component: () => import("./pages/ChannelEditPage.vue"),
      props: true,
    },

    {
      path: "/org",
      name: "Org",
      component: () => import("./pages/OrgPage.vue"),
    },

    {
      path: "/chaincode",
      name: "Chaincode",
      component: () => import("./pages/ChaincodePage.vue"),
    },

    {
      path: "/home",
      name: "home",
      component: () => import("./index.vue"),
      meta: {
        layout: "default-layout",
      },
    },
    // {
    // 	path: '/orgchart',
    // 	name: 'Orgchart',
    // 	component: () => import('./pages/org-chart/index.vue')
    // },
    // {
    //     path: '/orgform',
    // 	component: () => import('./pages/org-form/index.vue'),
    //     children: [
    //     {
    //         path: '',
    //         component: () => import('./pages/org-form/components/step-1.vue')
    //     },
    //     {
    //         path: '/orgform/step2',
    //         component: () => import('./pages/org-form/components/step-2.vue')
    //     },
    //     {
    //         path: '/orgform/step3',
    //         component: () => import('./pages/org-form/components/step-3.vue')
    //     },
    //     {
    //         path: '/orgform/step4',
    //         component: () => import('./pages/org-form/components/step-4.vue')
    //     }]
    // },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});
