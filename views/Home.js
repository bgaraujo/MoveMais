
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
		this.getList = this.getList.bind(this);
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
			this.getList(res.data.contracts[0].contractId);
            this.setState({value:res.data.contracts[0].currentBalance.currentBalance});
        });
    }

    getList(contractId){

		var endDate = new Date();
		var startDate = new Date();
		startDate.setMonth( startDate.getMonth()-1 );
		
		let query = "{\"contractId\":"+contractId+",\"startDate\":"+startDate.getTime()+",\"endDate\":"+endDate.getTime()+",\"page\":{\"_size\":10,\"_offset\":0,\"_itemCount\":0}}";
        let headers = {
			"Content-Type": "application/json",
			"Accept": "*/*",
			"Cache-Control": "no-cache",
			"Host": "www.movemais.com",
			"Accept-Encoding": "gzip, deflate",
			"cache-control": "no-cache"
        };
		
        axios.post(
            `https://www.movemais.com/api/v2/getCustomStatement`,
            query,
            {headers:headers}
        ).then( res => {
			console.warn(res.data.statements.itens);
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
