import RangeSelector, { Chart, Label, Marker, MinorTick, Scale, Series, Size, RangeSelectorTypes } from 'devextreme-react/range-selector';
import LoadIndicator from 'devextreme-react/load-indicator';
import React from 'react';
import { CardAnalytics } from '../../library/card-analytics/CardAnalytics';
import { Sale } from '../../../types/analytics';

import './SalesRangeCard.scss';

export const SalesRangeCard = ({ datasource, range, onRangeChanged }: {
  datasource: Sale[], range: Date[], onRangeChanged: (e: RangeSelectorTypes.ValueChangedEvent) => void
}) => (
  <CardAnalytics title='' contentClass='sales-range' menuVisible={false}>
    {datasource.length > 0 && <RangeSelector id='range' dataSource={datasource} value={range} onValueChanged={onRangeChanged}>
      <Scale minorTickInterval='day' tickInterval='month' valueType='datetime'>
        <MinorTick visible={false} />
        <Marker visible={false} />
        <Label format='MMM yyyy' />
      </Scale>
      <Size height={90} />
      <Chart>
        <Series type='line' argumentField='date' valueField='total' />
      </Chart>
    </RangeSelector>}
    {datasource.length === 0 && <LoadIndicator className='centered' />}
  </CardAnalytics>
);
