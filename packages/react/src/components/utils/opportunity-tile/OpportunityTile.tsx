import React from 'react';

import notify from 'devextreme/ui/notify';
import { formatNumber } from 'devextreme/localization';

import './OpportunityTile.scss';

export const OpportunityTile = ({ name, products, total, manager }) => {
  const opportunityClick = () => {
    notify('Click opportunity event');
  };

  const format = (item: number) => {
    return formatNumber(item, { type: 'currency', precision: 2 });
  };

  return (
    <div className='opportunities'>
      <div onClick={opportunityClick} className='opportunity'>
        <div className='name'>{name}</div>
        <div className='product-info'>
          Products: {products}, total: <span className='total'>{format(total)}</span>
        </div>
        <div className='owner'>
          Owner: <span className='owner-name'>{manager}</span>
        </div>
      </div>
    </div>
  );
};
