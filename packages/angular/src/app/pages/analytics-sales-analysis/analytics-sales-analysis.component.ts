import { Component, inject, model, OnInit, signal } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';

import { forkJoin } from 'rxjs';

import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxRangeSelectorModule } from 'devextreme-angular/ui/range-selector';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDropDownButtonModule } from 'devextreme-angular/ui/drop-down-button';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel';
import { DxDropDownButtonTypes } from 'devextreme-angular/ui/drop-down-button';

import { DataService } from 'src/app/services';
import { ToolbarAnalyticsComponent } from 'src/app/components/utils/toolbar-analytics/toolbar-analytics.component';
import { SalesByRangeCardComponent } from 'src/app/components/utils/sales-by-range-card/sales-by-range-card.component';
import { SalesPerformanceCardComponent } from 'src/app/components/utils/sales-performance-card/sales-performance-card.component';
import { SalesRangeCardComponent } from 'src/app/components/utils/sales-range-card/sales-range-card.component';
import { analyticsPanelItems } from 'src/app/types/resource';
import { ChartVisualRange, Sale, SalesOrOpportunitiesByCategory } from 'src/app/types/analytics';

@Component({
  templateUrl: './analytics-sales-analysis.component.html',
  styleUrls: ['./analytics-sales-analysis.component.scss'],
  providers: [DataService],
  imports: [
    DxScrollViewModule,
    DxLoadPanelModule,
    DxButtonModule,
    DxToolbarModule,
    DxPieChartModule,
    DxChartModule,
    DxDropDownButtonModule,
    DxRangeSelectorModule,
    ToolbarAnalyticsComponent,
    CommonModule,
    SalesByRangeCardComponent,
    SalesPerformanceCardComponent,
    SalesRangeCardComponent,
  ],
})
export class AnalyticsSalesAnalysisComponent implements OnInit {
  private service = inject(DataService);

  groupByPeriods = ['Day', 'Month'];

  visualRange = model<ChartVisualRange>({});

  isLoading = signal(true);

  sales = signal<Sale[] | null>(null);

  salesByCategory = signal<SalesOrOpportunitiesByCategory | null>(null);

  salesByDateAndCategory = signal<Sale[] | null>(null);

  customRange = analyticsPanelItems[5].value.split('/').map((d) => new Date(d));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRangeChanged = ({ value: dates }: any) => {
    const [startDate, endDate] = dates.map((date: Date) =>
      formatDate(date, 'yyyy-MM-dd', 'en')
    );

    this.isLoading.set(true);

    this.service.getSalesByCategory(startDate, endDate).subscribe((result) => {
      this.salesByCategory.set(result);
      this.isLoading.set(false);
    });
  };

  selectionChange({ item: period }: DxDropDownButtonTypes.SelectionChangedEvent) {
    this.isLoading.set(true);

    this.service.getSalesByOrderDate(period.toLowerCase()).subscribe((result) => {
      this.salesByDateAndCategory.set(result as Sale[]);
      this.isLoading.set(false);
    });
  }

  loadData = (groupBy: string) => {
    const [startDate, endDate] = analyticsPanelItems[4].value.split('/');

    this.isLoading.set(true);

    forkJoin({
      sales: this.service.getSales(startDate, endDate),
      salesByDateAndCategory: this.service.getSalesByOrderDate(groupBy),
    }).subscribe((data) => {
      this.sales.set(data.sales as Sale[]);
      this.salesByDateAndCategory.set(data.salesByDateAndCategory as Sale[]);
      this.isLoading.set(false);
    });
  };

  ngOnInit(): void {
    this.visualRange.set(this.customRange);
    this.onRangeChanged({ value: this.customRange });
    this.loadData(this.groupByPeriods[1].toLowerCase());
  }
}
