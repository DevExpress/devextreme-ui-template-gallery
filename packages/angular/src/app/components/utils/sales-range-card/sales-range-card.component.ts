import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CardAnalyticsComponent } from '../../library/card-analytics/card-analytics.component';
import { DxRangeSelectorModule } from 'devextreme-angular/ui/range-selector';
import { Sale } from 'src/app/types/analytics';
import { ChartVisualRange } from 'src/app/types/chart-visual-range';
import { DxLoadIndicatorModule } from 'devextreme-angular';

@Component({
  selector: 'sales-range-card',
  templateUrl: './sales-range-card.component.html',
  styleUrls: ['./sales-range-card.component.scss'],
  imports: [
    CardAnalyticsComponent,
    DxRangeSelectorModule,
    DxLoadIndicatorModule
  ],
})
export class SalesRangeCardComponent {
  @Input() data!: Sale[] | null;

  @Input() visualRange: ChartVisualRange = {};

  @Output() visualRangeChange = new EventEmitter<ChartVisualRange>();

  @Output() salesRangeChanged = new EventEmitter<unknown>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRangeChanged(event: any) {
    this.salesRangeChanged.emit(event);
    this.visualRangeChange.emit(this.visualRange);
  }
}

