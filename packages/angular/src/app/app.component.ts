import {Component, HostBinding, inject, OnDestroy,} from '@angular/core';
import { AppInfoService, AuthService, ScreenService, ThemeService } from './services';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnDestroy {
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter((cl) => this.screen.sizes[cl]).join(' ');
  }
  private authService = inject(AuthService);
  private themeService =  inject(ThemeService);
  private screen = inject(ScreenService);
  public appInfo = inject(AppInfoService);

  constructor() {
    this.themeService.setAppTheme();
  }

  isAuthenticated() {
    return this.authService.loggedIn;
  }

  ngOnDestroy(): void {
    this.screen.breakpointSubscription.unsubscribe();
  }
}
