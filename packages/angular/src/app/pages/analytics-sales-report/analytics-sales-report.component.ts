import {
  Component, OnInit, NgModule,
} from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';

import { Observable, forkJoin } from 'rxjs';
import { share } from 'rxjs/operators';

import {DxScrollViewModule} from 'devextreme-angular/ui/scroll-view';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxRangeSelectorModule } from 'devextreme-angular/ui/range-selector';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDropDownButtonModule } from 'devextreme-angular/ui/drop-down-button';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel';
import { SelectionChangedEvent } from 'devextreme/ui/drop_down_button';

import { DataService } from 'src/app/services';
import { CardAnalyticsModule } from 'src/app/components/library/card-analytics/card-analytics.component';
import { ToolbarAnalyticsModule } from 'src/app/components/utils/toolbar-analytics/toolbar-analytics.component';
import { SalesByRangeCardModule } from 'src/app/components/utils/sales-by-range-card/sales-by-range-card.component';
import { SalesPerformanceCardModule } from 'src/app/components/utils/sales-performance-card/sales-performance-card.component';
import { SalesRangeCardModule } from 'src/app/components/utils/sales-range-card/sales-range-card.component';
import { analyticsPanelItems } from 'src/app/types/resource';
import { ApplyPipeModule } from 'src/app/pipes/apply.pipe';
import { Sale, SalesOrOpportunitiesByCategory } from 'src/app/types/analytics';

@Component({
  templateUrl: './analytics-sales-report.component.html',
  styleUrls: ['./analytics-sales-report.component.scss'],
  providers: [DataService],
})
export class AnalyticsSalesReportComponent implements OnInit {
  groupByPeriods = ['Day', 'Month'];

  visualRange: unknown = {};

  isLoading: boolean = true;

  sales: Sale[] = null;
  salesByCategory: SalesOrOpportunitiesByCategory = null;
  salesByDateAndCategory: Sale[] = null;

  constructor(private service: DataService) {}

  onRangeChanged = ({value: dates}) => {
    const [startDate, endDate] = dates.map((date) => formatDate(date, 'YYYY-MM-dd', 'en'));

    this.isLoading = true;

    this.service.getSalesByCategory(startDate, endDate)
      .subscribe((result) => {
        this.salesByCategory = result;
        this.isLoading = false;
      });
  };

  selectionChange({item: period}: SelectionChangedEvent) {
    this.isLoading = true;

    this.service.getSalesByOrderDate(period.toLowerCase())
      .subscribe((result) => {
        this.salesByDateAndCategory = result;
        this.isLoading = false;
      })
  }

  customizeSaleText(arg: { percentText: string }) {
    return arg.percentText;
  }

  loadData = (groupBy: string) => {
    const [startDate, endDate] = analyticsPanelItems[4].value.split('/');
    const tasks = [
      ['sales', this.service.getSales(startDate, endDate)],
      ['salesByDateAndCategory', this.service.getSalesByOrderDate(groupBy)],
    ].map(([dataName, loader]: [string, Observable<Sale[]>]) => {
        const task = loader.pipe(share());
        task.subscribe((data) => this[dataName] = data);
        return task;
      }
    );

    forkJoin(tasks).subscribe(() => {
      this.isLoading = false;
    });
  };

  ngOnInit(): void {
    this.loadData(this.groupByPeriods[1].toLowerCase());
  }
}

@NgModule({
  imports: [
    DxScrollViewModule,
    DxLoadPanelModule,
    DxButtonModule,
    DxToolbarModule,
    DxPieChartModule,
    DxChartModule,
    DxDropDownButtonModule,
    DxRangeSelectorModule,
    CardAnalyticsModule,
    ToolbarAnalyticsModule,
    ApplyPipeModule,
    CommonModule,
    SalesByRangeCardModule,
    SalesPerformanceCardModule,
    SalesRangeCardModule,
  ],
  providers: [],
  exports: [],
  declarations: [AnalyticsSalesReportComponent],
})
export class AnalyticsSalesReportModule { }
