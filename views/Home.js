
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import History from './History'
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


export default class Home extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
			value:0,
			contracts:[],
			contractId:0
        };
		this.getValue = this.getValue.bind(this);
    }
    componentDidMount(){
		this.getValue();
    }

    getValue(){
        const { navigation } = this.props;
        const user = JSON.parse( navigation.getParam('user', null) );
        axios.get(
            `https://www.movemais.com/api/v2/getContractByMoveMaisId/`+user.movemaisId,
        ).then( res => {
			    this.setState({contractId:res.data.contracts[0].contractId});
          this.setState({value:res.data.contracts[0].currentBalance.currentBalance});
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

					<View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center' }}>

						<Icon name="money" size={50} color="#59836e"  />
						<Text style={styles.font}>Saldo disponivel R${  this.state.value/100 }</Text>

            
             
					</View>
            <History contractId={this.state.contractId}/>  
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
  font:{
	padding: 10, 
	fontSize: 25
  }
});
