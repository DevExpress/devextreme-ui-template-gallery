import React, { useCallback, useEffect, useState } from 'react';

import { Item } from 'devextreme-react/toolbar';
import Tabs from 'devextreme-react/tabs';
import { LoadPanel } from 'devextreme-react/load-panel';
import ScrollView from 'devextreme-react/scroll-view';

import { useScreenSize } from '../../utils/media-query';

import { getOpportunitiesByCategory, getSalesByCategory, getSales, getSalesByStateAndCity, calcSalesByState } from 'dx-template-gallery-data';

import {
  ToolbarAnalytics,
  RevenueSnapshotCard,
  RevenueAnalysisCard,
  ConversionCard,
  RevenueCard,
  ConversionTicker,
  LeadsTicker,
  OpportunitiesTicker,
  RevenueTotalTicker
} from '../../components';
import { ANALYTICS_PERIODS, DEFAULT_ANALYTICS_PERIOD_KEY } from '../../shared/constants';
import { Sale, SaleOrOpportunityByCategory, SaleByState } from '../../types/analytics';

import './analytics-dashboard.scss';

const calculateTotal = (data: (SaleOrOpportunityByCategory & Sale)[]) => {
  return data.reduce((acc, item) => acc + (item.value || item.total), 0);
};

const items = Object.keys(ANALYTICS_PERIODS);

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
  const [tabsWidth, setTabsWidth] = useState<number | string>('auto');

  const { isXSmall } = useScreenSize();

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

  const onTabClick = useCallback((e) => {
    const { index, period } = ANALYTICS_PERIODS[e.addedItems[0]];
    setTabIndex(index);
    setDateRange(period.split('/'));
    setIsLoading(true);
  }, []);

  useEffect(() => {
    setTabsWidth(isXSmall ? 150 : 'auto');
  }, []);

  return (
    <ScrollView className='view-wrapper-scroll'>
      <ToolbarAnalytics
        title='Dashboard'
        additionalToolbarContent={
          <Item
            location='before'
          >
            <Tabs
              width={tabsWidth}
              scrollByContent
              showNavButtons={false}
              dataSource={items}
              selectedIndex={tabIndex}
              onSelectionChanged={onTabClick}
            />
          </Item>
        }
      >
        <div className='cards compact'>
          <OpportunitiesTicker value={opportunitiesTotal} />
          <RevenueTotalTicker value={salesTotal} />
          <ConversionTicker value={16} />
          <LeadsTicker value={51} />
        </div>
        <div className='cards normal'>
          <RevenueCard datasource={sales} />
          <ConversionCard datasource={opportunities} />
          <RevenueAnalysisCard datasource={salesByState} />
          <RevenueSnapshotCard datasource={salesByCategory} />
        </div>
      </ToolbarAnalytics>
      <LoadPanel container='.content' visible={isLoading} position={{ of: '.layout-body' }} />
    </ScrollView>
  );
};
