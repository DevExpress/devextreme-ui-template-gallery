import React from 'react';
import LoadPanel from 'devextreme-react/load-panel';

interface WithLoadProps {
    data: unknown;
}

export const withLoadPanel = <T extends WithLoadProps>(WrappedComponent: React.ComponentType<T>) => {
  return ({ panelProps, ...props }): JSX.Element => {
    return props.data ? (
      <WrappedComponent {...props as T} />
    ) : (
      <LoadPanel visible {...panelProps} />
    );
  };
};
