import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ListView,
  AsyncStorage,
  TouchableWithoutFeedback
  , Alert, Platform, Button
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { createDeck, deckNameChanged, getDecks, resetCreated } from '../actions'
import { connect } from 'react-redux';
import CardSection from '../components/CardSection';
import { Actions } from 'react-native-router-flux';
import CardDetails from './CardDetails';
import { Constants, Notifications, Permissions } from 'expo';


async function getiOSNotificationPermission() {
  const { status } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  if (status !== 'granted') {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
}

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }


  componentDidMount() {

  }

  componentWillMount() {
    this.props.getDecks();
    //  AsyncStorage.removeItem('decks');
    AsyncStorage.getItem('decks').then((res) => {
      var arr = JSON.parse(res)
      const ds = this.state.dataSource.cloneWithRows(arr);

      this.setState({ dataSource: ds.cloneWithRows(arr) })
    })
  }

  componentWillUpdate() {
    AsyncStorage.getItem('decks').then((res) => {
      var arr = JSON.parse(res)
      const ds = this.state.dataSource.cloneWithRows(arr);
      this.setState({ dataSource: ds })
    })
  }


  onRowPress(deck) {
    console.log('responsive');
    // Actions.cardDetailsMain({ deck });
    this.props.navigation.navigate('CardDetails', { deck })

  }



  render() {
    return (

      <View style={styles.container}>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <ListView
            // removeClippedSubviews={false}
            style={styles.container}
            dataSource={this.state.dataSource}
            renderRow={(data) =>
              <TouchableWithoutFeedback onPress={(event) => this.onRowPress(data)}>
                <View style={styles.containerStyle}>
                  <Text>{data.name}</Text>

                  <Text>{"\n"}{"\n"}{data.questions.length} cards</Text>

                </View>
              </TouchableWithoutFeedback>
            }
          />
        </ScrollView>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20
  },
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
});

// export default HomeScreen;

const mapStateToProps = (state) => {
  const { deckName, decks, created } = state.decks

  return {
    decks,
    created
  };
};

export default connect(mapStateToProps, { getDecks, resetCreated })(HomeScreen);