import { Component, Input } from '@angular/core';
import { CardAnalyticsComponent } from '../../library/card-analytics/card-analytics.component';
import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { SalesByState } from 'src/app/types/analytics';

@Component({
  selector: 'revenue-snapshot-by-states-card',
  templateUrl: './revenue-snapshot-by-states-card.component.html',
  imports: [
    CardAnalyticsComponent,
    DxPieChartModule,
  ],
})
export class RevenueSnapshotByStatesCardComponent {
  @Input() data: SalesByState;

  customizeSaleText(arg: { percentText: string }) {
    return arg.percentText;
  }
}

