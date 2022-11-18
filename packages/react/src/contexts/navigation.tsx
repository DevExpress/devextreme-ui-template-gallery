import React, { useState, createContext, useContext, useEffect } from 'react';
import type { NavigationContextType } from '../types';

const NavigationContext = createContext<NavigationContextType>({} as NavigationContextType);
const useNavigation = () => useContext(NavigationContext);

function NavigationProvider(props: React.PropsWithChildren<unknown>) {
  const [navigationData, setNavigationData] = useState({ currentPath: '' });

  return <NavigationContext.Provider value={{ navigationData, setNavigationData }} {...props} />;
}

function withNavigationWatcher(Component: React.ElementType, path: string) {
  const WrappedComponent = function(props: Record<string, unknown>) {
    const { setNavigationData } = useNavigation();

    useEffect(
      () => {
        setNavigationData?.({ currentPath: path });
      },
      [path, setNavigationData]
    );

    return <Component {...props} />;
  };
  return <WrappedComponent />;
}

export { NavigationProvider, useNavigation, withNavigationWatcher };
