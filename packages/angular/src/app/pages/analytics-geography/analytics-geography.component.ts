import {
  Component, OnInit, NgModule, OnDestroy,
} from '@angular/core';

import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxVectorMapModule } from 'devextreme-angular/ui/vector-map';
import { DxBulletModule } from 'devextreme-angular/ui/bullet';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel'

import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { DataService } from 'src/app/services';
import { CardAnalyticsModule } from 'src/app/components/library/card-analytics/card-analytics.component';
import { ToolbarAnalyticsModule } from 'src/app/components/utils/toolbar-analytics/toolbar-analytics.component';
import { RevenueAnalysisByStatesCardModule } from 'src/app/components/utils/revenue-analysis-by-states-card/revenue-analysis-by-states-card.component';
import { SalesMapCardModule } from 'src/app/components/utils/sales-map-card/sales-map-card.component';
import { RevenueSnapshotByStatesCardModule } from 'src/app/components/utils/revenue-snapshot-by-states-card/revenue-snapshot-by-states-card.component';

import { analyticsPanelItems, Dates } from 'src/app/types/resource';
import { SalesByState, SalesByStateAndCity } from 'src/app/types/analytics';

@Component({
  templateUrl: './analytics-geography.component.html',
  styleUrls: ['./analytics-geography.component.scss'],
  providers: [DataService],
})
export class AnalyticsGeographyComponent implements OnInit, OnDestroy {
  analyticsPanelItems = analyticsPanelItems;

  salesByStateAndCity: SalesByStateAndCity;

  salesByState: SalesByState;

  salesByStateMarkers;

  subscription: Subscription = new Subscription();

  isLoading = false;

  constructor(private service: DataService) {
  }

  ngOnInit(): void {
    const dates = analyticsPanelItems[4].value.split('/');

    this.loadData(dates[0], dates[1]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectionChange(e: Dates) {
    this.loadData(e.startDate, e.endDate);
  }

  createMapCoords(coords: string) {
    let resultCoords = [];

    coords.split(', ').forEach((coord) => {
      resultCoords.push(parseFloat(coord));
    });

    return resultCoords;
  }

  loadData = (startDate: string, endDate: string) => {
    this.isLoading = true;

    this.service.getSalesByStateAndCity(startDate, endDate).subscribe((data: SalesByStateAndCity) => {
      this.salesByStateAndCity = data;
      this.salesByState = this.service.getSalesByState(data);
      this.salesByStateMarkers = {
        type: 'StateCollection',
        features: this.salesByState.map((item) => ({
          type: 'State',
          geometry: {
            type: 'Point',
            coordinates: this.createMapCoords(item.stateCoords),
          },
          properties: {
            text: item.stateName,
            value: item.total,
            tooltip: `<b>${item.stateName}</b>\n${item.total}K`,
          },
        })),
      };

      this.isLoading = false;
    });
  };
}

@NgModule({
  imports: [
    DxScrollViewModule,
    DxDataGridModule,
    DxBulletModule,
    DxPieChartModule,
    DxVectorMapModule,
    DxChartModule,
    CardAnalyticsModule,
    ToolbarAnalyticsModule,
    DxLoadPanelModule,
    RevenueAnalysisByStatesCardModule,
    SalesMapCardModule,
    RevenueSnapshotByStatesCardModule,
    CommonModule,
  ],
  providers: [],
  exports: [],
  declarations: [AnalyticsGeographyComponent],
})
export class AnalyticsGeographyModule { }
