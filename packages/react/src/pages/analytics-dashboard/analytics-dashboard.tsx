import React, { useCallback, useEffect, useState } from 'react';

import { Item } from 'devextreme-react/toolbar';
import { LoadPanel } from 'devextreme-react/load-panel';

import { getOpportunitiesByCategory, getSalesByCategory, getSales, getSalesByStateAndCity, calcSalesByState } from 'dx-template-gallery-data';

import {
  Dashboard,
  RevenueSnapshotCard,
  RevenueAnalysisCard,
  ConversionFunnelCard,
  RevenueCard,
  ConversionTicker,
  LeadsTicker,
  OpportunitiesTicker,
  RevenueTotalTicker } from '../../components';
import { DashboardCardsGroup } from '../../components/dashboard/DashboardCardGroup';
import { ANALYTICS_PERIODS, DEFAULT_ANALYTICS_PERIOD_KEY } from '../../shared/constants';
import { Sale, SaleOrOpportunityByCategory, SaleByState } from '../../types/analytics';

import './analytics-dashboard.scss';

const calculateTotal = (data: (SaleOrOpportunityByCategory & Sale)[]) => {
  return data.reduce((acc, item) => acc + (item.value || item.total), 0);
};

export const AnalyticsDashboard = () => {
  const [tabIndex, setTabIndex] = useState(ANALYTICS_PERIODS[DEFAULT_ANALYTICS_PERIOD_KEY].index);
  const [dateRange, setDateRange] = useState(ANALYTICS_PERIODS[DEFAULT_ANALYTICS_PERIOD_KEY].period.split('/'));
  const [opportunities, setOpportunities] = useState<SaleOrOpportunityByCategory[]>([]);
  const [salesByCategory, setSalesByCategory] = useState<SaleOrOpportunityByCategory[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [salesByState, setSalesByState] = useState<SaleByState[]>([]);
  const [salesTotal, setSalesTotal] = useState(0);
  const [opportunitiesTotal, setOpportunitiesTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
    ])
      .then(() => setIsLoading(false))
      .catch((error) => console.log(error));
  }, [dateRange]);

  const onTabClick = useCallback((e: { itemData: string }) => {
    const { index, period } = ANALYTICS_PERIODS[e.itemData];
    setTabIndex(index);
    setDateRange(period.split('/'));
    setIsLoading(true);
  }, []);

  return (
    <>
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
      <LoadPanel container='.view-wrapper-dashboard' visible={isLoading} position={{ of: '.layout-body' }} />
    </>
  );
};
