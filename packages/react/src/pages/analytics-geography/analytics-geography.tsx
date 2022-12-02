import React, { useState, useEffect, useCallback } from 'react';

import { Dashboard, RevenueByStatesCard, RevenueAnalysisByStatesCard, RevenueSnapshotByStatesCard } from '../../components';
import { DashboardCardsGroup } from '../../components/dashboard/DashboardCardGroup';
import { SaleByStateAndCity, SaleByState } from '../../types/analytics';

import { getSalesByStateAndCity, calcSalesByState } from 'dx-template-gallery-data';
import {
  ANALYTICS_PERIODS,
  DEFAULT_ANALYTICS_PERIOD_KEY,
} from '../../shared/constants';

import { Item } from 'devextreme-react/toolbar';
import * as mapsData from 'devextreme/dist/js/vectormap-data/usa.js';
import LoadPanel from 'devextreme-react/load-panel';

const createMapCoords = (coords: string) => coords.split(', ').map(parseFloat);

const getSalesByStateMarkers = (salesByState) => ({
  type: 'StateCollection',
  features: salesByState.map((item) => ({
    type: 'State',
    geometry: {
      type: 'Point',
      coordinates: createMapCoords(item.stateCoords),
    },
    properties: {
      text: item.stateName,
      value: item.total,
      tooltip: `<b>${item.stateName}</b>\n${item.total}K`,
    },
  })),
});

export const AnalyticsGeography = () => {
  const [tabIndex, setTabIndex] = useState(
    ANALYTICS_PERIODS[DEFAULT_ANALYTICS_PERIOD_KEY].index
  );
  const [dateRange, setDateRange] = useState(
    ANALYTICS_PERIODS[DEFAULT_ANALYTICS_PERIOD_KEY].period.split('/')
  );
  const [salesByStateAndCity, setSalesByStateAndCity] = useState<SaleByStateAndCity[]>([]);
  const [salesByState, setSalesByState] = useState<SaleByState[]>([]);
  const [salesByStateMarkers, setSalesByStateMarkers] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSalesByStateAndCity(...dateRange).then((data) => {
      const salesByStateResult = calcSalesByState(data);

      setSalesByStateAndCity(data);
      setSalesByState(salesByStateResult);
      setSalesByStateMarkers(getSalesByStateMarkers(salesByStateResult));
      setIsLoading(false);
    });
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
        title='Geography'
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
        <DashboardCardsGroup kind='wide'>
          <RevenueByStatesCard
            datasource={salesByStateMarkers}
            mapsData={mapsData}
          />
        </DashboardCardsGroup>
        <DashboardCardsGroup>
          <RevenueAnalysisByStatesCard datasource={salesByStateAndCity} />
          <RevenueSnapshotByStatesCard datasource={salesByState} />
        </DashboardCardsGroup>
      </Dashboard>
      <LoadPanel container='.view-wrapper-dashboard' visible={isLoading} position={{ of: '.layout-body' }} />
    </>
  );
};
