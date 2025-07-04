import {
  Component, NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TickerCardComponent } from 'src/app/components/library/ticker-card/ticker-card.component';

@Component({
    selector: 'conversion-ticker',
    templateUrl: 'conversion-ticker.component.html',
    standalone: false
})

export class ConversionTickerComponent {
}

@NgModule({
  imports: [
    CommonModule,
    TickerCardComponent,
  ],
  declarations: [ConversionTickerComponent],
  exports: [ConversionTickerComponent],
})
export class ConversionTickerModule { }
