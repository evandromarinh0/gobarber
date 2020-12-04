import React from 'react';
import { View, StatusBar } from 'react-native';


const App: React.FC = () => {
  return(
    <>
      <View style={{ backgroundColor: '#312e38', flex: 1 }}>
      </View>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
    </>
  );
}

export default App;