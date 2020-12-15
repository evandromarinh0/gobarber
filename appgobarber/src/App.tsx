import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StatusBar } from 'react-native';

import { AuthProvider } from './hooks/AuthContext';

import Routes from './routes/auth.routes';

const App: React.FC = () => {
  return(
    <NavigationContainer>
      <AuthProvider>
        <View style={{ backgroundColor: '#312e38', flex: 1 }}>
          <Routes />
        </View>
      </AuthProvider>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
    </NavigationContainer>
  );
}

export default App;