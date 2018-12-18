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
import AddDeckScreen from './AddDeckScreen';
import CardDetails from './CardDetails';

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

export default class AddDeck extends React.Component {

    componentWillUpdate() {
        console.log('in DECKS')
    }

    handleClick() {
        console.log('clicked');
    }

    render() {
        return (
            // <TouchableHighlight onPress={this.handleClick.bind(this)}>
            <View style={styles.container}
            >
                <Router>
                    <Scene key="root">
                        <Scene key='addDeck' title='Add Deck' component={AddDeckScreen} icon={TabIcon} initial />
                        <Scene key='cardDetails2' title='Card Details' component={CardDetails} icon={TabIcon} />
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
