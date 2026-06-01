import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { DxSpeedDialActionModule } from 'devextreme-angular';
import { Subscription } from 'rxjs';

import { ScreenService } from 'src/app/services';

@Component({
  selector: 'chat-floating-button',
  templateUrl: './chat-floating-button.component.html',
  styles: [':host { display: contents; }'],
  imports: [DxSpeedDialActionModule],
})
export class ChatFloatingButtonComponent implements OnDestroy {
  @Output() buttonClick = new EventEmitter<void>();

  private screen = inject(ScreenService);

  private screenSubscription: Subscription = this.screen.screenChanged.subscribe(({
    isLarge,
    isXLarge,
  }) => {
    this.isLarge = isLarge || isXLarge;
  });

  isLarge = this.screen.sizes['screen-large'];

  ngOnDestroy(): void {
    this.screenSubscription.unsubscribe();
  }
}
