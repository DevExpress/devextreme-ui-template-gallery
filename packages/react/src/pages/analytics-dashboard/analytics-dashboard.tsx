import Toolbar, { Item } from 'devextreme-react/toolbar';
import Bullet, { Size as BulletSize, Tooltip } from 'devextreme-react/bullet';
import Chart, { Series, CommonSeriesSettings, ArgumentAxis, ValueAxis, Legend, Size, Label, Format, Border } from 'devextreme-react/chart';
import Funnel, { Label as FunnelLabel, Format as FunnelFormat, Legend as FunnelLegend, Size as FunnelSize, Margin } from 'devextreme-react/funnel';
import PieChart, { Label as PielLabel, Legend as PieLegend, Size as PieSize, Series as PieSeries, Font, Margin as PieMargin } from 'devextreme-react/pie-chart';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import React, { useCallback, useEffect, useState } from 'react';
import { CardAnalytics } from '../../components/card-analytics/CardAnalytics';
import { getOpportunitiesByCategory, getSalesByCategory, getSales, getSalesByStateAndCity, getSalesByState } from 'dx-rwa-data';
import './analytics-dashboard.scss';

type PanelItem = { text: string; value: string; key: number };

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

const calculateTotal = (data: Array<any>) => {
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
    getOpportunitiesByCategory(...dateRange)
      .then((data) => {
        setOpportunities(data);
        setOpportunitiesTotal(calculateTotal(data));
      })
      .catch((error) => console.log(error));

    getSalesByCategory(...dateRange)
      .then((data) => setSalesByCategory(data))
      .catch((error) => console.log(error));

    getSales(...dateRange)
      .then((data) => {
        setSales(data);
        setSalesTotal(calculateTotal(data));
      })
      .catch((error) => console.log(error));

    getSalesByStateAndCity(...dateRange)
      .then((data) => getSalesByState(data))
      .then((data) => setSalesByState(data))
      .catch((error) => console.log(error));
  }, [dateRange]);

  const onTabClick = useCallback((e: { itemData: string }) => {
    const { index, period } = tabItems[e.itemData];
    setTabIndex(index);
    setDateRange(period.split('/'));
  }, []);

  return (
    <div className='view-wrapper'>
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
      </Toolbar>
      <div className='cards grey'>
        <CardAnalytics title='Opportunities'>
          <div className='total'>${opportunitiesTotal}</div>
          <div className='percentage'>
            <i className='dx-icon-spinup'></i>
            <span>20.3%</span>
          </div>
        </CardAnalytics>
        <CardAnalytics title='Revenue Total'>
          <div className='total'>${salesTotal}</div>
          <div className='percentage'>
            <i className='dx-icon-spinup'></i>
            <span>14.7%</span>
          </div>
        </CardAnalytics>
        <CardAnalytics title='Conversion'>
          <div className='total'>16%</div>
          <div className='percentage'>
            <i className='dx-icon-spindown'></i>
            <span>2.3%</span>
          </div>
        </CardAnalytics>
        <CardAnalytics title='Leads'>
          <div className='total'>51</div>
          <div className='percentage'>
            <i className='dx-icon-spinup'></i>
            <span>8.5%</span>
          </div>
        </CardAnalytics>
      </div>
      <div className='cards'>
        <CardAnalytics title='Revenue'>
          <Chart dataSource={sales}>
            <Series valueField='total' />
            <CommonSeriesSettings argumentField='date' type='splinearea'>
              <Border visible={true} />
            </CommonSeriesSettings>
            <ArgumentAxis argumentType='datetime' />
            <ValueAxis>
              <Label>
                <Format type='currency' currency='USD' />
              </Label>
            </ValueAxis>
            <Legend visible={false} />
            <Size height={270} />
          </Chart>
        </CardAnalytics>
        <CardAnalytics title='Conversion Funnel (All Products)'>
          <Funnel dataSource={opportunities} argumentField='name' valueField='value'>
            <FunnelLabel visible={true} position='inside' backgroundColor='none' customizeText={({ valueText }) => `$${valueText}`}>
              <FunnelFormat type='largeNumber' precision='1' />
            </FunnelLabel>
            <FunnelLegend visible={true}>
              <Margin top={70} />
            </FunnelLegend>
            <FunnelSize height={270} />
          </Funnel>
        </CardAnalytics>
        <CardAnalytics title='Revenue Analysis'>
          <DataGrid dataSource={salesByState} height={270}>
            <Column caption='State' dataField='stateName' />
            <Column alignment='left' caption='Sales' dataField='total' dataType='number' format='currency' sortOrder='desc' hidingPriority={2} />
            <Column alignment='left' caption='% Sold' dataField='percentage' name='percentN' format='percent' hidingPriority={1} />
            <Column
              alignment='left'
              caption='Percentage'
              dataField='percentage'
              name='percentB'
              cellRender={(cellInfo) => (
                <Bullet showTarget={false} showZeroLevel={false} value={cellInfo.data.percentage * 100} startScaleValue={0} endScaleValue={100}>
                  <Tooltip enabled={false} />
                  <Size width={200} height={20} />
                </Bullet>
              )}
              width={200}
            />
          </DataGrid>
        </CardAnalytics>
        <CardAnalytics title='Revenue Snapshot (All Products)'>
          <PieChart dataSource={salesByCategory} type='doughnut' diameter={0.8} innerRadius={0.6}>
            <PieSeries argumentField='name' valueField='value'>
              <PielLabel backgroundColor='none' radialOffset={-20} visible={true} customizeText={({ percentText }) => percentText}>
                <Font color='#757575' size={15} />
              </PielLabel>
            </PieSeries>
            <PieLegend>
              <PieMargin top={70} />
            </PieLegend>
            <PieSize height={270} />
          </PieChart>
        </CardAnalytics>
      </div>
    </div>
  );
};
