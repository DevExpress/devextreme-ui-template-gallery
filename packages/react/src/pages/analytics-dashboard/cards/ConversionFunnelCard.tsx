import React from 'react';
import Funnel, { Format, Label, Legend, Margin, Size } from 'devextreme-react/funnel';
import { CardAnalytics } from '../../../components/card-analytics/CardAnalytics';

export const ConversionFunnelCard = ({ datasource }) => (
  <CardAnalytics title='Conversion Funnel (All Products)' contentClass='opportunities' isLoading={!datasource.length}>
    <Funnel dataSource={datasource} argumentField='name' valueField='value'>
      <Label visible position='inside' backgroundColor='none' customizeText={({ valueText }) => `$${valueText}`}>
        <Format type='largeNumber' precision='1' />
      </Label>
      <Legend visible>
        <Margin top={70} />
      </Legend>
      <Size height={270} />
    </Funnel>
  </CardAnalytics>
);
