import {
  Component,
  NgModule,
  Input,
} from '@angular/core';
import { CardAnalyticsComponent } from '../../library/card-analytics/card-analytics.component';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxBulletModule } from 'devextreme-angular/ui/bullet';
import { SalesByState } from 'src/app/types/analytics';

@Component({
    selector: 'revenue-analysis-card',
    templateUrl: './revenue-analysis-card.component.html',
    styleUrls: ['./revenue-analysis-card.component.scss'],
    standalone: false
})
export class RevenueAnalysisCardComponent {
  @Input() data: SalesByState;
}

@NgModule({
  imports: [
    CardAnalyticsComponent,
    DxDataGridModule,
    DxBulletModule,
  ],
  declarations: [RevenueAnalysisCardComponent],
  exports: [RevenueAnalysisCardComponent],
})
export class RevenueAnalysisCardModule { }
