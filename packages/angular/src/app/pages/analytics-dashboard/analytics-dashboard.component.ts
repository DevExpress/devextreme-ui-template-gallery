import {
  Component, OnInit, NgModule,
} from '@angular/core';

import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxFunnelModule } from 'devextreme-angular/ui/funnel';
import { DxBulletModule } from 'devextreme-angular/ui/bullet';

import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/shared/services';

import { CardAnalyticsModule } from 'src/app/shared/components/card-analytics/card-analytics.component';
import { ToolbarAnalyticsModule } from 'src/app/shared/components/toolbar-analytics/toolbar-analytics.component';

import { analyticsPanelItems, Dates } from 'src/app/shared/types/resource';
import {
  Sales, SalesByState, SalesByStateAndCity, SalesOrOpportunitiesByCategory,
} from 'src/app/shared/types/analytics';
import { DxLoadPanelModule } from "devextreme-angular/ui/load-panel";
import { ApplyPipeModule } from "src/app/shared/apply.pipe";
import { map } from "rxjs/operators";
import { Observable, forkJoin } from "rxjs";

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
    const tasks: Observable<any>[] = [];
    this.isLoading = true;
    const loaders = {
      'opportunities': this.service.getOpportunitiesByCategory(startDate, endDate),
      'sales': this.service.getSales(startDate, endDate),
      'salesByCategory': this.service.getSalesByCategory(startDate, endDate),
      'salesByState': this.service.getSalesByStateAndCity(startDate, endDate).pipe(
        map((data) => this.service.getSalesByState(data))
      )
    };
    for(let loader in loaders) {
      tasks.push(loaders[loader]);
    }
    forkJoin(tasks).subscribe((results) => {
      const keys = Object.keys(loaders);
      results.forEach((result, index) => {
        this[keys[index]] = result;
      });
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
