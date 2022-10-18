import React from 'react';

import { HashRouter as Router } from 'react-router-dom';

import LoadPanel from 'devextreme-react/load-panel';

import { NavigationProvider } from './contexts/navigation';
import { AuthProvider, useAuth } from './contexts/auth';
import { useScreenSizeClass } from './utils/media-query';
import { Content } from './Content';
import { UnauthenticatedContent } from './UnauthenticatedContent';

import 'devextreme/scss/bundles/dx.material.blue.light.compact.scss';
import 'devexpress-gantt/dist/dx-gantt.css';
import './dx-styles.scss';

function RootApp() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadPanel visible />;
  }

  if (user) {
    return <Content />;
  }

  return <UnauthenticatedContent />;
}

export const App = () => {
  const screenSizeClass = useScreenSizeClass();

  return (
    <Router>
      <AuthProvider>
        <NavigationProvider>
          <div className={`app ${screenSizeClass}`}>
            <RootApp />
          </div>
        </NavigationProvider>
      </AuthProvider>
    </Router>
  );
};
