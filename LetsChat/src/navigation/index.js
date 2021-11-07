import { InAppNotificationProvider } from '@chatkitty/react-native-in-app-notification';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { AuthProvider } from './AuthProvider';
import Routes from './Routes';

export default function Providers() {
  return (
    <PaperProvider>
      <AuthProvider>
        <InAppNotificationProvider>
          <Routes />
        </InAppNotificationProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
