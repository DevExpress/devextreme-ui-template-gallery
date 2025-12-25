import { Component, HostBinding, inject, OnDestroy } from '@angular/core';
import { RouterModule } from "@angular/router";

import { DxHttpModule } from "devextreme-angular/http";

import { ScreenService, ThemeService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    DxHttpModule,
    RouterModule,
  ]
})
export class AppComponent implements OnDestroy {
  @HostBinding('class') get getClass() {
    const classes = Object.keys(this.screen.sizes).filter((cl) => this.screen.sizes[cl]);
    classes.push(this.themeService.currentTheme);
    return classes.join(' ');
  }
  private themeService =  inject(ThemeService);
  private screen = inject(ScreenService);

  constructor() {
    this.themeService.setAppTheme();
  }

  ngOnDestroy(): void {
    this.screen.breakpointSubscription.unsubscribe();
  }
}
