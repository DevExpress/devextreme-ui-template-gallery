import React, { useState, createContext, useContext, useEffect } from 'react';

interface INavigationData {
  currentPath: string;
}

type INavigationContextType = {
  setNavigationData?: ({ currentPath }: INavigationData) => void;
  navigationData: { currentPath: string };
}

const NavigationContext = createContext<INavigationContextType>({} as INavigationContextType);
const useNavigation = () => useContext(NavigationContext);

type NavigationProviderType = {
  children: React.ReactNode;
}

function NavigationProvider(props: NavigationProviderType) {
  const [navigationData, setNavigationData] = useState({ currentPath: '' });

  return (
    <NavigationContext.Provider
      value={{ navigationData, setNavigationData }}
      {...props}
    />
  );
}

function withNavigationWatcher<T>(Component: React.ComponentType<T>) {
  return function (props: any) {
    const { path } = props.match;
    const { setNavigationData } = useNavigation();

    useEffect(() => {
      setNavigationData && setNavigationData({ currentPath: path });
    }, [path, setNavigationData]);

    return React.createElement(Component, props);
  }
}

export {
  NavigationProvider,
  useNavigation,
  withNavigationWatcher
}
