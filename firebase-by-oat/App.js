import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import TopNavigator from './components/TopNavigator';
import DrawerNavigation from './components/DrawerNavigation';


export default class App extends React.Component {
  render()
  {
    return (
      <View style={{flex:1, marginTop:StatusBar.currentHeight}}>
        <DrawerNavigation/>
      </View>
    );
  }
}