import React from 'react';

import Button from 'devextreme-react/button';
import notify from 'devextreme/ui/notify';
import { formatNumber } from 'devextreme/localization';

import './CardOpportunities.scss';

const addOpportunity = () => {
  notify('Add opportunity event');
};
const format = (item) => {
  return formatNumber(item, { type: 'currency', precision: 2 });
};

const CardsTemplate = ({ items, title }) => (
  <div className='opportunities-block'>
    <div className='dx-form-group-caption'>{title}</div>
    <div className='opportunities-container'>
      {items.map((item) => (
        <div key={item.name} className='opportunities'>
          <div className='opportunity'>
            <div className='name'>{item.name}</div>
            <div className='product-info'>
              Products: {item.products}, total: <span className='total'>{format(item)}</span>
            </div>
            <div className='owner'>
              Owner: <span className='owner-name'>{item.manager}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const CardOpportunities = ({ active, closed }) => {
  return (
    <div className='card-opportunies'>
      <Button
        text='Add Opportunity'
        icon='add'
        width={300}
        height={115}
        stylingMode='outlined'
        type='default'
        className='add-tile'
        onClick={addOpportunity}
      ></Button>

      <CardsTemplate title='Active' items={active} />
      <CardsTemplate title='Closed' items={closed} />
    </div>
  );
};
