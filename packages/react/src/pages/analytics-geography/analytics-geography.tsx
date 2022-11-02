import React, { useState, useEffect, useCallback } from 'react';
import { Dashboard } from '../../components/dashboard/Dashboard';
import { DashboardCardsGroup } from '../../components/dashboard/DashboardCardGroup';
import { getSalesByStateAndCity, getSalesByState } from 'dx-rwa-data';
import {
  ANALYTICS_PERIODS,
  DEFAULT_ANALYTICS_PERIOD_KEY,
} from '../../shared/constants';
import { Item } from 'devextreme-react/toolbar';
import * as mapsData from 'devextreme/dist/js/vectormap-data/usa.js';
import { RevenueByStatesCard } from './cards/RevenueByStatesCard';
import { RevenueAnalysisByStatesCard } from './cards/RevenueAnalysisByStatesCard';
import { RevenueSnapshotByStatesCard } from './cards/RevenueSnapshotByStates';

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
  const [salesByStateAndCity, setSalesByStateAndCity] = useState([]);
  const [salesByState, setSalesByState] = useState([]);
  const [salesByStateMarkers, setSalesByStateMarkers] = useState({});

  useEffect(() => {
    getSalesByStateAndCity(...dateRange).then((data) => {
      const salesByStateResult = getSalesByState(data);

      setSalesByStateAndCity(data);
      setSalesByState(salesByStateResult);
      setSalesByStateMarkers(getSalesByStateMarkers(salesByStateResult));
    });
  }, [dateRange]);

  const onTabClick = useCallback((e: { itemData: string }) => {
    const { index, period } = ANALYTICS_PERIODS[e.itemData];
    setTabIndex(index);
    setDateRange(period.split('/'));
  }, []);

  return (
    <Dashboard
      title='Geography'
      additionalToolbarContent={
        <Item
          location='before'
          widget='dxTabs'
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
  );
};
