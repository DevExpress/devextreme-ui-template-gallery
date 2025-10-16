import { Component, Input } from '@angular/core';
import { CardAnalyticsComponent } from '../../library/card-analytics/card-analytics.component';
import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxoValueAxisModule } from 'devextreme-angular/ui/nested';
import { SalesOrOpportunitiesByCategory } from 'src/app/types/analytics';

@Component({
  selector: 'sales-by-range-card',
  templateUrl: './sales-by-range-card.component.html',
  styleUrls: ['./sales-by-range-card.component.scss'],
  imports: [
    CardAnalyticsComponent,
    DxPieChartModule,
    DxChartModule,
    DxoValueAxisModule,
  ],
})
export class SalesByRangeCardComponent {
  @Input() data: SalesOrOpportunitiesByCategory;

  customizeSaleText(arg: { percentText: string }) {
    return arg.percentText;
  }
}

