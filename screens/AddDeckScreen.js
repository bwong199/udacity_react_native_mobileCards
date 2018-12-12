import React, { Component }  from 'react';
import { ExpoLinksView } from '@expo/samples';
import { CardSection } from '../components/CardSection';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { connect } from 'react-redux';
import { Button } from '../components/Button';
import { createDeck } from '../actions'
import { TouchableWithoutFeedback, View, Picker, StyleSheet, Text } from 'react-native';

class AddDeckScreen extends Component {
  static navigationOptions = {
    title: 'Add Deck',
  };

  onButtonPress(){
    this.props.createDeck('apple');
}

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Name"
            placeholder="Add title of your new deck"
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

  console.log(state);

  return state;
};

export default connect(mapStateToProps, {createDeck} )(AddDeckScreen) ;