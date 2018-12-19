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
import { createDeck, deckNameChanged, getDecks, resetCreated } from '../actions'
import { connect } from 'react-redux';
import CardSection from '../components/CardSection';
import { Actions } from 'react-native-router-flux';
import CardDetails from './CardDetails';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class Quiz extends Component {
  static navigationOptions = {
    title: 'Deck Quiz Screen',
  };
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      answered: 0,
      questions: [],
      questionLen: 0,
      currentDeck: null,
      currentInd: 0,
      finished: false,
      corrects: 0,
      results: 0
    };
  }

  componentWillMount() {

    this.setState({ questions: this.props.navigation.state.params.deck.questions });
    this.setState({ questionLen: this.props.navigation.state.params.deck.questions.length });
    this.setState({ currentDeck: this.props.navigation.state.params.deck.questions[0] })
    this.setState({ isVisible: false })
  }

  saveQuizTime() {
    const currentTime = new Date();

    AsyncStorage.setItem('lastQuizTime', currentTime).then(() => {
      AsyncStorage.getItem('lastQuizTime').then((res) => {
        console.log(res)
      }
      )
    })
  }

  onCorrectPress(data) {
    console.log('correct');

    if (this.state.questionLen == this.state.currentInd + 1) {
      this.setState({ finished: true })

      this.setState({ results: ((this.state.corrects + 1) / (this.state.questionLen) * 100).toFixed(2) })
      this.saveQuizTime();
    } else {
      this.setState({ currentInd: this.state.currentInd + 1 }, function () {
        this.setState({ currentDeck: this.state.questions[this.state.currentInd] })
      })

      this.setState({ corrects: this.state.corrects += 1 })
    }

  }

  onIncorrectPress(data) {
    console.log('incorrect');
    if (this.state.questionLen == this.state.currentInd + 1) {
      this.setState({ finished: true })
      this.setState({ results: (this.state.corrects / (this.state.questionLen) * 100).toFixed(2) })
      this.saveQuizTime();

    } else {
      this.setState({ currentInd: this.state.currentInd += 1 }, function () {
        this.setState({ currentDeck: this.state.questions[this.state.currentInd] })

      })
    }
  }

  onShowAnswerPress() {
    this.setState({ isVisible: true })
  }

  render() {

    return (

      <View style={styles.container}>


        {this.state.finished ?

          <Text>
            {this.state.results} %
</Text> :
          <Text />}



        <Text>
          {this.state.currentDeck.question}
        </Text>
        <Button
          title={this.state.currentDeck.id}
          style={styles.button}
          onPress={(event) => this.onCorrectPress(this.state.currentDeck)}
          icon={
            <Icon
              name='arrow-right'
              size={15}
              color='green'
              backgroundColor='white'

            />
          }
          title='Correct'
        />
        <Button
          title={this.state.currentDeck.id}
          style={styles.button}
          onPress={(event) => this.onIncorrectPress(this.state.currentDeck)}
          icon={
            <Icon
              name='arrow-right'
              size={15}
              color='red'
              backgroundColor='white'
            />
          }
          title='Incorrect'
        />


        <Button
          title={this.state.currentDeck.id}
          style={styles.button}
          onPress={(event) => this.onShowAnswerPress(this.state.currentDeck)}
          icon={
            <Icon
              name='arrow-right'
              size={15}
              color='red'
              backgroundColor='white'
            />
          }
          title='Show Answer'
        />

        {this.state.isVisible ?

          <Text>
            {this.state.currentDeck.answer}
          </Text> :
          <Text />}



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
  const { deckName, decks, created } = state.decks

  return {
    decks,
    created
  };
};

export default connect(mapStateToProps, { getDecks, resetCreated })(Quiz);