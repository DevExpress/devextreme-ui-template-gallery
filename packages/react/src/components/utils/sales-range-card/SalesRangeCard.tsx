import RangeSelector, { Chart, Label, LoadingIndicator, Marker, MinorTick, Scale, Series, Size, SliderMarker, SliderHandle, RangeSelectorTypes } from 'devextreme-react/range-selector';
import React from 'react';
import { CardAnalytics } from '../../library/card-analytics/CardAnalytics';
import { Sale } from '../../../types/analytics';

export const SalesRangeCard = ({ datasource, range, onRangeChanged }: {
  datasource: Sale[], range: Date[], onRangeChanged: (e: RangeSelectorTypes.ValueChangedEvent) => void
}) => (
  <CardAnalytics title='' contentClass='sales-range' menuVisible={false}>
    <RangeSelector id='range' dataSource={datasource} value={range} onValueChanged={onRangeChanged}>
      <Scale minorTickInterval='day' tickInterval='month' valueType='datetime'>
        <MinorTick visible={false} />
        <Marker visible={false} />
        <Label format='MMM yyyy' />
      </Scale>
      <Size height={90} />
      <LoadingIndicator show />
      <SliderMarker visible />
      <SliderHandle opacity={0.5} width={2} />
      <Chart>
        <Series type='line' argumentField='date' valueField='total' />
      </Chart>
    </RangeSelector>
  </CardAnalytics>
);
