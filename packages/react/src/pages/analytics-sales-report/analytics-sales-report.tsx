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
  Size as ChartSize,
} from 'devextreme-react/chart';
import DropDownButton from 'devextreme-react/drop-down-button';
import { formatDate } from 'devextreme/localization';
import './analytics-sales-report.scss';
import { ANALYTICS_PERIODS, DEFAULT_ANALYTICS_PERIOD_KEY } from '../../shared/constants';

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
      <RangeChart>
        <Series type='line' argumentField='date' valueField='total' />
      </RangeChart>
    </RangeSelector>
  </CardAnalytics>
);

type ProductSaleByRangeCardProps = { datasource: Array<{ [key: string]: unknown }> };

export const ProductSaleByRangeCard = React.memo<ProductSaleByRangeCardProps>(({ datasource }) => (
  <CardAnalytics title='Product Sale by Range' contentClass='sales-by-category' isLoading={!datasource.length}>
    <PieChart id='pie' className='sales-pie' dataSource={datasource} type='doughnut' diameter={0.8} innerRadius={0.6}>
      <Series argumentField='name' valueField='value'>
        <PieLabel backgroundColor='none' radialOffset={-20} visible customizeText={({ percentText }) => percentText}>
          <Font color='#757575' size={15} />
        </PieLabel>
      </Series>
      <Legend visible={false}>
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
));

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
      <ArgumentAxis visualRange={range} argumentType='datetime' valueMarginsEnabled={false} />
      <Tooltip enabled customizeTooltip={({ seriesName }) => ({ text: seriesName })} />
      <SeriesTemplate nameField='category' />
      <CommonSeriesSettings argumentField='date' valueField='total' hoverMode='includePoints'>
        <Point hoverMode='allArgumentPoints' />
      </CommonSeriesSettings>
      <ChartLegend visible={false} />
      <ChartSize height={270} />
    </Chart>
  </CardAnalytics>
);

const formatDateRange = (dateRange: Date[]) => dateRange.map((date) => formatDate(date, 'yyyy-MM-dd'));

const defaultDateRange = ANALYTICS_PERIODS[DEFAULT_ANALYTICS_PERIOD_KEY].period.split('/').map((d) => new Date(d));

const groupByPeriods = ['Day', 'Month'];

export const AnalyticsSalesReport = () => {
  const [sales, setSales] = useState([]);
  const [salesByCategory, setSalesByCategory] = useState([]);
  const [salesByDateAndCategory, setSalesByDateAndCategory] = useState([]);
  const [dateRange, setDateRange] = useState(defaultDateRange);
  const [groupByPeriod, setGroupByPeriod] = useState(groupByPeriods[1]);

  const onRangeChanged = useCallback((e) => {
    const [startDate, endDate] = e.value;
    setDateRange([startDate, endDate]);
  }, []);

  const onPeriodChanged = useCallback((e) => {
    setGroupByPeriod(e.item);
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
    getSalesByOrderDate(groupByPeriod.toLowerCase())
      .then((data) => setSalesByDateAndCategory(data))
      .catch((error) => console.log(error));
  }, [groupByPeriod]);

  return (
    <DashboardContainer title='Sales Report'>
      <DashboardCardsGroup kind='wide'>
        <SalesRangeCard datasource={sales} range={dateRange} onRangeChanged={onRangeChanged} />
        <ProductSaleByRangeCard datasource={salesByCategory} />
        <SalesPerformanceCard datasource={salesByDateAndCategory} periods={groupByPeriods} selectedPeriod={groupByPeriod} onPeriodChanged={onPeriodChanged} range={dateRange} />
      </DashboardCardsGroup>
    </DashboardContainer>
  );
};
