import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesOrOpportunitiesByCategory } from 'src/app/types/analytics';
import { TickerCardComponent } from 'src/app/components/library/ticker-card/ticker-card.component';

@Component({
    selector: 'opportunities-ticker',
    templateUrl: 'opportunities-ticker.component.html',
    imports: [
      CommonModule,
      TickerCardComponent,
    ]
})

export class OpportunitiesTickerComponent {
  @Input() data: SalesOrOpportunitiesByCategory = null;
}
