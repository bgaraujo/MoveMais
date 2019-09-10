
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  View,
  Text,
  StatusBar,
  Button,
  AsyncStorage,
  Alert
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class Login extends  React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password:'',
      movemaisId:'',
      sessionId:''
    };
    //this.saveUser = this.saveUser.bind(this);
    this.login = this.login.bind(this);
  }


  saveUser = async () => {
    try {
      var user = {
        email:this.state.email,
        password:this.state.password,
        movemaisId:this.state.movemaisId,
        sessionId:this.state.sessionId
      };
      await AsyncStorage.setItem('user', JSON.stringify(user));

    } catch (error) {
      // Error saving data
    }
  };

  login(){
    let login = "{\"login\":{\"taxIdNumber\":\""+this.state.email+"\",\"password\":\""+this.state.password+"\",\"_interface\":\"WEBSITE\"}}";
    let headers = {
      "Content-Type": "application/json",
      "Accept": "*/*",
      "Cache-Control": "no-cache",
      "Host": "www.movemais.com",
      "Accept-Encoding": "gzip, deflate",
      "cache-control": "no-cache"
    };

    axios.post(
      `https://www.movemais.com/api/v1/login2`,
      login,
      {headers:headers}
    ).then( res => {
      
      if( parseInt(res.data.status.code) !== 0 ){
        Alert.alert(
          'Atenção',
          res.data.status.message,
          [
            {text: 'OK'},
          ]
        );
      }else{

        this.setState({sessionId:res.data.token.sessionId});
        this.setState({movemaisId:res.data.token.movemaisId});
        this.saveUser();
        this.props.navigation.navigate('Home');

      }
    });
  }

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.home}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Image 
              source={require('../images/icon.png')}
              style={styles.image}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={(email) => this.setState({email})}
              placeholder={'Cpf'}
              keyboardType={'numeric'}
              value={this.state.email}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              placeholder={'Senha'}
              secureTextEntry={true}
            />
            <Button
              onPress={this.login}
              title="Entrar"
              color="#841584"
              style={styles.button}
            />
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  };
}

const styles = StyleSheet.create({
  home:{
    flex:1,
    justifyContent:"center"
  },
  scrollView: {
    padding:15,
  },
  image:{
    flex:1,
    marginBottom:15,
    marginLeft:"auto",
    marginRight:"auto"
  },
  textInput:{
    margin:10,
    borderBottomWidth:1,
    borderBottomColor:"#ccc",
    padding:0
  },
  button:{
    margin:30
  }
});
