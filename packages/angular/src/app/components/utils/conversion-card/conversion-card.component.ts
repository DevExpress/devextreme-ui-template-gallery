import {
  Component, NgModule, Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardAnalyticsComponent } from 'src/app/components/library/card-analytics/card-analytics.component';
import { DxFunnelModule } from 'devextreme-angular/ui/funnel';
import { SalesOrOpportunitiesByCategory } from 'src/app/types/analytics';

@Component({
    selector: 'conversion-card',
    templateUrl: 'conversion-card.component.html',
    standalone: false
})
export class ConversionCardComponent {
  @Input() data: SalesOrOpportunitiesByCategory;

  customizeOppText(arg: { valueText: string }) {
    return `$${arg.valueText}`;
  }
}

@NgModule({
  imports: [
    CommonModule,
    CardAnalyticsComponent,
    DxFunnelModule,
  ],
  declarations: [ConversionCardComponent],
  exports: [ConversionCardComponent],
})
export class ConversionCardModule { }
