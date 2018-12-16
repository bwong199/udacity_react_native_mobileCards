import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { CardSection } from '../components/CardSection';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { connect } from 'react-redux';
import { createDeck, deleteDeck, getDecks, resetCreated } from '../actions'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

class CardDetails extends React.Component {

    constructor() {
        super();
    
        this.state = {
            deck: null
            }
    
    }

    static navigationOptions = {
        title: 'Card Details Screen',
    };

    onAddCardPress() {
        if(this.props.deck){
            const deck = this.props.deck;
            Actions.addCard({deck});
        } else {
            console.log('test', this.props.lastDeck)
        }
    }

    onStartQuizPress() {
        console.log('start quiz pressed');
        const deck = this.props.deck ? this.props.deck : this.props.lastDeck

        Actions.quiz({deck});
    }

    onDeleteDeckPress() {
        const deck = this.props.deck ? this.props.deck : this.props.lastDeck

        this.props.deleteDeck(deck.id);

        Actions.pop();
    }

    render() {
        return (
            <Card style={styles.containerStyle}>
                 <Text style={styles.titleStyle}>
                            {this.props.deck ? 
                            this.props.deck.name:
                            this.props.lastDeck ? this.props.lastDeck.name : <Text/>}
                        </Text>
                <Button
                    style={styles.button}
                    onPress={this.onAddCardPress.bind(this)}
                    icon={
                        <Icon
                            name='arrow-right'
                            size={15}
                            color='black'
                            backgroundColor='white'

                        />
                    }
                    title='Add Card'
                />

                <Button
                    style={styles.button}
                    onPress={this.onStartQuizPress.bind(this)}
                    icon={
                        <Icon
                            name='arrow-right'
                            size={15}
                            color='white'
                            backgroundColor='black'
                        />
                    }
                    title='Start Quiz'
                />

                <Button
                    style={styles.button}
                    onPress={this.onDeleteDeckPress.bind(this)}
                    icon={
                        <Icon
                            name='arrow-right'
                            size={15}
                            color='red'
                            backgroundColor='white'
                        />
                    }
                    title='Delete Deck'
                />
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
    button: {
        paddingTop: 20,
        paddingBottom: 20
    },
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
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

const mapStateToProps = (state) => {
  const { deckName, decks } = state.decks

    var lastDeck = null;

    if(decks.length > 0){
        lastDeck = decks[0];
    }

  return {
    decks: decks,
    lastDeck: lastDeck
  };
};

export default connect(mapStateToProps, { deleteDeck, resetCreated })(CardDetails);