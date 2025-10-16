import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, share } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';

import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxFunnelModule } from 'devextreme-angular/ui/funnel';
import { DxBulletModule } from 'devextreme-angular/ui/bullet';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';

import { DataService } from 'src/app/services';
import { ToolbarAnalyticsComponent } from 'src/app/components/utils/toolbar-analytics/toolbar-analytics.component';
import { ConversionCardComponent } from 'src/app/components/utils/conversion-card/conversion-card.component';
import { RevenueCardComponent } from 'src/app/components/utils/revenue-card/revenue-card.component';
import { RevenueAnalysisCardComponent } from 'src/app/components/utils/revenue-analysis-card/revenue-analysis-card.component';
import { RevenueSnapshotCardComponent } from 'src/app/components/utils/revenue-snapshot-card/revenue-snapshot-card.component';
import { OpportunitiesTickerComponent } from 'src/app/components/utils/opportunities-ticker/opportunities-ticker.component';
import { RevenueTotalTickerComponent } from 'src/app/components/utils/revenue-total-ticker/revenue-total-ticker.component';
import { ConversionTickerComponent } from 'src/app/components/utils/conversion-ticker/conversion-ticker.component';
import { LeadsTickerComponent } from 'src/app/components/utils/leads-ticker/leads-ticker.component';
import { analyticsPanelItems, Dates } from 'src/app/types/resource';
import {
  Sales, SalesByState, SalesByStateAndCity, SalesOrOpportunitiesByCategory,
} from 'src/app/types/analytics';

type DashboardData = SalesOrOpportunitiesByCategory | Sales | SalesByState | SalesByStateAndCity | null;
type DataLoader = (startDate: string, endDate: string) => Observable<Object>;

@Component({
  templateUrl: './analytics-dashboard.component.html',
  styleUrls: ['./analytics-dashboard.component.scss'],
  providers: [ DataService ],
  imports: [
    DxScrollViewModule,
    DxDataGridModule,
    DxBulletModule,
    DxFunnelModule,
    DxPieChartModule,
    DxChartModule,
    ToolbarAnalyticsComponent,
    DxLoadPanelModule,
    ConversionCardComponent,
    RevenueAnalysisCardComponent,
    RevenueCardComponent,
    RevenueSnapshotCardComponent,
    OpportunitiesTickerComponent,
    RevenueTotalTickerComponent,
    ConversionTickerComponent,
    LeadsTickerComponent,
    CommonModule,
  ],
})
export class AnalyticsDashboardComponent implements OnInit {
  private service = inject(DataService);

  analyticsPanelItems = analyticsPanelItems;
  opportunities: SalesOrOpportunitiesByCategory = null;
  sales: Sales = null;
  salesByState: SalesByState = null;
  salesByCategory: SalesByStateAndCity = null;

  isLoading: boolean = true;

  selectionChange(dates: Dates) {
    this.loadData(dates.startDate, dates.endDate);
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

  ngOnInit(): void {
    const [startDate, endDate] = analyticsPanelItems[4].value.split('/');

    this.loadData(startDate, endDate);
  }
}
