import {
  Component, NgModule, Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesOrOpportunitiesByCategory } from 'src/app/types/analytics';
import { TickerCardComponent } from 'src/app/components/library/ticker-card/ticker-card.component';

@Component({
    selector: 'opportunities-ticker',
    templateUrl: 'opportunities-ticker.component.html',
    standalone: false
})

export class OpportunitiesTickerComponent {
  @Input() data: SalesOrOpportunitiesByCategory = null;
}

@NgModule({
  imports: [
    CommonModule,
    TickerCardComponent,
  ],
  declarations: [OpportunitiesTickerComponent],
  exports: [OpportunitiesTickerComponent],
})
export class OpportunitiesTickerModule { }
