import React, { ReactNode } from 'react';
import Button from 'devextreme-react/button';
import Toolbar, { Item } from 'devextreme-react/toolbar';

type DashboardContainerProps = {
  title: string;
  additionalToolbarContent?: ReactNode;
};

export const DashboardContainer = ({ title, additionalToolbarContent, children }: React.PropsWithChildren<DashboardContainerProps>) => {
  return (
    <div className='view-wrapper-dashboard'>
      <Toolbar>
        <Item location='before'>
          <span className='toolbar-header'>{title}</span>
        </Item>
        {additionalToolbarContent}
        <Item location='after' locateInMenu='auto'>
          <Button className='add-card' icon='plus' text='Add Card' type='default' stylingMode='contained' />
        </Item>
        <Item
          location='after'
          locateInMenu='auto'
          widget='dxButton'
          showText='inMenu'
          options={{
            text: 'Refresh',
            icon: 'refresh',
          }}
        />
        <Item location='after' locateInMenu='auto'>
          <div className='separator'></div>
        </Item>
        <Item
          location='after'
          locateInMenu='auto'
          widget='dxButton'
          showText='inMenu'
          options={{
            icon: 'export',
            text: 'Export',
          }}
        />
      </Toolbar>
      {children}
    </div>
  );
};
