import React, { ReactNode, useMemo } from 'react';
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
  const ToolbarItemRefresh = useMemo(()=>({
    text: 'Refresh',
    icon: 'refresh',
  }), []);

  const ToolbarItemExport = useMemo(()=>({
    icon: 'export',
    text: 'Export',
  }), []);

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
          options={ToolbarItemRefresh}
        />
        <Item location='after' locateInMenu='auto'>
          <div className='separator' />
        </Item>
        <Item
          location='after'
          locateInMenu='auto'
          widget='dxButton'
          showText='inMenu'
          options={ToolbarItemExport}
        />
      </Toolbar>
      {children}
    </div>
  );
};
