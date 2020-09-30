import Vue from 'vue'
import App from './App.vue'
import ToastService from 'primevue/toastservice';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import Message from 'primevue/message';
import ScrollPanel from 'primevue/scrollpanel';
import Toast from 'primevue/toast';
import Sidebar from 'primevue/sidebar';
import Card from 'primevue/card';
import Menu from 'primevue/menu';


Vue.component('Menu',Menu);
Vue.component('Card',Card);
Vue.component('Sidebar',Sidebar);
Vue.component('Toast',Toast);
Vue.component('ScrollPanel',ScrollPanel);
Vue.component('Message',Message);
Vue.component('Menubar',Menubar);
Vue.component('Button', Button);
Vue.use(ToastService);

new Vue({
    render: h => h(App)
  }).$mount('#app')