import React, { Component } from 'react';
import { ExpoLinksView } from '@expo/samples';
import { CardSection } from '../components/CardSection';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { connect } from 'react-redux';
import { Button } from '../components/Button';
import { createDeck, deckNameChanged, questionChanged, answerChanged, addCardToDeck } from '../actions'
import { TouchableWithoutFeedback, View, Picker, StyleSheet, Text } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast'
import { Actions } from 'react-native-router-flux';


class AddCardScreen extends Component {

  constructor() {
    super();

    this.state = {
        deckName: ''
        }
}

  static navigationOptions = {
    title: 'Add Deck',
  };

  componentWillMount(){
    console.log('PROPS', this.props)
  }
  
  onQuestionChanged(text){
    this.props.questionChanged(text);
  }

  onAnswerChanged(text){
    this.props.answerChanged(text);
  }

  onButtonPress() {

    const deck = this.props.navigation.state.params.deck;

    const question = this.props.question;

    const answer = this.props.answer;
    
    this.props.addCardToDeck(deck.id, question, answer)
    
    this.refs.toast.show('Deck Created!', 300);

    this.props.navigation.goBack();

  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Question"
            placeholder="Add Question"
            value={this.props.question}
            onChangeText={this.onQuestionChanged.bind(this)}
          />
        </CardSection>
        <Toast position='top'
          ref="toast" />
        <CardSection>
          <Input
            label="Answer"
            placeholder="Add Answer"
            value={this.props.answer}
            onChangeText={this.onAnswerChanged.bind(this)}
          />
        </CardSection>
        <CardSection>
          <Button
            onPress={this.onButtonPress.bind(this)}
          >
            Create
                    </Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = (state) => {
  const {deckName, decks, question, answer } = state.decks

  return {deckName, decks, question, answer } ;
};

export default connect(mapStateToProps, 
  { createDeck, deckNameChanged, questionChanged, answerChanged, addCardToDeck  })
  (AddCardScreen);