import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AddDeckScreen from '../screens/AddDeckScreen';
import AddDeck from '../screens/AddDeck';
import CardDetails from '../screens/CardDetails';
import Quiz from '../screens/Quiz';
import AddCardScreen from '../screens/AddCardScreen';

import Decks from '../screens/Decks';

const DecksStack = createStackNavigator({
  HomeScreen: HomeScreen,
  CardDetails: CardDetails,
  Quiz: Quiz,
  AddCardScreen: AddCardScreen
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
  AddDeck: AddDeckScreen,
  CardDetails: CardDetails,
  Quiz: Quiz,
  AddCardScreen: AddCardScreen
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
  AddDeckStack,
  DecksStack
});
