import React, { useCallback, useEffect, useState } from 'react';
import { Item } from 'devextreme-react/toolbar';
import { getOpportunitiesByCategory, getSalesByCategory, getSales, getSalesByStateAndCity, calcSalesByState } from 'dx-rwa-data';
import './analytics-dashboard.scss';
import { RevenueSnapshotCard } from './cards/RevenueSnapshotCard';
import { RevenueAnalysisCard } from './cards/RevenueAnalysisCard';
import { ConversionFunnelCard } from './cards/ConversionFunnelCard';
import { RevenueCard } from './cards/RevenueCard';
import { ConversionTicker, LeadsTicker, OpportunitiesTicker, RevenueTotalTicker } from './cards/TickerCards';
import { Dashboard } from '../../components/dashboard/Dashboard';
import { DashboardCardsGroup } from '../../components/dashboard/DashboardCardGroup';
import { ANALYTICS_PERIODS, DEFAULT_ANALYTICS_PERIOD_KEY } from '../../shared/constants';

const calculateTotal = (data) => {
  if (!data) return;
  return data.reduce((total, item) => total + (item.value || item.total), 0);
};

export const AnalyticsDashboard = () => {
  const [tabIndex, setTabIndex] = useState(ANALYTICS_PERIODS[DEFAULT_ANALYTICS_PERIOD_KEY].index);
  const [dateRange, setDateRange] = useState(ANALYTICS_PERIODS[DEFAULT_ANALYTICS_PERIOD_KEY].period.split('/'));
  const [opportunities, setOpportunities] = useState([]);
  const [salesByCategory, setSalesByCategory] = useState([]);
  const [sales, setSales] = useState([]);
  const [salesByState, setSalesByState] = useState([]);
  const [salesTotal, setSalesTotal] = useState(0);
  const [opportunitiesTotal, setOpportunitiesTotal] = useState(0);

  useEffect(() => {
    Promise.all([
      getOpportunitiesByCategory(...dateRange).then((data) => {
        setOpportunities(data);
        setOpportunitiesTotal(calculateTotal(data));
      }),
      getSalesByCategory(...dateRange).then((data) => setSalesByCategory(data)),
      getSales(...dateRange).then((data) => {
        setSales(data);
        setSalesTotal(calculateTotal(data));
      }),
      getSalesByStateAndCity(...dateRange)
        .then((data) => calcSalesByState(data))
        .then((data) => setSalesByState(data)),
    ]).catch((error) => console.log(error));
  }, [dateRange]);

  const onTabClick = useCallback((e: { itemData: string }) => {
    const { index, period } = ANALYTICS_PERIODS[e.itemData];
    setTabIndex(index);
    setDateRange(period.split('/'));
  }, []);

  return (
    <Dashboard
      title='Dashboard'
      additionalToolbarContent={
        <Item
          location='before'
          widget='dxTabs'
          locateInMenu='auto'
          options={{
            dataSource: Object.keys(ANALYTICS_PERIODS),
            selectedIndex: tabIndex,
            onItemClick: onTabClick,
          }}
        />
      }
    >
      <DashboardCardsGroup kind='compact'>
        <OpportunitiesTicker value={opportunitiesTotal} />
        <RevenueTotalTicker value={salesTotal} />
        <ConversionTicker value={16} />
        <LeadsTicker value={51} />
      </DashboardCardsGroup>
      <DashboardCardsGroup>
        <RevenueCard datasource={sales} />
        <ConversionFunnelCard datasource={opportunities} />
        <RevenueAnalysisCard datasource={salesByState} />
        <RevenueSnapshotCard datasource={salesByCategory} />
      </DashboardCardsGroup>
    </Dashboard>
  );
};
