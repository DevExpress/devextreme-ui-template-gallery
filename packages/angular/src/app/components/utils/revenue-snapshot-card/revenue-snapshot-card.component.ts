import {
  Component,
  NgModule,
  Input,
} from '@angular/core';
import { CardAnalyticsComponent } from '../../library/card-analytics/card-analytics.component';
import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { SalesByStateAndCity } from 'src/app/types/analytics';

@Component({
    selector: 'revenue-snapshot-card',
    templateUrl: './revenue-snapshot-card.component.html',
    standalone: false
})
export class RevenueSnapshotCardComponent {
  @Input() data: SalesByStateAndCity;

  customizeSaleText(arg: { percentText: string }) {
    return arg.percentText;
  }
}

@NgModule({
  imports: [
    CardAnalyticsComponent,
    DxPieChartModule,
  ],
  declarations: [RevenueSnapshotCardComponent],
  exports: [RevenueSnapshotCardComponent],
})
export class RevenueSnapshotCardModule { }
