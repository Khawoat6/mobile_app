import React from 'react';
import { Constants, ImagePicker, Permissions } from 'expo';
import {
  StyleSheet, Text,
  TextInput,  TouchableOpacity, View,
  Button, ImageEditor,Image,Alert,TouchableHighlight
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import HeaderNavigationBar from './HeaderNavigationBar'
import MessageListview from './MessageListview'
import database from './Database'
import '@firebase/firestore';
import * as firebase from 'firebase';

class HomeWork extends React.Component {

  constructor(props){
    super(props)
    this.state = {
        item:[],
        name: '',
        message:'',
        time:'',
        tmp:[]

      };
  }


onPressOK = () => {
    this.setState({item:[]})
    database.readListening(this.read_Message_success,this.read_Message_fail)
};


  onPressSend = () => {
    this.setState({item:[]})
    account={
      firstName:this.state.name,
      message:this.state.message,
      time:firebase.firestore.FieldValue.serverTimestamp(),
    }
    database.createAccount(account,this.add_Message_success,this.add_Message_fail)

  };

  read_Message_success=async(account)=>{
    if(this.state.name == account.firstName){
    var ch_sender = true;
    }
  else{
    var ch_sender = false;
    }
  this.setState(
  {item:this.state.item.concat([{
    name:account.firstName,
    message:account.message,
    sender:ch_sender,
    image_url:"http://www.hikiddy.com/wp-content/uploads/2016/08/Aurora.png"
  }])}
  )

  }

  read_Message_fail=async()=>{
    console.log("fail");
    this.setState({item:[]})
  }

  add_Message_fail=async()=>{
    console.log("fail");
    this.setState({item:[]})
  }

  add_Message_success=async(id)=>{
    console.log(id);
    





  }



  onChangeTextName = name => this.setState({ name });
  onChangeTextMessage = message => this.setState({ message });


  render() {
    return (

      <LinearGradient
       colors={['#7F7FD5', '#86A8E7', '#91EAE4']}
       style={{flex: 1}}>
      <HeaderNavigationBar {...this.props} />
      <View style={{flex:1,justifyContent: 'center'}}>

      <View style={{flexDirection: 'row'}}>
         <TextInput
            style={styles.nameInput}
            placeholder="Name"
            onChangeText={this.onChangeTextName}/>
         <TouchableOpacity
            style={styles.touchableUser}
            onPress={this.onPressOK}>
            <Text style={{fontSize:20, color:'#ffffff',textAlign:'center'}}> OK </Text>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row'}}>
         <TextInput
            style={styles.nameInput}
            placeholder="Message"
            onChangeText={this.onChangeTextMessage}/>
         <TouchableOpacity
            style={styles.touchableUser}
            onPress={this.onPressSend}>
            <Text style={{fontSize:20, color:'#ffffff',textAlign:'center'}}>Send</Text>
        </TouchableOpacity>
      </View>

      <View style ={styles.list}>

        <MessageListview itemList={this.state.item}/>
      </View>

      </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  touchableUser:{
    alignItems: 'center',
    padding:10,
    borderRadius: 50,
    borderColor:'white',
    borderWidth : 1,
    margin:5,
  },
  list:{

    width:'98%',
    height:'70%',
    borderWidth : 1,
    borderColor:'white',
    borderRadius: 10,
    padding:10,
    margin:5,
  },
  nameInput: {
      alignItems: 'center',
      height:50,
      width:'80%',
      backgroundColor: 'transparent',
      padding: 10,
      margin:5,
      borderRadius: 50,
      borderColor:'white',
      borderWidth : 1,
      fontSize:20,
  },

});

export default HomeWork;
