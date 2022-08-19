import {
  Component, OnInit, NgModule, OnDestroy,
} from '@angular/core';

import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxTabsModule } from 'devextreme-angular/ui/tabs';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxFunnelModule } from 'devextreme-angular/ui/funnel';
import { DxBulletModule } from 'devextreme-angular/ui/bullet';

import { ItemClickEvent as TabsItemClickEvent } from 'devextreme/ui/tabs';

import { CommonModule } from '@angular/common';
import { RwaService } from 'src/app/shared/services';
import { forkJoin, Subscription } from 'rxjs';

import { CardAnalyticsModule } from 'src/app/shared/components/card-analytics/card-analytics.component';

import { analyticsPanelItems } from 'src/app/shared/types/resource';
import { Sales, SalesByState, SaleOrOpportunityByCategory, SalesOrOpportunitiesByCategory } from 'src/app/shared/types/analytics';


@Component({
  templateUrl: './analytics-dashboard.component.html',
  styleUrls: ['./analytics-dashboard.component.scss'],
  providers: [RwaService],
})
export class AnalyticsDashboardComponent implements OnInit, OnDestroy {

  analyticsPanelItems = analyticsPanelItems;

  salesByState: SalesByState;

  salesByCategory: SalesOrOpportunitiesByCategory;

  opportunities: SalesOrOpportunitiesByCategory;

  sales: Sales;

  selectionChange(e: TabsItemClickEvent) {
    const dates = e.itemData.value.split('/');

    this.loadData(dates[0], dates[1]);
  }

  customizeOppText(arg: any) {
    return '$' + arg.valueText;
  }

  customizeSaleText(arg: any) {
    return arg.percentText;
  }


  getTotal(data: any) {
    if(!data) return 0;

    let total = 0;

    data.forEach((item) => {
      total += (item.value || item.total || 0);
    });

    return total;
  }
 
  constructor(private service: RwaService) {
   };

  subscriptions: Subscription[] = [];

  loadData = (startDate: string, endDate: string) => {
    const observable = forkJoin({
      opportunities: this.service.getOpportunitiesByCategory(startDate, endDate),
      salesByCategory: this.service.getSalesByCategory(startDate, endDate),
      sales: this.service.getSales(startDate, endDate),
    });

    this.subscriptions.push(this.service.getSalesByStateAndCity(startDate, endDate).subscribe((data) => {
      this.salesByState = this.service.getSalesByState(data);
    }));

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
    DxTabsModule, 
    DxToolbarModule,
    DxDataGridModule,
    DxBulletModule,
    DxFunnelModule,
    DxPieChartModule,
    DxChartModule,
    CardAnalyticsModule,

    CommonModule,
  ],
  providers: [],
  exports: [],
  declarations: [AnalyticsDashboardComponent],
})
export class AnalyticsDashboardModule { }
