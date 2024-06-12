import React from 'react';
import CameraScreen from '../screens/CameraScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import MultiStoryScreen from '../screens/MultiStoryScreen';
import SingleStoryScreen from '../screens/SingleStoryScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type RootStackParamList = {
  CameraScreen: undefined;
  DiscoverScreen: undefined;
  MultiStoryScreen: undefined;
  SingleStoryScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen
          name="DiscoverScreen"
          component={DiscoverScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen name="MultiStoryScreen" component={MultiStoryScreen} />
        <Stack.Screen name="SingleStoryScreen" component={SingleStoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
