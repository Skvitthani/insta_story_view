import React from 'react';
import MultiStoryScreen from '../screens/MultiStoryScreen';
import SingleStoryScreen from '../screens/SingleStoryScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type RootStackParamList = {
  MultiStoryScreen: undefined;
  SingleStoryScreen: undefined;
};

const Satck = createNativeStackNavigator<RootStackParamList>();

const SatckNavigation = () => {
  return (
    <NavigationContainer>
      <Satck.Navigator screenOptions={{headerShown: false}}>
        <Satck.Screen name="MultiStoryScreen" component={MultiStoryScreen} />
        <Satck.Screen name="SingleStoryScreen" component={SingleStoryScreen} />
      </Satck.Navigator>
    </NavigationContainer>
  );
};

export default SatckNavigation;
