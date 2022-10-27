import React, { ReactNode } from 'react';
import LoadPanel from 'devextreme-react/load-panel';
import Menu from 'devextreme-react/menu';
import { PositionConfig } from 'devextreme/animation/position';
import './CardAnalytics.scss';

type CardProps = {
  title?: string;
  additionalHeaderContent?: ReactNode;
  contentClass: string;
  isLoading?: boolean;
  compact?: boolean;
};

const menuItems = [
  {
    icon: 'overflow',
    items: [{ text: 'Hide' }],
  },
];

export const CardAnalytics = ({ isLoading = false, title, contentClass, children, compact = false, additionalHeaderContent }: React.PropsWithChildren<CardProps>) => {
  const calculateLoadPanelPosition = (): PositionConfig => ({
    of: `.${contentClass + (compact ? ' .title' : ' .content')}`,
    at: compact ? 'right' : 'center',
  });

  return (
    <div className={`card ${contentClass}`}>
      <Menu visible className='overflow-menu' items={menuItems} />
      <div className='title'>{title}</div>
      {additionalHeaderContent}
      <div className='content'>{children}</div>
      <LoadPanel container={`.${contentClass}`} position={calculateLoadPanelPosition()} visible={isLoading} showPane={false} width='100%' height={compact ? 50 : 60} maxWidth='100%' />
    </div>
  );
};
