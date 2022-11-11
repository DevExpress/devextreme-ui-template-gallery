import React from 'react';

import Toolbar, { Item as ToolbarItem } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';

import './ToolbarDetails.scss';

export const ToolbarDetails = ({ name, children }: { name?: string, children: JSX.Element[] }) => {
  return (
    <Toolbar className='toolbar-details'>
      <ToolbarItem location='before'>
        <Button icon='arrowleft'></Button>
      </ToolbarItem>
      <ToolbarItem location='before' text={ name ?? 'Loading...' }></ToolbarItem>
      {children}
    </Toolbar>
  );
};
