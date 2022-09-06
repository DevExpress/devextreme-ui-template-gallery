import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import 'devextreme/scss/bundles/dx.material.blue.light.compact.scss';
import './dx-styles.scss';

const app = createApp(App);
app.use(router);
app.config.globalProperties.$appInfo = {
  title: 'UI Templates Gallery',
};
app.mount('#app');
