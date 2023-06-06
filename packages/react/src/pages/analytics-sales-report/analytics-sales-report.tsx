import React, { useState, useEffect, useCallback } from 'react';

import { ToolbarAnalytics, SalesRangeCard, SalesByRangeCard, SalesPerformanceCard } from '../../components';
import { Sale, SaleOrOpportunityByCategory } from '../../types/analytics';

import { getSalesByCategory, getSales, getSalesByOrderDate } from 'dx-template-gallery-data';

import { formatDate } from 'devextreme/localization';
import LoadPanel from 'devextreme-react/load-panel';
import { RangeSelectorTypes } from 'devextreme-react/range-selector';
import { DropDownButtonTypes } from 'devextreme-react/drop-down-button';
import ScrollView from 'devextreme-react/scroll-view';

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

  const onRangeChanged = useCallback((e: RangeSelectorTypes.ValueChangedEvent) => {
    const [startDate, endDate] = e.value;
    setDateRange([startDate, endDate] as Date[]);
    setIsLoading(true);
  }, []);

  const onPeriodChanged = useCallback((e: DropDownButtonTypes.SelectionChangedEvent) => {
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
    <ScrollView className='view-wrapper-scroll'>
      <ToolbarAnalytics title='Sales Report'>
        <div className='cards wide'>
          <SalesRangeCard datasource={sales} range={dateRange} onRangeChanged={onRangeChanged} />
          <SalesByRangeCard datasource={salesByCategory} />
          <SalesPerformanceCard
            datasource={salesByDateAndCategory}
            periods={groupByPeriods}
            selectedPeriod={groupByPeriod}
            onPeriodChanged={onPeriodChanged}
            range={dateRange}
          />
        </div>
      </ToolbarAnalytics>
      <LoadPanel container='.content' visible={isLoading} position={{ of: '.layout-body' }} />
    </ScrollView>
  );
};
