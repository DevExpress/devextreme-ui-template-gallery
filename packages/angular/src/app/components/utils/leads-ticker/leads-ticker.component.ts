import {
  Component, NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TickerCardComponent } from 'src/app/components/library/ticker-card/ticker-card.component';

@Component({
    selector: 'leads-ticker',
    templateUrl: 'leads-ticker.component.html',
    standalone: false
})

export class LeadsTickerComponent {
}

@NgModule({
  imports: [
    CommonModule,
    TickerCardComponent,
  ],
  declarations: [LeadsTickerComponent],
  exports: [LeadsTickerComponent],
})
export class LeadsTickerModule { }
