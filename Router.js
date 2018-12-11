import React from 'react';
import { Scene, Router, ActionConst } from 'react-native-router-flux';
import HomeScreen from './screens/HomeScreen';
import LinksScreen from './screens/LinksScreen';
import Decks from './screens/Decks';

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

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root">
                <Scene key='tab1' title='Add' component={HomeScreen} icon={TabIcon} />
                <Scene key='tab2' title='Grocery' component={LinksScreen} icon={TabIcon} />
                <Scene key='tab3' hideNavBar title='To Do' component={Decks} icon={TabIcon} />
            </Scene>
        </Router>
    );
};

export default RouterComponent;