import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
//TanStack query
import { VueQueryPlugin } from '@tanstack/vue-query';

//Vue Toasts for Notifications
import Toast from 'vue-toastification';
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css';

import App from './App.vue';
import router from './router';
//Styles.
import './assets/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
//TanStack query
app.use(VueQueryPlugin);
//Vue Toast
app.use(Toast);

app.mount('#app');
