import React, { useState, useEffect, useCallback } from 'react';
import RangeSelector, { Scale, MinorTick, Marker, Label, Size, LoadingIndicator, Chart as RangeChart, Series } from 'devextreme-react/range-selector';
import { CardAnalytics } from '../../components/card-analytics/CardAnalytics';
import { DashboardContainer } from '../../components/dashboard-container/DashboardContainer';
import { getSalesByCategory, getSales, getSalesByOrderDate } from 'dx-rwa-data';
import PieChart, { Font, Legend, Margin, Label as PieLabel } from 'devextreme-react/pie-chart';
import { DashboardCardsGroup } from '../../components/dashboard-container/DashboardCardGroup';
import Chart, {
  CommonAxisSettings,
  Tick,
  Legend as ChartLegend,
  CommonSeriesSettings,
  SeriesTemplate,
  ValueAxis,
  Label as ChartLabel,
  Format,
  Point,
  Tooltip,
  ArgumentAxis,
  Size as ChartSize
} from 'devextreme-react/chart';
import DropDownButton from 'devextreme-react/drop-down-button';
import { formatDate } from 'devextreme/localization';
import './analytics-sales-report.scss';

export const SalesRangeCard = ({ datasource, range, onRangeChanged }) => (
  <CardAnalytics title='' contentClass='sales-range' isLoading={!datasource.length}>
    <RangeSelector id='range' dataSource={datasource} value={range} onValueChanged={onRangeChanged}>
      <Scale minorTickInterval='day' tickInterval='month' valueType='datetime'>
        <MinorTick visible={false} />
        <Marker visible={false} />
        <Label format='MMM yyyy' />
      </Scale>
      <Size height={90} />
      <LoadingIndicator show />
      <RangeChart>
        <Series type='line' argumentField='date' valueField='total' />
      </RangeChart>
    </RangeSelector>
  </CardAnalytics>
);

export const ProductSaleByRangeCard = ({ datasource }) => (
  <CardAnalytics title='Product Sale by Range' contentClass='sales-by-category' isLoading={!datasource.length}>
    <PieChart id='pie' className='sales-pie' dataSource={datasource} type='doughnut' diameter={0.8} innerRadius={0.6}>
      <Series argumentField='name' valueField='value'>
        <PieLabel backgroundColor='none' radialOffset={-20} visible customizeText={({ percentText }) => percentText}>
          <Font color='#757575' size={15} />
        </PieLabel>
      </Series>
      <Legend>
        <Margin top={70} />
      </Legend>
      <Size height={270} />
    </PieChart>
    <Chart id='bar' dataSource={datasource} className='sales-bars' rotated>
      <CommonAxisSettings visible={false}>
        <Tick visible={false} />
      </CommonAxisSettings>
      <ChartLegend visible={false} />
      <CommonSeriesSettings argumentField='name' valueField='value' type='bar' ignoreEmptyPoints />
      <SeriesTemplate nameField='name' />
      <ValueAxis>
        <ChartLabel>
          <Format type='largeNumber' />
        </ChartLabel>
      </ValueAxis>
    </Chart>
  </CardAnalytics>
);

export const SalesPerformanceCard = ({ datasource, periods, selectedPeriod, onPeriodChanged, range }) => (
  <CardAnalytics
    title='Sales Perfomance'
    contentClass='sales'
    isLoading={!datasource.length}
    additionalHeaderContent={
      <div className='sales-filter'>
        <DropDownButton stylingMode='text' useSelectMode items={periods} selectedItemKey={selectedPeriod} onSelectionChanged={onPeriodChanged} />
      </div>
    }
  >
    <Chart id='chart' dataSource={datasource}>
      <ArgumentAxis visualRange={range} />
      <Tooltip enabled customizeTooltip={({ seriesName }) => ({ text: seriesName })} />
      <SeriesTemplate nameField='category' />
      <CommonSeriesSettings argumentField='date' valueField='total' hoverMode='includePoints'>
        <Point hoverMode='allArgumentPoints' />
      </CommonSeriesSettings>
      <ArgumentAxis argumentType='datetime' valueMarginsEnabled='false' />
      <ChartLegend visible={false} />
      <ChartSize height={270} />
    </Chart>
  </CardAnalytics>
);

const formatDateRange = (dateRange: Date[]) => dateRange.map((date) => formatDate(date, 'yyyy-MM-dd'));

const groupByPeriods = ['Day', 'Month'];

export const AnalyticsSalesReport = () => {
  const [sales, setSales] = useState([]);
  const [salesByCategory, setSalesByCategory] = useState([]);
  const [salesByDateAndCategory, setSalesByDateAndCategory] = useState([]);
  const [dateRange, setDateRange] = useState([new Date('2018-01-01'), new Date('2022-01-01')]); //TODO: share default ranges between all dashboard views
  const [groupByPeriod, setGroupByPeriod] = useState(groupByPeriods[1]);

  const onRangeChanged = useCallback((e) => {
    const [startDate, endDate] = e.value;
    setDateRange([startDate, endDate]);
  }, []);

  const onPeriodChanged = useCallback((e) => {
    const groupByPeriod = e.item;
    setGroupByPeriod(groupByPeriod);
  }, []);

  useEffect(() => {
    getSales(...formatDateRange(dateRange))
      .then((data) => setSales(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getSalesByCategory(...formatDateRange(dateRange))
      .then((data) => setSalesByCategory(data))
      .catch((error) => console.log(error));
  }, [dateRange]);

  useEffect(() => {
    getSalesByOrderDate(groupByPeriod)
      .then((data) => setSalesByDateAndCategory(data))
      .catch((error) => console.log(error));
  }, [groupByPeriod]);

  return (
    <DashboardContainer>
      <DashboardCardsGroup kind='wide'>
        <SalesRangeCard datasource={sales} range={dateRange} onRangeChanged={onRangeChanged} />
        <ProductSaleByRangeCard datasource={salesByCategory} />
        <SalesPerformanceCard datasource={salesByDateAndCategory} periods={groupByPeriods} selectedPeriod={groupByPeriod} onPeriodChanged={onPeriodChanged} range={dateRange} />
      </DashboardCardsGroup>
    </DashboardContainer>
  );
};
