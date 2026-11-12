import { Component, HostBinding, inject, OnDestroy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from "@angular/router";
import { map } from 'rxjs';

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
    const sizes = this.screenSizes();
    const classes = Object.keys(sizes).filter((cl) => sizes[cl]);
    classes.push(this.themeService.currentTheme);
    return classes.join(' ');
  }
  private themeService =  inject(ThemeService);
  private screen = inject(ScreenService);

  private screenSizes = toSignal(
    this.screen.changed.pipe(map(() => this.screen.sizes)),
    { initialValue: this.screen.sizes },
  );

  constructor() {
    this.themeService.setAppTheme();
  }

  ngOnDestroy(): void {
    this.screen.breakpointSubscription.unsubscribe();
  }
}
