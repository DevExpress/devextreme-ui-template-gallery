import { Component, Input } from '@angular/core';
import { CardAnalyticsComponent } from '../../library/card-analytics/card-analytics.component';
import { DxVectorMapModule, DxVectorMapTypes } from 'devextreme-angular/ui/vector-map';

import * as mapsData from 'devextreme-dist/js/vectormap-data/usa.js';
import { MapLayerElement } from 'devextreme/viz/vector_map';

@Component({
  selector: 'sales-map-card',
  templateUrl: './sales-map-card.component.html',
  styleUrls: ['./sales-map-card.component.scss'],
  imports: [
    CardAnalyticsComponent,
    DxVectorMapModule,
  ],
})
export class SalesMapCardComponent {
  @Input() data: any;

  usaMap: any = mapsData.usa;

  customizeLegendText(arg: { index: number }) {
    return ['< 80000$', '80000$ to 100000$', '100000$ to 400000$', '> 400000$'][arg.index];
  }

  customizeItems(items: Array<DxVectorMapTypes.LegendItem>) {
    return items.reverse();
  }

  customizeTooltip(arg: MapLayerElement) {
    if (arg.layer.type === 'marker') {
      return {
        text: arg.attribute('tooltip'),
      };
    }
  }
}
