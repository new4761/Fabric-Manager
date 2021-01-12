import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	routes: [
        {
			path: '/',
			name: 'home',
			component: () => import('./index.vue')
        },
		// {
		// 	path: '/testing',
		// 	name: 'Testing',
		// 	component: () => import('./components/Testing.vue')
        // },
        // {
		// 	path: '/caform',
		// 	name: 'CaForm',
		// 	component: () => import('./components/CaForm.vue')
        // },
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
		return {x: 0, y: 0};
	}
});
