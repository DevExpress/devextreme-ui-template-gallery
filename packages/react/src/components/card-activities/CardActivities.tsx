import React from 'react';

import List from 'devextreme-react/list';
import Menu from 'devextreme-react/menu';

import { formatDate } from 'devextreme/localization';

import classNames from 'classnames';

import { Activities, Activity } from '../../shared/types/card-activities';
import { withLoadPanel } from '../../shared/utils/withLoadPanel';

import './CardActivities.scss';

const activityMenuItems = [{
  icon: 'overflow',
  items: [
    { text: 'View details' },
    { text: 'Delete' },
  ],
}];

const renderListItem = (item: Activity) => {
  return (
    <div className='activity'>
      <div className='name'>{item.name}</div>
      <div className='date by'>
        <span>{formatDate(new Date(item.date), 'MM/dd/yyyy')}</span>
        <span>by</span>
        <span>{item.manager}</span>
      </div>
      <Menu className='overflow-menu' items={activityMenuItems}></Menu>
    </div>
  );
};

const ActivitiesList = ({ activities }) => {
  return (
    <List className='activities-list' dataSource={activities} scrollingEnabled={false} itemRender={renderListItem} />
  );
};

const ActivitiesWithLoadPanel = withLoadPanel(ActivitiesList);

export const CardActivities = ({ activities }: { activities: Activities | undefined }) => (
  <div className={classNames({ 'card-activities': true, load: !activities })}>
    <ActivitiesWithLoadPanel
      activities={activities}
      loading={!activities}
      panelProps={{
        container: '.card-activities',
        position: { of: '.card-activities' }
      }}
    />
  </div>
);
