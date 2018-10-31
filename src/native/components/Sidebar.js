import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ViewPropTypes, TouchableOpacity, Image, ImageBackground, AsyncStorage, Platform, Alert, Linking } from 'react-native';
import { Container, Content, Card, CardItem, Body, Button, Thumbnail, List, ListItem, Right, Left } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { getMemberData } from '../../actions/member';
import { getContact } from '../../actions/contact';

import firebase from 'firebase';

class Menu extends Component {
    componentDidMount() {
        this.props.getMemberData()
        this.props.getContact()
    }

    render() {  

    return (
      <Container>
        <Content>
        <View >
        <ImageBackground style={styles.image} source={require('../../images/background.png')}>
        <Text style={{color: '#fff'}}></Text>
        <Grid style={{alignItems: 'center', flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
        <Col>
        <View style={styles.avatarbg}>
            <Image style={styles.elipse} source={require('../../images/elipse.png')} />
            <Thumbnail style={styles.avatar} source={{uri: "https://firebasestorage.googleapis.com/v0/b/imobi-cbf7c.appspot.com/o/Images%2F" + this.props.member.image.modificationDate + "?alt=media"}} />
        </View>
        
        </Col>
            <Col>
            <View style={{marginTop: '26%'}}>
                {/* <Text style={{color: '#fff'}}>{this.props.editTruck.name ? this.props.editTruck.name : this.state.name} - {this.state.role == 'motorista' ? 'Motorista' : 'Transportadora'}</Text> */}
            </View>
            </Col>
        </Grid>
        </ImageBackground>
        </View>
            <List style={{marginTop: '5%'}}>
            {!!firebase.auth().currentUser && this.props.member.imobi ?
            <View>
                <ListItem onPress={() => Actions.realestate()}>
                <Left>
                    {/* <Icon 
                    name='dumbbell'
                    style={{ fontSize: 20, color: 'red' }} /> */}
                    {/* <Image source={require('../../images/dumbbell.png')} /> */}
                    <Text style={styles.title}>    Todos Imóveis</Text>
                </Left>
                <Right>
                    <Icon family='FontAwesome' name="arrow-right" />
                </Right>
                </ListItem>

                <ListItem onPress={() => Actions.realestate({params: this.props.member.imobi})}>
                <Left>
                    {/* <Icon 
                    name='dumbbell'
                    style={{ fontSize: 20, color: 'red' }} /> */}
                    {/* <Image source={require('../../images/dumbbell.png')} /> */}
                    <Text style={styles.title}>    Meus Imóveis</Text>
                </Left>
                <Right>
                    <Icon family='FontAwesome' name="arrow-right" />
                </Right>
                </ListItem>

                <ListItem onPress={() => Actions.contact({params: this.props.member.imobi})}>
                <Left>
                    {/* <Icon 
                    name='dumbbell'
                    style={{ fontSize: 20, color: 'red' }} /> */}
                    {/* <Image source={require('../../images/dumbbell.png')} /> */}
                    <Text style={styles.title}>    Meus Contatos</Text>
                </Left>
                <Right>
                    <Icon family='FontAwesome' name="arrow-right" />
                </Right>
                </ListItem>


            {this.props.member.role == 'Admin' && 
                <ListItem onPress={() => Actions.employee({params: this.props.member})}>
                <Left>
                    {/* <Image source={require('../../images/relatory.png')} /> */}
                    <Text style={styles.title}>    Meus Funcionários</Text>
                </Left>
                <Right>
                    <Icon family='FontAwesome' name="arrow-right" />
                </Right>
                </ListItem>
            }
            </View>
            
            :
            
            <View>
            {!!firebase.auth().currentUser && this.props.member.role == 'User' ?
            <View>
                <ListItem onPress={() => Actions.realestate()}>
                <Left>
                    {/* <Icon 
                    name='dumbbell'
                    style={{ fontSize: 20, color: 'red' }} /> */}
                    {/* <Image source={require('../../images/dumbbell.png')} /> */}
                    <Text style={styles.title}>    Todos Imóveis</Text>
                </Left>
                <Right>
                    <Icon family='FontAwesome' name="arrow-right" />
                </Right>
                </ListItem>

                <ListItem onPress={() => Actions.realestate({fav: true})}>
                <Left>
                    {/* <Icon 
                    name='dumbbell'
                    style={{ fontSize: 20, color: 'red' }} /> */}
                    {/* <Image source={require('../../images/dumbbell.png')} /> */}
                    <Text style={styles.title}>    Meus Favoritos</Text>
                </Left>
                <Right>
                    <Icon family='FontAwesome' name="arrow-right" />
                </Right>
                </ListItem>
            </View>

                :

                <ListItem>
                <Left>
                    {/* <Icon 
                    name='dumbbell'
                    style={{ fontSize: 20, color: 'red' }} /> */}
                    {/* <Image source={require('../../images/dumbbell.png')} /> */}
                    <Text style={styles.title}>    Sobre o APP</Text>
                </Left>
                <Right>
                    <Icon family='FontAwesome' name="arrow-right" />
                </Right>
                </ListItem>
            }
            </View>      
            }

            {/* <ListItem>
              <Left>
                <Image source={require('../../images/apple.png')} />
                <Text style={styles.title}>    Minha Dieta</Text>
              </Left>
              <Right>
                <Icon family='FontAwesome' name="arrow-right" />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Image source={require('../../images/user.png')} />
                <Text style={styles.title}>    Meu Perfil</Text>
              </Left> 
              <Right>
                <Icon family='FontAwesome' name="arrow-right" />
              </Right>
            </ListItem> */}
            {/* <ListItem>
              <Left>
                <Image source={require('../../images/chat.png')} />
                <Text style={styles.title}>    Meus Contatos</Text>
              </Left>
              <Right>
                <Icon family='FontAwesome' name="arrow-right" />
              </Right>
            </ListItem> */}
          </List>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
        <TouchableOpacity>
            <Image source={require('../../images/button.png')} /> 
        </TouchableOpacity>
        </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: 'red',
    },
    MainContainer :{ 
      justifyContent: 'space-evenly', 
      flexDirection: 'row', 
      padding: 15,
    },
    MainContainerSC :{ 
        justifyContent: 'space-evenly', 
        flexDirection: 'row', 
        padding: 15,
        marginRight: '10%'
    },
    txt: { 
        alignItems: 'flex-start',
        ...Platform.select({
            ios: {
                marginTop: 28,
                color: '#808080'
            },
            android: {
                marginTop: 26.5,
                color: '#808080'
            },
          }),
    },
    img: {
        marginTop: 20,
        marginLeft: 50
    },
    txtbtn: {
        color: '#fff',
        position: 'relative',
        top: '-5%'
    },

    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 130,
        paddingTop: 15 
      },

    avatarbg: {
        marginTop: '4%'
    },
      
    avatar: {
        position: 'relative',
        top: '-47%',
        left: '15%',
        height: 80,
        width: 80,
        borderRadius: 50,
        borderColor: '#fff',
        borderWidth: 3, 
    },  

    elipse: {
      marginLeft: '12%' 
    },

    title: {
      marginTop: 3
    }
  });

  const mapStateToProps = state => ({
    member: state.member
  });

  const mapDispatchToProps = {
    getMemberData,
    getContact
  };


  export default connect(mapStateToProps, mapDispatchToProps)(Menu);