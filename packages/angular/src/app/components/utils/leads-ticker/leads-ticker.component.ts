import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TickerCardComponent } from 'src/app/components/library/ticker-card/ticker-card.component';

@Component({
  selector: 'leads-ticker',
  templateUrl: 'leads-ticker.component.html',
  imports: [
    CommonModule,
    TickerCardComponent,
  ],
})
export class LeadsTickerComponent {
}
