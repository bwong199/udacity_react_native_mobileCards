import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ListView,
  AsyncStorage,
  TouchableWithoutFeedback
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { createDeck, deckNameChanged, getDecks } from '../actions'
import { connect } from 'react-redux';
import CardSection from '../components/CardSection';
import { Actions } from 'react-native-router-flux';

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

  componentWillMount() {
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
    Actions.cardDetails({ deck });

    console.log(deck.name);
  }


  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <ListView
            removeClippedSubviews={false}
            style={styles.container}
            dataSource={this.state.dataSource}
            renderRow={(data) =>
              <TouchableWithoutFeedback onPress={(event) => this.onRowPress(data)}>
                <View style={styles.containerStyle}>
                  <Text>{data.name}</Text>
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
  const { deckName, decks } = state.decks

  console.log(decks);
  return {
    decks: decks
  };
};

export default connect(mapStateToProps, { getDecks })(HomeScreen);