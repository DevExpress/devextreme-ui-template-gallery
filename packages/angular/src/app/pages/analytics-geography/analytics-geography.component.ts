import {
  Component, OnInit, NgModule, OnDestroy,
} from '@angular/core';

import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxTabsModule } from 'devextreme-angular/ui/tabs';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxVectorMapModule } from 'devextreme-angular/ui/vector-map';
import { DxBulletModule } from 'devextreme-angular/ui/bullet';

import { ItemClickEvent as TabsItemClickEvent } from 'devextreme/ui/tabs';
import { LegendItem } from 'devextreme/viz/vector_map';

import { CommonModule } from '@angular/common';
import { RwaService } from 'src/app/shared/services';
import { Subscription } from 'rxjs';

import { CardAnalyticsModule } from 'src/app/shared/components/card-analytics/card-analytics.component';

import { analyticsPanelItems } from 'src/app/shared/types/resource';
import * as mapsData from 'devextreme/dist/js/vectormap-data/usa.js';
import { SalesByState, SalesByStateAndCity } from 'src/app/shared/types/analytics';

@Component({
  templateUrl: './analytics-geography.component.html',
  styleUrls: ['./analytics-geography.component.scss'],
  providers: [RwaService],
})
export class AnalyticsGeographyComponent implements OnInit, OnDestroy {
  usaMap: any = mapsData.usa;

  analyticsPanelItems = analyticsPanelItems;

  salesByStateAndCity: SalesByStateAndCity;

  salesByState: SalesByState;

  salesByStateMarkers;

  selectionChange(e: TabsItemClickEvent) {
    const dates = e.itemData.value.split('/');

    this.loadData(dates[0], dates[1]);
  }

  customizeSaleText(arg: { percentText: string }) {
    return arg.percentText;
  }

  customizeLegendText(arg: { index: number }) {
    return ['< 80000K', '80000K to 100000K', '100000K to 400000K', '> 400000K'][arg.index];
  }

  customizeItems(items: Array<LegendItem>) {
    return items.reverse();
  }

  customizeTooltip(arg: any) {
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

  constructor(private service: RwaService) {
  }

  subscription: Subscription = new Subscription();

  loadData = (startDate: string, endDate: string) => {
    this.subscription = this.service.getSalesByStateAndCity(startDate, endDate).subscribe((data: SalesByStateAndCity) => {
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
    });
  };

  ngOnInit(): void {
    const dates = analyticsPanelItems[4].value.split('/');

    this.loadData(dates[0], dates[1]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

@NgModule({
  imports: [
    DxButtonModule,
    DxTabsModule,
    DxToolbarModule,
    DxDataGridModule,
    DxBulletModule,
    DxPieChartModule,
    DxVectorMapModule,
    DxChartModule,
    CardAnalyticsModule,

    CommonModule,
  ],
  providers: [],
  exports: [],
  declarations: [AnalyticsGeographyComponent],
})
export class AnalyticsGeographyModule { }
