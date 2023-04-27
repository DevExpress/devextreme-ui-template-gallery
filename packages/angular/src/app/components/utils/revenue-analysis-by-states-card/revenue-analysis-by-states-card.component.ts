import {
  Component,
  NgModule,
  Input,
} from '@angular/core';
import { CardAnalyticsModule } from '../../library/card-analytics/card-analytics.component';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxBulletModule } from 'devextreme-angular/ui/bullet';
import { SalesByStateAndCity } from 'src/app/types/analytics';

@Component({
  selector: 'revenue-analysis-by-states-card',
  templateUrl: './revenue-analysis-by-states-card.component.html',
  styleUrls: ['./revenue-analysis-by-states-card.component.scss'],
})
export class RevenueAnalysisByStatesCardComponent {
  @Input() data: SalesByStateAndCity;
}

@NgModule({
  imports: [
    CardAnalyticsModule,
    DxDataGridModule,
    DxBulletModule,
  ],
  declarations: [RevenueAnalysisByStatesCardComponent],
  exports: [RevenueAnalysisByStatesCardComponent],
})
export class RevenueAnalysisByStatesCardModule { }
