import React from 'react';
import LoadPanel from 'devextreme-react/load-panel';

type WithLoadProps = {
    loading?: boolean;
    hasData: boolean;
    panelProps: { container: string; position: { of: string } };
}

export const withLoadPanel = <T extends object>(WrappedComponent: React.ComponentType<T>) => {
  return ({ panelProps, loading = false, hasData, ...props }: WithLoadProps & Partial<T>): React.ReactElement => {
    if(!hasData) {
      return <LoadPanel showPane={false} visible {...panelProps} />;
    } else {
      return (
        <>
          {loading && <LoadPanel showPane={false} visible {...panelProps} />}
          <WrappedComponent {...(props as T)} />
        </>
      );
    }
  };
};
