import { enableProdMode, provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from "@angular/platform-browser";
import {
  AppInfoService,
  AuthGuardService,
  AuthService,
  ScreenService,
  ThemeService
} from "./app/services";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { provideRouter, withHashLocation } from "@angular/router";

import themes from 'devextreme/ui/themes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { routes } from "./app/app-routes";

if (environment.production) {
  enableProdMode();
}

themes.initialized(() => {
  bootstrapApplication(AppComponent, {
    providers: [
      AuthService,
      ScreenService,
      AppInfoService,
      ThemeService,
      AuthGuardService,
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideHttpClient(withInterceptorsFromDi()),
      provideRouter(routes, withHashLocation()),
    ]
  }).catch(e => console.error(e));

});

