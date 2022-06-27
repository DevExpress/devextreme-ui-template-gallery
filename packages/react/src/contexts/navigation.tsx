import React, { useState, createContext, useContext, useEffect } from 'react';
import type { NavigationContextType } from '../types';

const NavigationContext = createContext<NavigationContextType>({} as NavigationContextType);
const useNavigation = () => useContext(NavigationContext);

function NavigationProvider(props: React.PropsWithChildren<unknown>) {
  const [navigationData, setNavigationData] = useState({ currentPath: '' });

  return (
    <NavigationContext.Provider
      value={{ navigationData, setNavigationData }}
      {...props}
    />
  );
}

function withNavigationWatcher(Component: React.ElementType, path: string) {
  const WrappedComponent = function (props: any) { //unknown check with Platforms
    const { setNavigationData } = useNavigation();

    useEffect(() => {
      setNavigationData!({ currentPath: path });
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [path, setNavigationData]);

    return <Component {...props} />;
  }
  return <WrappedComponent />;
}

export {
  NavigationProvider,
  useNavigation,
  withNavigationWatcher
}
