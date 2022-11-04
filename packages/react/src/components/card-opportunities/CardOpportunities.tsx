import React from 'react';

import Button from 'devextreme-react/button';
import notify from 'devextreme/ui/notify';
import { formatNumber } from 'devextreme/localization';

import { Opportunities } from '../../shared/types/card-opportunities';

import { withLoadPanel } from '../../shared/utils/withLoadPanel';

import './CardOpportunities.scss';

const addOpportunity = () => {
  notify('Add opportunity event');
};
const format = (item: number) => {
  return formatNumber(item, { type: 'currency', precision: 2 });
};

const CardTemplate = ({ items, title }: { items: Opportunities, title: string}) => (
  <div className='opportunities-block'>
    <div className='dx-form-group-caption'>{title}</div>
    <div className='opportunities-container'>
      {items.map((item) => (
        <div key={item.name} className='opportunities'>
          <div className='opportunity'>
            <div className='name'>{item.name}</div>
            <div className='product-info'>
              Products: {item.products}, total: <span className='total'>{format(item.total)}</span>
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

const Cards = ({ active, closed }: { active: Opportunities, closed: Opportunities }) => (
  <>
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

    <CardTemplate title='Active' items={active} />
    <CardTemplate title='Closed' items={closed} />
  </>
);

const CardsWithLoadPanel = withLoadPanel(Cards);

export const CardOpportunities = ({ active, closed }: { active?: Opportunities, closed?: Opportunities }) => {
  return (
    <div className='card-opportunies'>
      <CardsWithLoadPanel
        active={active}
        closed={closed}
        loading={!active || !closed}
        panelProps={{
          container: '.card-opportunies',
          position: { of: '.card-opportunies' }
        }}
      />
    </div>
  );
};
