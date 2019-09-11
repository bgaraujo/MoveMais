/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { 
  View, 
  Text,
  AsyncStorage 
} from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './views/Login';
import Home from './views/Home';

class HomeScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password:'',
      movemaisId:'',
      sessionId:'',
      loadScreen:true
    };
    this._retrieveData = this._retrieveData.bind(this);
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
  
      if (value === null) {
        this.props.navigation.navigate('Login');
      }else{
        this.props.navigation.navigate('Home',{ user:value });
      }
      
    } catch (error) {
      // Error retrieving data
    }
  };

  render() {
    this._retrieveData();
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}


const AppNavigator = createStackNavigator(
  {
    Splash:HomeScreen,
    Login:Login,
    Home:Home
  },
  {
    initialRouteName: 'Splash',
  }
);

export default createAppContainer(AppNavigator);