import { createApp } from 'vue';
import { AppInfo, appInfoInjectKey } from '@/types/app-info';
import 'devexpress-gantt/dist/dx-gantt.css';
import { themeService } from '@/theme/theme-service';
import App from './App.vue';
import { router } from './router';

import './styles.scss';

themeService.setAppTheme();

const app = createApp(App);

app.use(router);
app.provide<AppInfo>(appInfoInjectKey, {
  title: 'UI Template Gallery',
});

app.mount('#app');
