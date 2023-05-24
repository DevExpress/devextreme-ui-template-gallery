
import React from 'react';
import Bullet, { Size, Tooltip } from 'devextreme-react/bullet';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import { CardAnalytics } from '../../library/card-analytics/CardAnalytics';
import { SaleByStateAndCity } from '../../../types/analytics';

import './RevenueAnalysisByStatesCard.scss';

export const RevenueAnalysisByStatesCard = ({ datasource }: { datasource: SaleByStateAndCity[] }) => (
  <CardAnalytics
    title='Revenue Analysis by States'
    contentClass='sales-by-state-and-city grid'
  >
    <DataGrid dataSource={datasource} height={290}>
      <Column caption='State' dataField='stateName' hidingPriority={2} />
      <Column caption='City' dataField='city' />
      <Column
        alignment='left'
        caption='Amount'
        dataField='total'
        dataType='number'
        format='currency'
        hidingPriority={1}
      />
      <Column
        alignment='left'
        caption='Percentage'
        dataField='percentage'
        cellRender={(cellInfo) => (
          <Bullet
            showTarget={false}
            showZeroLevel={false}
            value={cellInfo.data.percentage * 100}
            startScaleValue={0}
            endScaleValue={100}
          >
            <Tooltip enabled={false} />
            <Size width={200} height={20} />
          </Bullet>
        )}
        width={200}
      />
    </DataGrid>
  </CardAnalytics>
);
