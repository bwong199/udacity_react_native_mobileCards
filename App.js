import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Alert } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import Router from './Router';
import ReduxThunk from 'redux-thunk'
import { Constants, Notifications, Permissions } from 'expo';
import { AsyncStorage } from "react-native"


async function getiOSNotificationPermission() {
  const { status } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  if (status !== 'granted') {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
}

export default class App extends React.Component {

  listenForNotifications = () => {
    Notifications.addListener(notification => {
      if (notification.origin === 'received' && Platform.OS === 'ios') {
        Alert.alert(notification.title, notification.body);
      }
    });
  };

  componentWillMount() {
    getiOSNotificationPermission();
    this.listenForNotifications();
  }

  componentDidMount() {
    const localnotification = {
      title: 'Quiz reminder',
      body: 'This is a reminder that you have not done a quiz ',
      android: {
        sound: true,
      },
      ios: {
        sound: true,
      },
    };

    // get last quiz time
    AsyncStorage.getItem('lastQuizTime').then((lastTime) => {

      var lastTimeMiliseconds = lastTime.getItem();

      var currentMiliseconds = Date.now();

      const diffInHour = (currentMiliseconds - lastTimeMiliseconds) / 60 / 60

      // send notification if more than 24 hours
      if (diffInHour > 24) {
        let sendAfterOneSecond = Date.now();
        sendAfterOneSecond += 1000;

        const schedulingOptions = { time: sendAfterOneSecond };
        Notifications.scheduleLocalNotificationAsync(
          localnotification,
          schedulingOptions
        );
      }
    })
  }

  render() {
    console.disableYellowBox = true;

    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

    return (

      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
