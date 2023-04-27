import {
  Component,
  NgModule,
  Input,
} from '@angular/core';
import { CardAnalyticsModule } from '../../library/card-analytics/card-analytics.component';
import { DxVectorMapModule } from 'devextreme-angular/ui/vector-map';

import { LegendItem, MapLayerElement } from 'devextreme/viz/vector_map';
import * as mapsData from 'devextreme/dist/js/vectormap-data/usa.js';

@Component({
  selector: 'sales-map-card',
  templateUrl: './sales-map-card.component.html',
  styleUrls: ['./sales-map-card.component.scss'],
})
export class SalesMapCardComponent {
  @Input() data: any;

  usaMap: any = mapsData.usa;

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
}

@NgModule({
  imports: [
    CardAnalyticsModule,
    DxVectorMapModule,
  ],
  declarations: [SalesMapCardComponent],
  exports: [SalesMapCardComponent],
})
export class SalesMapCardModule { }
