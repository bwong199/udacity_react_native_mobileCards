import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AddDeckScreen from '../screens/AddDeckScreen';
import AddDeck from '../screens/AddDeck';

import Decks from '../screens/Decks';

const DecksStack = createStackNavigator({
  Decks: Decks,
});

DecksStack.navigationOptions = {
  tabBarLabel: 'Decks',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-albums`
          : 'md-albums'
      }
      
    />
  ),
};


const AddDeckStack = createStackNavigator({
  AddDeck: AddDeck,
});

AddDeckStack.navigationOptions = {
  tabBarLabel: 'Add Deck',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-add-circle${focused ? '' : '-outline'}`
          : 'md-add-circle'
      }    />
  ),
};

export default createBottomTabNavigator({
  DecksStack,
  AddDeckStack,
});
