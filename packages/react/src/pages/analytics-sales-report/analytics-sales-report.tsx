import React, { useState, useEffect, useCallback } from 'react';
import { Dashboard } from '../../components/dashboard/Dashboard';
import { DashboardCardsGroup } from '../../components/dashboard/DashboardCardGroup';
import { SalesRangeCard } from './cards/SalesRangeCard';
import { ProductSaleByRangeCard } from './cards/ProductSaleByRangeCard';
import { SalesPerformanceCard } from './cards/SalesPerformanceCard';
import { getSalesByCategory, getSales, getSalesByOrderDate } from 'dx-rwa-data';
import { formatDate } from 'devextreme/localization';
import { ANALYTICS_PERIODS, DEFAULT_ANALYTICS_PERIOD_KEY } from '../../shared/constants';
import './analytics-sales-report.scss';

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
    getSales(...formatDateRange(defaultDateRange))
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
    <Dashboard title='Sales Report'>
      <DashboardCardsGroup kind='wide'>
        <SalesRangeCard datasource={sales} range={dateRange} onRangeChanged={onRangeChanged} />
        <ProductSaleByRangeCard datasource={salesByCategory} />
        <SalesPerformanceCard datasource={salesByDateAndCategory} periods={groupByPeriods} selectedPeriod={groupByPeriod} onPeriodChanged={onPeriodChanged} range={dateRange} />
      </DashboardCardsGroup>
    </Dashboard>
  );
};
