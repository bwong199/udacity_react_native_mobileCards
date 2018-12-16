import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { CardSection } from './CardSection';
import { Actions } from 'react-native-router-flux';

class ListItem extends Component {

    onRowPress(){
        // Actions.employeeEdit({ employee: this.props.employee});
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View>
                    <CardSection>
                        <Text style={styles.titleStyle}>
                            {this.props}
                        </Text>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>

        )
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
}

export default ListItem;