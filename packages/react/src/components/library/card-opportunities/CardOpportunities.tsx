import React from 'react';

import Button from 'devextreme-react/button';
import { OpportunityTile } from '../../utils/opportunity-tile/OpportunityTile';

import { Opportunities } from '../../../types/card-opportunities';

import { withLoadPanel } from '../../../utils/withLoadPanel';

import './CardOpportunities.scss';

const CardTemplate = ({ items, title }: { items: Opportunities, title: string}) => (
  <div className='opportunities-block'>
    <div className='dx-form-group-caption'>{title}</div>
    <div className='opportunities-container'>
      {items.map((item) => (
        <OpportunityTile
          key={item.name}
          name={item.name}
          products={item.products}
          total={item.total}
          manager={item.manager}
        />
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
    />

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
        hasData={!!(active && closed)}
        panelProps={{
          container: '.card-opportunies',
          position: { of: '.card-opportunies' }
        }}
      />
    </div>
  );
};
