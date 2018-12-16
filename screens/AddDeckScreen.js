import React, { Component } from 'react';
import { ExpoLinksView } from '@expo/samples';
import { CardSection } from '../components/CardSection';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { connect } from 'react-redux';
import { Button } from '../components/Button';
import { createDeck, deckNameChanged } from '../actions'
import { TouchableWithoutFeedback, View, Picker, StyleSheet, Text } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast'
import { Actions } from 'react-native-router-flux';


class AddDeckScreen extends Component {

  constructor() {
    super();

    this.state = {
        deckName: ''
        }

}

  static navigationOptions = {
    title: 'Add Deck',
  };

  onDeckNameChanged(text){
    this.props.deckNameChanged(text);
  }

  onButtonPress() {
    this.props.createDeck(this.props.deckName);

    this.refs.toast.show('Deck Created!', 500);
    // this.props.navigation.navigate('DecksStack')

    Actions.cardDetails2();

  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Name"
            placeholder="Add title of your new deck"
            value={this.props.deckName}
            onChangeText={this.onDeckNameChanged.bind(this)}
          />
        </CardSection>
        <Toast position='top'
          ref="toast" />

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
  const {deckName, decks } = state.decks

  return {deckName, decks } ;
};

export default connect(mapStateToProps, { createDeck, deckNameChanged })(AddDeckScreen);