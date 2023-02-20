import { createApp } from 'vue';
import { AppInfo, appInfoInjectKey } from '@/types/app-info';
import { switchTheme } from '@/utils/theme-switch';
import App from './App.vue';
import { router } from './router';
import 'devexpress-gantt/dist/dx-gantt.css';
import './styles.scss';
import './themes/theme';

const app = createApp(App);
app.use(router);
app.provide<AppInfo>(appInfoInjectKey, {
  title: 'UI Template Gallery',
});

switchTheme();

app.mount('#app');
