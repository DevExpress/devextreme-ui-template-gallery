import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CardAnalyticsComponent } from '../../library/card-analytics/card-analytics.component';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxDropDownButtonModule } from 'devextreme-angular/ui/drop-down-button';
import { Sale } from 'src/app/types/analytics';
import { ChartVisualRange } from 'src/app/types/chart-visual-range';
import { DxDropDownButtonTypes } from 'devextreme-angular/ui/drop-down-button';

@Component({
  selector: 'sales-performance-card',
  templateUrl: './sales-performance-card.component.html',
  styleUrls: ['./sales-performance-card.component.scss'],
  imports: [
    CardAnalyticsComponent,
    DxChartModule,
    DxDropDownButtonModule,
  ],
})
export class SalesPerformanceCardComponent {
  @Input() groupByPeriods!: string[];

  @Input() salesByDateAndCategory!: Sale[] | null;

  @Input() visualRange: ChartVisualRange = {};

  @Output() performancePeriodChanged = new EventEmitter<DxDropDownButtonTypes.SelectionChangedEvent>();

  customiseToolip({ seriesName }: { seriesName: string }) {
    return { text: seriesName };
  }

  onDropDownSelectionChange(event: DxDropDownButtonTypes.SelectionChangedEvent) {
    this.performancePeriodChanged.emit(event);
  }
}
