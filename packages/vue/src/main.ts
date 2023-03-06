import { createApp } from 'vue';
import { AppInfo, appInfoInjectKey } from '@/types/app-info';
import 'devexpress-gantt/dist/dx-gantt.css';
import { setAppTheme } from '@/theme/theme';
import App from './App.vue';
import { router } from './router';

import './styles.scss';

setAppTheme();
const app = createApp(App);
app.use(router);
app.provide<AppInfo>(appInfoInjectKey, {
  title: 'UI Template Gallery',
});

app.mount('#app');
