import React from 'react';
import Chart, { ArgumentAxis, CommonSeriesSettings, Legend, Point, SeriesTemplate, Size, Tooltip } from 'devextreme-react/chart';
import DropDownButton from 'devextreme-react/drop-down-button';
import { SelectionChangedEvent } from 'devextreme/ui/drop_down_button';

import { CardAnalytics } from '../../library/card-analytics/CardAnalytics';
import { Sale } from '../../../types/analytics';

export const SalesPerformanceCard = ({ datasource, periods, selectedPeriod, onPeriodChanged, range }: {
  datasource: Sale[], periods: string[], selectedPeriod: string, onPeriodChanged: (e: SelectionChangedEvent) => void,
  range: Date[]
}) => (
  <CardAnalytics
    title='Sales Performance'
    contentClass='sales'
    additionalHeaderContent={
      <div className='sales-filter'>
        <DropDownButton stylingMode='text' useSelectMode items={periods} selectedItemKey={selectedPeriod} onSelectionChanged={onPeriodChanged} />
      </div>
    }
  >
    <Chart id='chart' dataSource={datasource}>
      <ArgumentAxis visualRange={range} argumentType='datetime' valueMarginsEnabled={false} />
      <Tooltip enabled customizeTooltip={({ seriesName }) => ({ text: seriesName })} />
      <SeriesTemplate nameField='category' />
      <CommonSeriesSettings argumentField='date' valueField='total' hoverMode='includePoints'>
        <Point hoverMode='allArgumentPoints' />
      </CommonSeriesSettings>
      <Legend visible={false} />
      <Size height={270} />
    </Chart>
  </CardAnalytics>
);
