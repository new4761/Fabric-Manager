import Vue from 'vue'
import App from './App.vue'
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import Button from 'primevue/button';
Vue.component('Button', Button);
new Vue({
    render: h => h(App)
  }).$mount('#app')