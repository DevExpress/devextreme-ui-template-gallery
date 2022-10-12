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

import { CommonModule, formatDate } from '@angular/common';
import { RwaService } from 'src/app/shared/services';
import { forkJoin, Subscription } from 'rxjs';

import { CardAnalyticsModule } from 'src/app/shared/components/card-analytics/card-analytics.component';
import { ToolbarAnalyticsModule } from 'src/app/shared/components/toolbar-analytics/toolbar-analytics.component';

import { analyticsPanelItems } from 'src/app/shared/types/resource';

import { Sales, SalesOrOpportunitiesByCategory } from 'src/app/shared/types/analytics';

@Component({
  templateUrl: './analytics-sales-report.component.html',
  styleUrls: ['./analytics-sales-report.component.scss'],
  providers: [RwaService],
})
export class AnalyticsSalesReportComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  groupByPeriods = ['Day', 'Month'];

  sales: Sales;

  salesByDateAndCategory: Sales;

  visualRange: unknown = {};

  salesByCategory: SalesOrOpportunitiesByCategory;

  constructor(private service: RwaService) { }

  formatDate(dateTime: Date) {
    return formatDate(dateTime, 'YYYY-MM-dd', 'en');
  }
  selectionChange(e: SelectionChangedEvent) {
    var groupByPeriod = e.item.toLowerCase();
    this.subscriptions.push(
      this.service.getSalesByOrderDate(groupByPeriod)
        .subscribe((data) => {
          this.salesByDateAndCategory = data;
        }),
    );
  }

  onRangeChanged = (e) => {
    const [startDate, endDate] = e.value;
    this.subscriptions
      .push(
        this.service.getSalesByCategory(this.formatDate(startDate), this.formatDate(endDate))
          .subscribe((data) => {
            this.salesByCategory = data;
          }),
      );
  };

  customizeSaleText(arg: { percentText: string }) {
    return arg.percentText;
  }

  loadData = (groupBy: string) => {
    const [startDate, endDate] = analyticsPanelItems[4].value.split('/');
    this.subscriptions = [
      ...this.subscriptions,
      (forkJoin(
        [
          this.service.getSales(startDate, endDate),
          this.service.getSalesByOrderDate(groupBy),
          this.service.getSalesByCategory(startDate, endDate),
        ],
      ).subscribe(([sales, salesByDateAndCategory, salesByCategory]) => {
        this.sales = sales;
        this.salesByDateAndCategory = salesByDateAndCategory;
        this.salesByCategory = salesByCategory;
      })
      ),
    ];
  };

  customiseToolip({ seriesName }) {
    return { text: seriesName };
  }

  ngOnInit(): void {
    this.loadData(this.groupByPeriods[1].toLowerCase());
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
    ToolbarAnalyticsModule,

    CommonModule,
  ],
  providers: [],
  exports: [],
  declarations: [AnalyticsSalesReportComponent],
})
export class AnalyticsSalesReportModule { }
