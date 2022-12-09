import React from 'react';
import LoadPanel from 'devextreme-react/load-panel';

type WithLoadProps = {
    loading?: boolean;
    isData: boolean;
    panelProps: { container: string; position: { of: string } };
}

export const withLoadPanel = <T extends object>(WrappedComponent: React.ComponentType<T>) => {
  return ({ panelProps, loading = false, isData, ...props }: WithLoadProps & Partial<T>): React.ReactElement => {
    if(!isData) {
      return <LoadPanel visible {...panelProps} />;
    } else {
      return (
        <>
          {loading && <LoadPanel visible {...panelProps} />}
          <WrappedComponent {...(props as T)} />
        </>
      );
    }
  };
};
