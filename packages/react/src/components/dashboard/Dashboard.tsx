import React, { ReactNode } from 'react';
import Button from 'devextreme-react/button';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import './Dashboard.scss';

type DashboardContainerProps = {
  title: string;
  additionalToolbarContent?: ReactNode;
};

export const Dashboard = ({
  title,
  additionalToolbarContent,
  children,
}: React.PropsWithChildren<DashboardContainerProps>) => {
  return (
    <div className='view-wrapper view-wrapper-dashboard'>
      <Toolbar>
        <Item location='before'>
          <span className='toolbar-header'>{title}</span>
        </Item>
        {additionalToolbarContent}
        <Item location='after' locateInMenu='auto'>
          <Button
            className='add-card'
            icon='plus'
            text='Add Card'
            type='default'
            stylingMode='contained'
          />
        </Item>
        <Item
          location='after'
          locateInMenu='auto'
          widget='dxButton'
          showText='inMenu'
        >
          <Button
            text='Refresh'
            icon='refresh'
          />
        </Item>
        <Item location='after' locateInMenu='auto'>
          <div className='separator' />
        </Item>
        <Item
          location='after'
          locateInMenu='auto'
          widget='dxButton'
          showText='inMenu'

        >
          <Button
            icon='export'
            text='Export'
          />
        </Item>
      </Toolbar>
      {children}
    </div>
  );
};
