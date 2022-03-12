import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { CardStyleInterpolators } from '@react-navigation/stack';

console.disableYellowBox=true;

import Home from './src/pages/Home';
import Cadastro from './src/pages/Cadastro';
import Login from './src/pages/Login';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        
        <Stack.Screen
        name="Cadastro"
        component={Cadastro}
        />
        
        <Stack.Screen
        name="Login"
        component={Login}
        />
        
        <Stack.Screen
        name="Home"
        component={Home}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;