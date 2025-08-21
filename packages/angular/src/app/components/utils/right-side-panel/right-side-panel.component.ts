import {
  Component,
  Output,
  Input,
  EventEmitter, HostBinding, inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonComponent } from 'devextreme-angular';
import {DataService, ScreenService} from 'src/app/services';

@Component({
    selector: 'right-side-panel',
    templateUrl: './right-side-panel.component.html',
    styleUrls: ['./right-side-panel.component.scss'],
    providers: [DataService],
    imports: [
      DxButtonComponent,
      CommonModule,
    ],
})
export class RightSidePanelComponent {
  @Input() isOpened = false;

  @Input() showOpenButton = true;

  @Input() title = '';

  @Output() openedChange = new EventEmitter<boolean>();

  @HostBinding('class.overlapping') get overlapping() { return !this.isLarge; };

  @HostBinding('class.closed-state-hidden') get closedStateHidden() { return !this.showOpenButton; };

  @HostBinding('class.open') get open() { return this.isOpened; };

  private screen = inject(ScreenService);

  isLarge = this.screen.sizes['screen-large'];

  constructor() {
    this.screen.screenChanged.subscribe(({isLarge, isXLarge}) => {
      this.isLarge = isLarge || isXLarge;
    });
  }

  toggleOpen = () => {
    this.isOpened = !this.isOpened;
    this.openedChange.emit(this.isOpened);
  };
}
