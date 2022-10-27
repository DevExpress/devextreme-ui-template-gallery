import React, { useCallback, useEffect, useState } from 'react';
import { Item } from 'devextreme-react/toolbar';
import { getOpportunitiesByCategory, getSalesByCategory, getSales, getSalesByStateAndCity, getSalesByState } from 'dx-rwa-data';
import './analytics-dashboard.scss';
import { RevenueSnapshotCard } from './cards/RevenueSnapshotCard';
import { RevenueAnalysisCard } from './cards/RevenueAnalysisCard';
import { ConversionFunnelCard } from './cards/ConversionFunnelCard';
import { RevenueCard } from './cards/RevenueCard';
import { ConversionTicker, LeadsTicker, OpportunitiesTicker, RevenueTotalTicker } from './cards/TickerCards';
import { DashboardContainer } from '../../components/dashboard-container/DashboardContainer';
import { DashboardCardsGroup } from '../../components/dashboard-container/DashboardCardGroup';

const tabItems = {
  Week: {
    period: '2020-01-24/2020-01-31',
    index: 0,
  },
  '2 Weeks': {
    period: '2020-01-14/2020-01-31',
    index: 1,
  },
  Month: {
    period: '2020-01-01/2020-02-01',
    index: 2,
  },
  Year: {
    period: '2020-01-01/2021-01-01',
    index: 3,
  },
  All: {
    period: '2018-01-01/2022-01-01',
    index: 4,
  },
};

const DEFAULT_TAB_KEY = 'All';

const calculateTotal = (data) => {
  if (!data) return;
  return data.reduce((total, item) => total + (item.value || item.total), 0);
};

export const AnalyticsDashboard = () => {
  const [tabIndex, setTabIndex] = useState(tabItems[DEFAULT_TAB_KEY].index);
  const [dateRange, setDateRange] = useState(tabItems[DEFAULT_TAB_KEY].period.split('/'));
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
        .then((data) => getSalesByState(data))
        .then((data) => setSalesByState(data)),
    ]).catch((error) => console.log(error));
  }, [dateRange]);

  const onTabClick = useCallback((e: { itemData: string }) => {
    const { index, period } = tabItems[e.itemData];
    setTabIndex(index);
    setDateRange(period.split('/'));
  }, []);

  return (
    <DashboardContainer
      additionalToolbarContent={
        <Item
          location='before'
          widget='dxTabs'
          options={{
            dataSource: Object.keys(tabItems),
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
    </DashboardContainer>
  );
};
