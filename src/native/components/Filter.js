import React, { Component } from 'react';
 
import { StyleSheet,View, Text, Alert, Platform, Button } from 'react-native';

import { Icon } from 'native-base';

import { Actions } from 'react-native-router-flux';
 
export default class Filter extends Component {

  render() {

    const onFilter = () => {
        Actions.filterOne()
    }

    return (
 
      <View style={styles.MainContainer}>
        
        <View style={styles.header_style}>
        
            <Icon onPress={() => onFilter()} style={styles.icon_style} name="search"></Icon>

        </View>
          
          
      </View>
            
    );
  }
}
 
const styles = StyleSheet.create({
 
MainContainer :{
justifyContent: 'center',
paddingTop: (Platform.OS === 'iOS') ? 20 : 0,
width: '100%',
 
},
 
header_style:{
  flex: 1,
  flexDirection: 'column',
  width: '100%', 
  justifyContent: 'center', 
},

icon_style:{
    alignSelf: 'flex-end',
    position: 'absolute',
    zIndex: 100,
    top: -70,
    textAlign: 'center', 
    backgroundColor: '#00BCD4', 
    color: '#fff', 
    marginTop: 2,
    borderRadius: 20,
    padding: 10,
    right: 20,
    width: '13%'
}
 
});

