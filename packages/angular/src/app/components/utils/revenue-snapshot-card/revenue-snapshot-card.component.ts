import { Component, Input } from '@angular/core';
import { CardAnalyticsComponent } from '../../library/card-analytics/card-analytics.component';
import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { SalesOrOpportunitiesByCategory } from 'src/app/types/analytics';

@Component({
  selector: 'revenue-snapshot-card',
  templateUrl: './revenue-snapshot-card.component.html',
  imports: [
    CardAnalyticsComponent,
    DxPieChartModule,
  ],
})
export class RevenueSnapshotCardComponent {
  @Input() data: SalesOrOpportunitiesByCategory;

  customizeSaleText(arg: { percentText: string }) {
    return arg.percentText;
  }
}

