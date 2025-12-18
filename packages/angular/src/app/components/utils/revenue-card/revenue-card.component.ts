import { Component, Input } from '@angular/core';
import { CardAnalyticsComponent } from '../../library/card-analytics/card-analytics.component';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { Sales } from 'src/app/types/analytics';
import { ChartsColor, registerGradient } from 'devextreme/common/charts';

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

  seriesColor: ChartsColor = {
    base: '#115EA3',
    fillId: registerGradient('linear', {
      rotationAngle: 90,
      colors: [{
        offset: '20%',
        color: '#1F74BD',
      }, {
        offset: '90%',
        color: '#93BCE1',
      }],
    }),
  };
}

