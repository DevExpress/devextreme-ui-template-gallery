import React, { useState, useEffect, useCallback } from 'react';

import { Dashboard } from '../../components/dashboard/Dashboard';
import { DashboardCardsGroup } from '../../components/dashboard/DashboardCardGroup';
import { SalesRangeCard } from './cards/SalesRangeCard';
import { ProductSaleByRangeCard } from './cards/ProductSaleByRangeCard';
import { SalesPerformanceCard } from './cards/SalesPerformanceCard';
import { Sale, SaleOrOpportunityByCategory } from '../../shared/types/analytics';

import { getSalesByCategory, getSales, getSalesByOrderDate } from 'dx-template-gallery-data';

import { formatDate } from 'devextreme/localization';
import LoadPanel from 'devextreme-react/load-panel';
import { ValueChangedEvent } from 'devextreme/viz/range_selector';
import { SelectionChangedEvent } from 'devextreme/ui/drop_down_button';

import { ANALYTICS_PERIODS, DEFAULT_ANALYTICS_PERIOD_KEY } from '../../shared/constants';

import './analytics-sales-report.scss';

const formatDateRange = (dateRange: Date[]) => dateRange.map((date) => formatDate(date, 'yyyy-MM-dd'));

const defaultDateRange = ANALYTICS_PERIODS[DEFAULT_ANALYTICS_PERIOD_KEY].period.split('/').map((d) => new Date(d));

const groupByPeriods = ['Day', 'Month'];

export const AnalyticsSalesReport = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [salesByCategory, setSalesByCategory] = useState<SaleOrOpportunityByCategory[]>([]);
  const [salesByDateAndCategory, setSalesByDateAndCategory] = useState<Sale[]>([]);
  const [dateRange, setDateRange] = useState(defaultDateRange);
  const [groupByPeriod, setGroupByPeriod] = useState(groupByPeriods[1]);
  const [isLoading, setIsLoading] = useState(true);

  const onRangeChanged = useCallback((e: ValueChangedEvent) => {
    const [startDate, endDate] = e.value;
    setDateRange([startDate, endDate] as Date[]);
    setIsLoading(true);
  }, []);

  const onPeriodChanged = useCallback((e: SelectionChangedEvent) => {
    setGroupByPeriod(e.item);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    getSales(...formatDateRange(defaultDateRange))
      .then((data) => setSales(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getSalesByCategory(...formatDateRange(dateRange))
      .then((data) => {
        setSalesByCategory(data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [dateRange]);

  useEffect(() => {
    getSalesByOrderDate(groupByPeriod.toLowerCase())
      .then((data) => {
        setSalesByDateAndCategory(data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [groupByPeriod]);

  return (
    <>
      <Dashboard title='Sales Report'>
        <DashboardCardsGroup kind='wide'>
          <SalesRangeCard datasource={sales} range={dateRange} onRangeChanged={onRangeChanged} />
          <ProductSaleByRangeCard datasource={salesByCategory} />
          <SalesPerformanceCard
            datasource={salesByDateAndCategory}
            periods={groupByPeriods}
            selectedPeriod={groupByPeriod}
            onPeriodChanged={onPeriodChanged}
            range={dateRange}
          />
        </DashboardCardsGroup>
      </Dashboard>
      <LoadPanel container='.view-wrapper-dashboard' visible={isLoading} position={{ of: '.layout-body' }} />
    </>
  );
};
