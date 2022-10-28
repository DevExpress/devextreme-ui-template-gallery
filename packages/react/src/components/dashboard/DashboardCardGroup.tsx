import React from 'react';

export type DashboardCardKinds = 'normal' | 'compact' | 'wide';

export type DashboardCardsGroupProps = {
  kind?: DashboardCardKinds;
};

export const DashboardCardsGroup = ({ children, kind = 'normal' }: React.PropsWithChildren<DashboardCardsGroupProps>) => <div className={`cards ${kind}`}>{children}</div>;
