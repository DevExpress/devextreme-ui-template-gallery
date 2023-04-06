import React from 'react';

import List from 'devextreme-react/list';
import { CardMenu } from '../card-menu/CardMenu';

import { formatDate } from 'devextreme/localization';

import classNames from 'classnames';

import { Activities, Activity } from '../../../types/card-activities';
import { withLoadPanel } from '../../../utils/withLoadPanel';

import './CardActivities.scss';

const activityMenuItems = [
  { text: 'View details' },
  { text: 'Delete' },
];

const listItemRender = (item: Activity) => {
  return (
    <div className='activity'>
      <div className='name'>{item.name}</div>
      <div className='date by'>
        <span>{formatDate(new Date(item.date), 'MM/dd/yyyy')}</span>
        <span className='by-span'>by</span>
        <span>{item.manager}</span>
      </div>
      <CardMenu items={activityMenuItems} />
    </div>
  );
};

const ActivitiesList = ({ activities }) => {
  return (
    <List className='activities-list' dataSource={activities} scrollingEnabled={false} itemRender={listItemRender} />
  );
};

const ActivitiesWithLoadPanel = withLoadPanel(ActivitiesList);

export const CardActivities = ({ activities, isLoading }: { activities?: Activities, isLoading?: boolean }) => (
  <div className={classNames({ 'card-activities': true, load: !activities })}>
    <ActivitiesWithLoadPanel
      activities={activities}
      hasData={!!activities}
      loading={isLoading}
      panelProps={{
        container: '.card-activities',
        position: { of: '.card-activities' }
      }}
    />
  </div>
);
