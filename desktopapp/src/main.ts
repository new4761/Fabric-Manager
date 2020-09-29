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
import Breadcrumb from 'primevue/breadcrumb';
import Toast from 'primevue/toast';

Vue.component('Toast',Toast);
Vue.component('Breadcrumb',Breadcrumb);
Vue.component('Message',Message);
Vue.component('Menubar',Menubar);
Vue.component('Button', Button);
Vue.use(ToastService);

new Vue({
    render: h => h(App)
  }).$mount('#app')