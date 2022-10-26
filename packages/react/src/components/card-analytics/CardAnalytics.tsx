import LoadPanel from 'devextreme-react/load-panel';
import Menu from 'devextreme-react/menu';
import { PositionConfig } from 'devextreme/animation/position';
import React from 'react';
import './CardAnalytics.scss';

type CardProps = {
  title?: string;
  contentClass: string;
  isLoading?: boolean;
  compact?: boolean;
};

const menuItems: Array<{ icon: string; items: Array<{ text: string }> }> = [
  {
    icon: 'overflow',
    items: [{ text: 'Hide' }],
  },
];

export const CardAnalytics = ({ isLoading = false, title, contentClass, children, compact = false }: React.PropsWithChildren<CardProps>) => {
  const calculateLoadPanelPosition = (): PositionConfig => ({
    of: `.${contentClass + (compact ? ' .title' : ' .content')}`,
    at: compact ? 'right' : 'center',
  });

  return (
    <div className={`card ${contentClass}`}>
      <Menu visible={true} className='overflow-menu' items={menuItems} />
      <div className='title'>{title}</div>
      <div className='content'>{children}</div>
      <LoadPanel container={`.${contentClass}`} position={calculateLoadPanelPosition()} visible={isLoading} showPane={false} width='100%' height={compact ? 50 : 60} maxWidth='100%' />
    </div>
  );
};
