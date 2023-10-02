import {
  Component,
  NgModule,
  Output,
  Input,
  EventEmitter, HostBinding,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
} from 'devextreme-angular';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import {DataService, ScreenService} from 'src/app/services';

@Component({
  selector: 'right-side-panel',
  templateUrl: './right-side-panel.component.html',
  styleUrls: ['./right-side-panel.component.scss'],
  providers: [DataService],
})
export class RightSidePanelComponent {
  @Input() isOpened = false;

  @Input() showOpenButton = true;

  @Input() title = '';

  @Output() openedChange = new EventEmitter<boolean>();

  @HostBinding('class.overlapping') get overlapping() { return !this.isLarge; };

  @HostBinding('class.closed-state-hidden') get closedStateHidden() { return !this.showOpenButton; };

  @HostBinding('class.open') get open() { return this.isOpened; };

  isLarge = this.screen.sizes['screen-large'];

  constructor(protected screen: ScreenService) {
    screen.screenChanged.subscribe(({isLarge, isXLarge}) => {
      this.isLarge = isLarge || isXLarge;
    });
  }


  toggleOpen = () => {
    this.isOpened = !this.isOpened;
    this.openedChange.emit(this.isOpened);
  };
}

@NgModule({
  imports: [
    DxButtonModule,
    CommonModule,
  ],
  declarations: [RightSidePanelComponent],
  exports: [RightSidePanelComponent],
})
export class RightSidePanelModule { }
