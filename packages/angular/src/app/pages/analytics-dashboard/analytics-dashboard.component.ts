import {
  Component, OnInit, NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, share } from "rxjs/operators";
import { Observable, forkJoin } from "rxjs";

import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxFunnelModule } from 'devextreme-angular/ui/funnel';
import { DxBulletModule } from 'devextreme-angular/ui/bullet';
import { DxLoadPanelModule } from "devextreme-angular/ui/load-panel";

import { DataService } from 'src/app/services';
import { CardAnalyticsModule } from 'src/app/components/card-analytics/card-analytics.component';
import { ToolbarAnalyticsModule } from 'src/app/components/toolbar-analytics/toolbar-analytics.component';
import { analyticsPanelItems, Dates } from 'src/app/types/resource';
import {
  Sales, SalesByState, SalesByStateAndCity, SalesOrOpportunitiesByCategory,
} from 'src/app/types/analytics';
import { ApplyPipeModule } from "src/app/pipes/apply.pipe";

type DashboardData = SalesOrOpportunitiesByCategory | Sales | SalesByState | SalesByStateAndCity | null;
type DataLoader = (startDate: string, endDate: string) => Observable<Object>;

@Component({
  templateUrl: './analytics-dashboard.component.html',
  styleUrls: ['./analytics-dashboard.component.scss'],
  providers: [DataService],
})
export class AnalyticsDashboardComponent implements OnInit {
  analyticsPanelItems = analyticsPanelItems;

  opportunities: SalesOrOpportunitiesByCategory = null;
  sales: Sales = null;
  salesByState: SalesByState = null;
  salesByCategory: SalesByStateAndCity = null;

  isLoading: boolean = true;

  constructor(private service: DataService) {}

  selectionChange(dates: Dates) {
    this.loadData(dates.startDate, dates.endDate);
  }

  customizeOppText(arg: { valueText: string }) {
    return `$${arg.valueText}`;
  }

  customizeSaleText(arg: { percentText: string }) {
    return arg.percentText;
  }

  loadData = (startDate: string, endDate: string) => {
    this.isLoading = true;
    const tasks: Observable<object>[] = [
      ['opportunities', this.service.getOpportunitiesByCategory],
      ['sales', this.service.getSales],
      ['salesByCategory', this.service.getSalesByCategory],
      ['salesByState', (startDate: string, endDate: string) => this.service.getSalesByStateAndCity(startDate, endDate).pipe(
        map((data) => this.service.getSalesByState(data))
      )
      ]
    ].map(([dataName, loader]: [string, DataLoader]) => {
      const loaderObservable = loader(startDate, endDate).pipe(share());

      loaderObservable.subscribe((result: DashboardData) => {
        this[dataName] = result;
      });

      return loaderObservable;
    });

    forkJoin(tasks).subscribe(() => {
      this.isLoading = false;
    });
  };

  getTotal(data: Array<{value?: number, total?: number}> ): number {
    return (data || []).reduce((total, item) => total + (item.value || item.total), 0);
  }

  ngOnInit(): void {
    const [startDate, endDate] = analyticsPanelItems[4].value.split('/');

    this.loadData(startDate, endDate);
  }
}

@NgModule({
  imports: [
    DxDataGridModule,
    DxBulletModule,
    DxFunnelModule,
    DxPieChartModule,
    DxChartModule,
    CardAnalyticsModule,
    ToolbarAnalyticsModule,
    DxLoadPanelModule,
    ApplyPipeModule,
    CommonModule,
  ],
  providers: [],
  exports: [],
  declarations: [AnalyticsDashboardComponent],
})
export class AnalyticsDashboardModule { }
