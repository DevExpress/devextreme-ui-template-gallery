import {
  Component, OnInit, NgModule, OnDestroy,
} from '@angular/core';

import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxVectorMapModule } from 'devextreme-angular/ui/vector-map';
import { DxBulletModule } from 'devextreme-angular/ui/bullet';

import { LegendItem, MapLayerElement } from 'devextreme/viz/vector_map';

import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/shared/services';
import { Subscription } from 'rxjs';

import { CardAnalyticsModule } from 'src/app/shared/components/card-analytics/card-analytics.component';
import { ToolbarAnalyticsModule } from 'src/app/shared/components/toolbar-analytics/toolbar-analytics.component';

import { analyticsPanelItems, Dates } from 'src/app/shared/types/resource';
import * as mapsData from 'devextreme/dist/js/vectormap-data/usa.js';
import { SalesByState, SalesByStateAndCity } from 'src/app/shared/types/analytics';
import { DxLoadPanelModule } from "devextreme-angular/ui/load-panel";

@Component({
  templateUrl: './analytics-geography.component.html',
  styleUrls: ['./analytics-geography.component.scss'],
  providers: [DataService],
})
export class AnalyticsGeographyComponent implements OnInit, OnDestroy {
  usaMap: any = mapsData.usa;

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

  customizeSaleText(arg: { percentText: string }) {
    return arg.percentText;
  }

  customizeLegendText(arg: { index: number }) {
    return ['< 80000$', '80000$ to 100000$', '100000$ to 400000$', '> 400000$'][arg.index];
  }

  customizeItems(items: Array<LegendItem>) {
    return items.reverse();
  }

  customizeTooltip(arg: MapLayerElement) {
    if (arg.layer.type === 'marker') {
      return {
        text: arg.attribute('tooltip'),
      };
    }
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
    DxDataGridModule,
    DxBulletModule,
    DxPieChartModule,
    DxVectorMapModule,
    DxChartModule,
    CardAnalyticsModule,
    ToolbarAnalyticsModule,
    DxLoadPanelModule,
    CommonModule,
  ],
  providers: [],
  exports: [],
  declarations: [AnalyticsGeographyComponent],
})
export class AnalyticsGeographyModule { }
