import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sales } from 'src/app/types/analytics';
import { TickerCardComponent } from 'src/app/components/library/ticker-card/ticker-card.component';

@Component({
    selector: 'revenue-total-ticker',
    templateUrl: 'revenue-total-ticker.component.html',
    imports: [
      CommonModule,
      TickerCardComponent,
    ],
})

export class RevenueTotalTickerComponent {
  @Input() data: Sales = null;
}

