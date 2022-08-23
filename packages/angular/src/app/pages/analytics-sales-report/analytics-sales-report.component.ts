import {
  Component, OnInit, NgModule, OnDestroy,
} from '@angular/core';

import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxRangeSelectorModule } from 'devextreme-angular/ui/range-selector';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDropDownButtonModule } from 'devextreme-angular/ui/drop-down-button';

import { SelectionChangedEvent } from 'devextreme/ui/drop_down_button';

import { CommonModule } from '@angular/common';
import { RwaService } from 'src/app/shared/services';
import { forkJoin, Subscription } from 'rxjs';

import { CardAnalyticsModule } from 'src/app/shared/components/card-analytics/card-analytics.component';

import { analyticsPanelItems } from 'src/app/shared/types/resource';

import { Sales, SalesOrOpportunitiesByCategory } from 'src/app/shared/types/analytics';

@Component({
  templateUrl: './analytics-sales-report.component.html',
  styleUrls: ['./analytics-sales-report.component.scss'],
  providers: [RwaService],
})
export class AnalyticsSalesReportComponent implements OnInit, OnDestroy {
  analyticsPanelItems = analyticsPanelItems;

  sales: Sales;

  salesByCategory: SalesOrOpportunitiesByCategory;

  selectionChange(e: SelectionChangedEvent) {
    const dates = e.item.value.split('/');

    this.loadData(dates[0], dates[1]);
  }

  customizeSaleText(arg: any) {
    return arg.percentText;
  }

  constructor(private service: RwaService) {
  }

  subscriptions: Subscription[] = [];

  loadData = (startDate: string, endDate: string) => {
    const observable = forkJoin({
      sales: this.service.getSales(startDate, endDate),
      salesByCategory: this.service.getSalesByCategory(startDate, endDate),
    });

    this.subscriptions.push(observable.subscribe((data) => {
      Object.keys(data).forEach((key) => this[key] = data[key]);
    }));
  };

  ngOnInit(): void {
    const dates = analyticsPanelItems[4].value.split('/');

    this.loadData(dates[0], dates[1]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}

@NgModule({
  imports: [
    DxButtonModule,
    DxToolbarModule,
    DxPieChartModule,
    DxChartModule,
    DxDropDownButtonModule,
    DxRangeSelectorModule,
    CardAnalyticsModule,

    CommonModule,
  ],
  providers: [],
  exports: [],
  declarations: [AnalyticsSalesReportComponent],
})
export class AnalyticsSalesReportModule { }
