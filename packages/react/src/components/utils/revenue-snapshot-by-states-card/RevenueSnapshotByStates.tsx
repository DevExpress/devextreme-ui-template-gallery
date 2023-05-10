import React from 'react';
import PieChart, {
  Font,
  Label,
  Legend,
  Margin,
  Series,
  Size,
} from 'devextreme-react/pie-chart';
import { CardAnalytics } from '../../library/card-analytics/CardAnalytics';
import { SaleByState } from '../../../types/analytics';
export const RevenueSnapshotByStatesCard = ({ datasource }: { datasource: SaleByState[] }) => (
  <CardAnalytics
    title='Revenue Snapshot by States'
    contentClass='sales-by-state'
  >
    <PieChart
      id='pie'
      dataSource={datasource}
      type='doughnut'
      diameter={0.8}
      innerRadius={0.6}
    >
      <Series argumentField='stateName' valueField='total'>
        <Label
          backgroundColor='none'
          radialOffset={-20}
          visible
          customizeText={(pointInfo) => pointInfo['percentText']}
        >
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
