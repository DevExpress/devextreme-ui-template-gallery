import React from 'react';

export const createDefaultValidatorExtender = (bypassRef: React.RefObject<boolean>) => (e) => {
  const defaultAdapter = e.component.option('adapter');
  const newAdapter = {
    ...defaultAdapter,
    applyValidationResults: defaultAdapter.applyValidationResults,
    getValue: defaultAdapter.getValue,
    bypass: () => {
      return bypassRef.current;
    }
  };
  e.component.option('adapter', newAdapter);
};
