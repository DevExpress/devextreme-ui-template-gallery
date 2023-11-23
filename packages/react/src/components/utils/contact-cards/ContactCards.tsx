import React from 'react';
import TabPanel, { Item as TabPanelItem } from 'devextreme-react/tab-panel';

import {
  CardActivities,
  CardNotes,
  CardMessages,
  CardTasks,
  CardOpportunities
} from '../..';

export const ContactCards = ({
  isLoading,
  tasks,
  activities,
  name,
  activeOpportunities,
  closedOpportunities,
  notes,
  messages,
}) => {
  return (
    <div className='dx-card details-card'>
      <TabPanel
        showNavButtons
        focusStateEnabled={false}
        deferRendering={false}
      >
        <TabPanelItem title='Tasks'>
          <CardTasks
            isLoading={isLoading}
            tasks={tasks}
          />
        </TabPanelItem>
        <TabPanelItem title='Activities'>
          <CardActivities activities={activities} isLoading={isLoading} />
        </TabPanelItem>
        <TabPanelItem title='Opportunities'>
          <CardOpportunities
            active={activeOpportunities}
            closed={closedOpportunities}
          />
        </TabPanelItem>
        <TabPanelItem title='Notes'>
          <CardNotes items={notes} user={name} />
        </TabPanelItem>
        <TabPanelItem title='Messages'>
          <CardMessages items={messages} user={name} />
        </TabPanelItem>
      </TabPanel>
    </div>
  );
};
