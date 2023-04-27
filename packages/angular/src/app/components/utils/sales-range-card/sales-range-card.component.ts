import {
  Component,
  NgModule,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CardAnalyticsModule } from '../../library/card-analytics/card-analytics.component';
import { DxRangeSelectorModule } from 'devextreme-angular/ui/range-selector';
import { Sale } from 'src/app/types/analytics';

@Component({
  selector: 'sales-range-card',
  templateUrl: './sales-range-card.component.html',
  styleUrls: ['./sales-range-card.component.scss'],
})
export class SalesRangeCardComponent {
  @Input() data: Sale[];

  @Input() visualRange: unknown = {};

  @Output() visualRangeChange = new EventEmitter<unknown>();

  @Output() salesRangeChanged = new EventEmitter();

  onRangeChanged(event) {
    this.salesRangeChanged.emit(event);
    this.visualRangeChange.emit(this.visualRange);
  }
}

@NgModule({
  imports: [
    CardAnalyticsModule,
    DxRangeSelectorModule,
  ],
  declarations: [SalesRangeCardComponent],
  exports: [SalesRangeCardComponent],
})
export class SalesRangeCardModule { }
