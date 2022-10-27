import React from 'react';

type DashboardCardsGroupProps = {
  kind?: 'normal' | 'compact' | 'wide';
};

export const DashboardCardsGroup = ({ children, kind = 'normal' }: React.PropsWithChildren<DashboardCardsGroupProps>) => (
  <div className={`cards ${kind}`}>
    {React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement<DashboardCardsGroupProps>(child as React.ReactElement<DashboardCardsGroupProps>, { kind });
      }
    })}
  </div>
);
