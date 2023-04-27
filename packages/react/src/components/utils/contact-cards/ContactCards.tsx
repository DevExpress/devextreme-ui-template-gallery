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
  messagesCount,
  messages,
  onMessagesCountChanged
}) => {
  return (
    <div className='dx-card details-card'>
      <TabPanel showNavButtons deferRendering={false}>
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
        <TabPanelItem title='Messages' badge={messagesCount}>
          <CardMessages items={messages} user={name} onMessagesCountChanged={onMessagesCountChanged} />
        </TabPanelItem>
      </TabPanel>
    </div>
  );
};
