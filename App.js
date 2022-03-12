import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
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
  );
}