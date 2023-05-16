import {
  Component,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
} from 'devextreme-angular';
import { ScreenService } from 'src/app/services';
import {DxScrollViewModule} from "devextreme-angular/ui/scroll-view";

@Component({
  selector: 'left-side-panel',
  templateUrl: './left-side-panel.component.html',
  styleUrls: ['./left-side-panel.component.scss'],
})
export class LeftSidePanelComponent {
  isSmallScreen = false;
  isOpened = !(this.screen.sizes['screen-x-small'] || this.screen.sizes['screen-small']);

  constructor(protected screen: ScreenService) {
    screen.smallScreenChanged.subscribe((isSmall) => {
      this.isSmallScreen = isSmall;

      if (!isSmall) {
        this.isOpened = true;
      }
    });
  }

  toggleOpen = () => {
    this.isOpened = !this.isOpened;
  };
}

@NgModule({
  imports: [
    DxButtonModule,
    DxScrollViewModule,
    CommonModule,
  ],
  declarations: [LeftSidePanelComponent],
  exports: [LeftSidePanelComponent],
})
export class LeftSidePanelModule { }
