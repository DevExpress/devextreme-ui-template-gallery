import React from 'react';
import Chart, { ArgumentAxis, CommonSeriesSettings, Legend, Point, SeriesTemplate, Size, Tooltip } from 'devextreme-react/chart';
import DropDownButton from 'devextreme-react/drop-down-button';
import { CardAnalytics } from '../../../components/card-analytics/CardAnalytics';

export const SalesPerformanceCard = ({ datasource, periods, selectedPeriod, onPeriodChanged, range }) => (
  <CardAnalytics
    title='Sales Performance'
    contentClass='sales'
    isLoading={!datasource.length}
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
