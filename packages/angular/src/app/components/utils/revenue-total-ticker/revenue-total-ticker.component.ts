import {
  Component, NgModule, Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sales } from 'src/app/types/analytics';
import { TickerCardModule } from 'src/app/components/library/ticker-card/ticker-card.component';

@Component({
  selector: 'revenue-total-ticker',
  templateUrl: 'revenue-total-ticker.component.html',
})

export class RevenueTotalTickerComponent {
  @Input() data: Sales = null;
}

@NgModule({
  imports: [
    CommonModule,
    TickerCardModule,
  ],
  declarations: [RevenueTotalTickerComponent],
  exports: [RevenueTotalTickerComponent],
})
export class RevenueTotalTickerModule { }