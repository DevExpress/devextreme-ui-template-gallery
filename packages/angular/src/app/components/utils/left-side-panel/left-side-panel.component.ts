import {Component, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule } from 'devextreme-angular';
import { ScreenService } from 'src/app/services';
import { DxScrollViewModule } from "devextreme-angular/ui/scroll-view";

@Component({
  selector: 'left-side-panel',
  templateUrl: './left-side-panel.component.html',
  styleUrls: ['./left-side-panel.component.scss'],
  imports: [
    DxButtonModule,
    DxScrollViewModule,
    CommonModule,
  ],
})
export class LeftSidePanelComponent {
  private screen = inject(ScreenService);
  isSmallScreen = signal(false);
  isOpened = signal(!(this.screen.sizes['screen-x-small'] || this.screen.sizes['screen-small']));

  constructor() {
    this.screen.smallScreenChanged.subscribe((isSmall) => {
      this.isSmallScreen.set(isSmall);

      if (!isSmall) {
        this.isOpened.set(true);
      }
    });
  }

  toggleOpen = () => {
    this.isOpened.update((value) => !value);
  };
}

