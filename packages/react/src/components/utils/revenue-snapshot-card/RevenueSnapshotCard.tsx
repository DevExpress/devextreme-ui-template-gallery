import React from 'react';
import PieChart, { Font, Label, Legend, Margin, Series, Size } from 'devextreme-react/pie-chart';
import { CardAnalytics } from '../../library/card-analytics/CardAnalytics';
import { SaleOrOpportunityByCategory } from '../../../types/analytics';

export const RevenueSnapshotCard = ({ datasource }: { datasource: SaleOrOpportunityByCategory[] }) => (
  <CardAnalytics title='Revenue Snapshot (All Products)' contentClass='sales-by-category'>
    <PieChart dataSource={datasource} type='doughnut' diameter={0.8} innerRadius={0.6}>
      <Series argumentField='name' valueField='value'>
        <Label backgroundColor='none' radialOffset={-20} visible customizeText={(pointInfo) => pointInfo['percentText']}>
          <Font color='#757575' size={15} />
        </Label>
      </Series>
      <Legend>
        <Margin top={70} />
      </Legend>
      <Size height={270} />
    </PieChart>
  </CardAnalytics>
);
