import React from 'react'
import {
    FlatList,
    View,
    Text
} from 'react-native'
import axios from 'axios'
import moment from "moment"

export default class History extends React.Component{
    constructor(props){
        super(props)
        this.state={
            list:[]
        }

		this.getList = this.getList.bind(this);
    }


    componentDidUpdate(){
        this.getList(this.props.contractId)
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
            this.setState({list:res.data.statements.itens})
        });
        
        
    }

    render(){
        return(
            <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center' }}>
                <FlatList 
                    data={this.state.list} 
                    renderItem={ ({item}) => 
                        <View> 
                            <Text>{item.associate}</Text>
                            <Text>{item.roadName}</Text> 
                            <Text>{moment(item.occurrenceDate).format("DD/MM/YYYY h:mm")}</Text>
                            <Text>{item.categoryAxesName}</Text>
                            <Text>{ 'R$ '+(item.value/100).toFixed(2).replace('.',',') }</Text>
                        </View>
                    } 
                />
            </View>
        )
    }
}