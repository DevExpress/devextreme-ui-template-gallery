import React from 'react';
import VectorMap, {
  Layer,
  Legend,
  Source,
  Tooltip,
} from 'devextreme-react/vector-map';
import { CardAnalytics } from '../../library/card-analytics/CardAnalytics';
import { MapLayerElement } from 'devextreme/viz/vector_map';
import { VectorMapTypes } from 'devextreme-react/vector-map';

const customizeLegendText = (arg) => {
  return ['< 80000$', '80000$ to 100000$', '100000$ to 400000$', '> 400000$'][
    arg.index
  ];
};

const customizeItems = (items: Array<VectorMapTypes.LegendItem>) => items.reverse();

const customizeTooltip = (arg: MapLayerElement) => {
  return arg.layer.type === 'marker' ? {
    text: arg.attribute('tooltip'),
  } : {};
};

export const SalesMapCard = ({ datasource, mapsData }) => (
  <CardAnalytics
    title='Revenue by States'
    contentClass='sales-by-state-map'
  >
    <VectorMap id='vector-map' bounds={[-118, 50, -80, 25]}>
      <Layer dataSource={mapsData.usa} hoverEnabled={false} />
      <Layer
        dataSource={datasource}
        minSize={20}
        maxSize={40}
        sizeGroups={[0, 80000, 100000, 400000, 500000]}
        opacity={0.8}
        name='bubbles'
        elementType='bubble'
        dataField='value'
      />
      <Tooltip enabled customizeTooltip={customizeTooltip} />
      <Legend
        markerShape='circle'
        customizeItems={customizeItems}
        customizeText={customizeLegendText}
      >
        <Source layer='bubbles' grouping='size' />
      </Legend>
    </VectorMap>
  </CardAnalytics>
);
