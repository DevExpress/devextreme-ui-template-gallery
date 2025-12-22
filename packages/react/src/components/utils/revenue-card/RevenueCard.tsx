import React from 'react';
import Chart, { ArgumentAxis, Border, CommonSeriesSettings, Format, Label, Legend, Series, Size, ValueAxis } from 'devextreme-react/chart';
import { ChartsColor, registerGradient } from 'devextreme-react/common/charts';
import { CardAnalytics } from '../../library/card-analytics/CardAnalytics';
import { Sale } from '../../../types/analytics';

const seriesColor: ChartsColor = {
  base: '#115EA3',
  fillId: registerGradient('linear', {
    rotationAngle: 90,
    colors: [{
      offset: '20%',
      color: 'rgba(0, 74, 168, 0.75)',
    }, {
      offset: '90%',
      color: 'rgba(114, 179, 231, 0.35)',
    }],
  }),
};

export const RevenueCard = ({ datasource }: { datasource: Sale[] }) => (
  <CardAnalytics title='Revenue' contentClass='sales'>
    <Chart dataSource={datasource}>
      <Series valueField='total' />
      <CommonSeriesSettings argumentField='date' type='splinearea' color={seriesColor}>
        <Border visible />
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
);
