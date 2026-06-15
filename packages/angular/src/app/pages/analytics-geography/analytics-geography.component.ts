import {
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxVectorMapModule } from 'devextreme-angular/ui/vector-map';
import { DxBulletModule } from 'devextreme-angular/ui/bullet';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel';

import { DataService } from 'src/app/services';
import { ToolbarAnalyticsComponent } from 'src/app/components/utils/toolbar-analytics/toolbar-analytics.component';
import { RevenueAnalysisByStatesCardComponent } from 'src/app/components/utils/revenue-analysis-by-states-card/revenue-analysis-by-states-card.component';
import { SalesMapCardComponent } from 'src/app/components/utils/sales-map-card/sales-map-card.component';
import { RevenueSnapshotByStatesCardComponent } from 'src/app/components/utils/revenue-snapshot-by-states-card/revenue-snapshot-by-states-card.component';
import { analyticsPanelItems, Dates } from 'src/app/types/resource';
import { SalesByState, SalesByStateAndCity } from 'src/app/types/analytics';

type SalesByStateMarkers = {
  type: string;
  features: {
    type: string;
    geometry: {
      type: string;
      coordinates: number[];
    };
    properties: {
      text: string;
      value: number;
      tooltip: string;
    };
  }[];
};

@Component({
  templateUrl: './analytics-geography.component.html',
  styleUrls: ['./analytics-geography.component.scss'],
  providers: [DataService],
  imports: [
    DxScrollViewModule,
    DxDataGridModule,
    DxBulletModule,
    DxPieChartModule,
    DxVectorMapModule,
    DxChartModule,
    ToolbarAnalyticsComponent,
    DxLoadPanelModule,
    RevenueAnalysisByStatesCardComponent,
    SalesMapCardComponent,
    RevenueSnapshotByStatesCardComponent,
    CommonModule,
  ],
})
export class AnalyticsGeographyComponent implements OnInit {
  private service = inject(DataService);

  analyticsPanelItems = analyticsPanelItems;

  salesByStateAndCity = signal<SalesByStateAndCity | null>(null);

  salesByState = signal<SalesByState | null>(null);

  salesByStateMarkers = signal<SalesByStateMarkers | null>(null);

  isLoading = signal(false);

  ngOnInit(): void {
    const dates = analyticsPanelItems[4].value.split('/');

    this.loadData(dates[0], dates[1]);
  }

  selectionChange(e: Dates) {
    this.loadData(e.startDate, e.endDate);
  }

  createMapCoords(coords: string) {
    const resultCoords: number[] = [];

    coords.split(', ').forEach((coord) => {
      resultCoords.push(parseFloat(coord));
    });

    return resultCoords;
  }

  loadData = (startDate: string, endDate: string) => {
    this.isLoading.set(true);

    this.service
      .getSalesByStateAndCity(startDate, endDate)
      .subscribe((data) => {
        const salesByStateAndCity = data as SalesByStateAndCity;
        const salesByState = this.service.getSalesByState(salesByStateAndCity);

        this.salesByStateAndCity.set(salesByStateAndCity);
        this.salesByState.set(salesByState);
        this.salesByStateMarkers.set({
          type: 'StateCollection',
          features: salesByState.map((item: SalesByState[number]) => ({
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
        });
        this.isLoading.set(false);
      });
  };
}
