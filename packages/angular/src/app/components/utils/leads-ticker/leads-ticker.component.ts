import {
  Component, NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TickerCardModule } from 'src/app/components/library/ticker-card/ticker-card.component';

@Component({
  selector: 'leads-ticker',
  templateUrl: 'leads-ticker.component.html',
})

export class LeadsTickerComponent {
}

@NgModule({
  imports: [
    CommonModule,
    TickerCardModule,
  ],
  declarations: [LeadsTickerComponent],
  exports: [LeadsTickerComponent],
})
export class LeadsTickerModule { }
