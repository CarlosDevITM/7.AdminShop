import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
//TanStack query
import { VueQueryPlugin } from '@tanstack/vue-query';

import App from './App.vue';
import router from './router';
//Styles.
import './assets/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
//TanStack query
app.use(VueQueryPlugin);

app.mount('#app');
