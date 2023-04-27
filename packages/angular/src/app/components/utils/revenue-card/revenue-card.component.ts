import {
  Component,
  NgModule,
  Input,
} from '@angular/core';
import { CardAnalyticsModule } from '../../library/card-analytics/card-analytics.component';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { Sales } from 'src/app/types/analytics';

@Component({
  selector: 'revenue-card',
  templateUrl: './revenue-card.component.html',
})
export class RevenueCardComponent {
  @Input() data: Sales;
}

@NgModule({
  imports: [
    CardAnalyticsModule,
    DxChartModule,
  ],
  declarations: [RevenueCardComponent],
  exports: [RevenueCardComponent],
})
export class RevenueCardModule { }
