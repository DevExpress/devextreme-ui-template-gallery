import React from 'react';
import Funnel, { Format, Label, Legend, Margin, Size } from 'devextreme-react/funnel';
import { CardAnalytics } from '../../library/card-analytics/CardAnalytics';
import { SaleOrOpportunityByCategory } from '../../../types/analytics';

export const ConversionCard = ({ datasource }: { datasource: SaleOrOpportunityByCategory[] }) => (
  <CardAnalytics title='Conversion Funnel (All Products)' contentClass='conversion-funnel'>
    <Funnel dataSource={datasource} argumentField='name' valueField='value'>
      <Label visible position='inside' backgroundColor='none' customizeText={({ valueText }) => `$${valueText}`}>
        <Format type='largeNumber' precision={1} />
      </Label>
      <Legend visible>
        <Margin top={70} />
      </Legend>
      <Size height={270} />
    </Funnel>
  </CardAnalytics>
);
