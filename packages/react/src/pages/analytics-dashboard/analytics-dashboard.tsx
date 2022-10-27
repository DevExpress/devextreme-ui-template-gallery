import React, { useCallback, useEffect, useState } from 'react';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';
import { getOpportunitiesByCategory, getSalesByCategory, getSales, getSalesByStateAndCity, getSalesByState } from 'dx-rwa-data';
import './analytics-dashboard.scss';
import { RevenueSnapshotCard } from './cards/RevenueSnapshotCard';
import { RevenueAnalysisCard } from './cards/RevenueAnalysisCard';
import { ConversionFunnelCard } from './cards/ConversionFunnelCard';
import { RevenueCard } from './cards/RevenueCard';
import { ConversionTicker, LeadsTicker, OpportunitiesTicker, RevenueTotalTicker } from './cards/TickerCards';

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

type DashboardCardsGroupProps = { compact?: boolean };

const DashboardCardsGroup = ({ children, compact = false }: React.PropsWithChildren<DashboardCardsGroupProps>) => (
  <div className={`cards${compact ? ' compact' : ''}`}>
    {React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { compact });
      }
    })}
  </div>
);

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
    <div className='view-wrapper-dashboard'>
      <Toolbar>
        <Item location='before'>
          <span className='toolbar-header'>Dashboard</span>
        </Item>
        <Item
          location='before'
          widget='dxTabs'
          options={{
            dataSource: Object.keys(tabItems),
            selectedIndex: tabIndex,
            onItemClick: onTabClick,
          }}
        />
        <Item location='after' locateInMenu='auto'>
          <Button className='add-card' icon='plus' text='Add Card' type='default' stylingMode='contained' />
        </Item>
        <Item
          location='after'
          locateInMenu='auto'
          widget='dxButton'
          showText='inMenu'
          options={{
            text: 'Refresh',
            icon: 'refresh',
          }}
        />
        <Item location='after' locateInMenu='auto'>
          <div className='separator'></div>
        </Item>
        <Item
          location='after'
          locateInMenu='auto'
          widget='dxButton'
          showText='inMenu'
          options={{
            icon: 'export',
            text: 'Export',
          }}
        />
      </Toolbar>
      <DashboardCardsGroup compact>
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
    </div>
  );
};
