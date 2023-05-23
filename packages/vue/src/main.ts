import { createApp, watchEffect } from 'vue';
import { AppInfo, appInfoInjectKey } from '@/types/app-info';
import { themeService } from '@/theme/theme-service';
import App from './App.vue';
import { router } from './router';

import 'devexpress-gantt/dist/dx-gantt.css';
import './styles.scss';

const app = createApp(App);

app.use(router);
app.provide<AppInfo>(appInfoInjectKey, {
  title: 'UI Template Gallery',
});

watchEffect(() => {
  if (themeService.isStylesLoaded.value) {
    app.mount('#app');
  }
});
