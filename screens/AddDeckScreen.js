import React from 'react';
import { ExpoLinksView } from '@expo/samples';
import { CardSection } from '../components/CardSection';
import { Input } from '../components/Input';
import { Card } from '../components/Card';

import { Button } from '../components/Button';

import { TouchableWithoutFeedback, View, Picker, StyleSheet, Text } from 'react-native';

export default class AddDeckScreen extends React.Component {
  static navigationOptions = {
    title: 'Add Deck',
  };

  onButtonPress(){

    console.log('should create card');
}

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Name"
            placeholder="What is the title of your new Deck?"
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
