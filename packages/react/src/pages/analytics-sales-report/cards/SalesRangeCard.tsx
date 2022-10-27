import RangeSelector, { Chart, Label, LoadingIndicator, Marker, MinorTick, Scale, Series, Size } from 'devextreme-react/range-selector';
import React from 'react';
import { CardAnalytics } from '../../../components/card-analytics/CardAnalytics';

export const SalesRangeCard = ({ datasource, range, onRangeChanged }) => (
  <CardAnalytics title='' contentClass='sales-range' isLoading={!datasource.length} hideMenu>
    <RangeSelector id='range' dataSource={datasource} value={range} onValueChanged={onRangeChanged}>
      <Scale minorTickInterval='day' tickInterval='month' valueType='datetime'>
        <MinorTick visible={false} />
        <Marker visible={false} />
        <Label format='MMM yyyy' />
      </Scale>
      <Size height={90} />
      <LoadingIndicator show />
      <Chart>
        <Series type='line' argumentField='date' valueField='total' />
      </Chart>
    </RangeSelector>
  </CardAnalytics>
);
