import { Component, Input } from '@angular/core';
import { CardAnalyticsComponent } from '../../library/card-analytics/card-analytics.component';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { Sales } from 'src/app/types/analytics';

@Component({
    selector: 'revenue-card',
    templateUrl: './revenue-card.component.html',
    imports: [
      CardAnalyticsComponent,
      DxChartModule,
    ],
})
export class RevenueCardComponent {
  @Input() data: Sales;
}

