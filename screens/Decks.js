import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableHighlight
} from 'react-native';
import { WebBrowser } from 'expo';
import ListView from '../components/ListView';
import { Scene, Router, ActionConst } from 'react-native-router-flux';

import { MonoText } from '../components/StyledText';
import HomeScreen from './HomeScreen';
import CardDetails from './CardDetails';
import AddCardScreen from './AddCardScreen';
import Quiz from './Quiz';

class TabIcon extends React.Component {
  render() {
    /** some styling **/
    return (
      <View style={viewStyle}>
        <Text style={textStyle}>{this.props.title}</Text>
      </View>
    );
  }
}

export default class Decks extends React.Component {

  componentWillUpdate() {
  }

  handleClick(){
  }

  render() {
    return (
      // <TouchableHighlight onPress={this.handleClick.bind(this)}>
        <View style={styles.container}
        >
          <Router>
            <Scene key="root">
              <Scene key='deckHome' title='Decks' component={HomeScreen} icon={TabIcon} initial />
              <Scene key='cardDetailsMain' title='Card Details' component={CardDetails} icon={TabIcon} />
              <Scene key='addCard' title='Add Card' component={AddCardScreen} icon={TabIcon} />
              <Scene key='quiz' title='Quiz' component={Quiz} icon={TabIcon} />
            </Scene>
          </Router>
        </View>
      // </TouchableHighlight>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
