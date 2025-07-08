import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CardAnalyticsComponent } from '../../library/card-analytics/card-analytics.component';
import { DxRangeSelectorModule } from 'devextreme-angular/ui/range-selector';
import { Sale } from 'src/app/types/analytics';

@Component({
    selector: 'sales-range-card',
    templateUrl: './sales-range-card.component.html',
    styleUrls: ['./sales-range-card.component.scss'],
    imports: [
      CardAnalyticsComponent,
      DxRangeSelectorModule,
    ],
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

