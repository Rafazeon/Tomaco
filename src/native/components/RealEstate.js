import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, RefreshControl, Image, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Error from './Error';
import Header from './Header';
import Spacer from './Spacer';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase'
import Filter from '../components/Filter'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


const RealEstate = ({
  error,
  loading,
  realestate,
  reFetch,
  filters,
  imobi,
  params,
  favorite,
  fav,
  userId,
  getLatLong
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = (item, index) => index.toString();

  const onPress = item => {
    var address = item.address + ', ' + item.number + ', ' + item.city + ' - ' + item.uf

    getLatLong(address)
    
    Actions.imobi({ match: { params: { id: String(item.id), title: item.title } } });
  }
  const onEdit = item => Actions.imobiEdit({ match: { params: { id: String(item.id) } } });
  const onDelete = item => Actions.imobiDelete({ match: { params: { id: String(item.id) } } });
  const types = filters.types + ' ' + filters.goal;

  const getImobiUser = item => {
    if(params) {
      return item.filter((home) => {
        return home.imobi == params
      })

    }else if(fav == true) {
      return item.filter((home, index) => {
        if(favorite[index].status == fav && favorite[index].userId == userId) {
          return item
        }
      })

    }else{ 
      return item
    }
  }

  return (
    <Container>
      
      <Content>
        {/* <Header
          title="Imóveis"
        /> */}

        <FlatList
          numColumns={1}
          data={getImobiUser(realestate)}
          renderItem={({ item }) => (
            <Card transparent style={{ 
                  borderWidth: 0,
                  borderRadius: 1,
                  borderColor: '#ddd',
                  borderBottomWidth: 0,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 5 },
                  shadowOpacity: 0.8,
                  shadowRadius: 5,
                  elevation: 5,
                  marginLeft: 5,
                  marginRight: 5,
                  marginTop: 5 }}>
            
              <View>
              
              <Spacer size={10} />
              
              {!!firebase.auth().currentUser && imobi == item.imobi ? 
              <View style={{flex: 1, justifyContent: 'flex-start', flexDirection: 'row', padding: 15}}>    
                  <Icon name="pencil" style={{marginLeft: 20, fontSize: 13}}></Icon>
                  <Text onPress={() => onEdit(item)} style={{marginLeft: 5, fontSize: 13, position: 'relative', top: -3}}>Editar</Text>
                  <Icon name="trash" style={{marginLeft: 10, fontSize: 13}}></Icon>
                  <Text onPress={() => onDelete(item)} style={{marginLeft: 5, fontSize: 13, position: 'relative', top: -3}}>Deletar</Text>
              </View>
              : false}
              <Spacer size={15} />
              
              <CardItem cardBody>
                <TouchableOpacity onPress={() => onPress(item)} style={{ flex: 1 }}>
                <Text style={{fontSize: 18, fontWeight: 'bold', position: 'relative', bottom: 10, left: 10}}>{item.title}</Text>
                  <Image
                    source={{ uri: "https://firebasestorage.googleapis.com/v0/b/imobi-cbf7c.appspot.com/o/Images%2F" + item.image[0].modificationDate + "?alt=media" }}
                    style={{
                      height: 200,
                      width: null,
                      flex: 1
                    }}
                  />
                </TouchableOpacity>
              </CardItem>
              <CardItem cardBody>
                <Body> 
                  <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row', padding: 15}}>
                            <Icon name="bed">  {item.bedrooms}</Icon>
                            <Icon name="bath" style={{marginLeft: 10}}>  {item.bathrooms}</Icon>
                            <Icon name="car" style={{marginLeft: 10}}> {item.vacancies} </Icon>
                            <Text style={{fontWeight: '800', fontSize: 12, position: 'relative', top: -2}}>      {item.area}m²</Text>
                            <Text style={{fontWeight: '800', fontSize: 12, position: 'relative', top: -2}}>    R$  {item.price}</Text>
                                               
                  </View>
                  
                  <Spacer size={5} />
                </Body>
              </CardItem>
              </View>
            
              
            </Card>
          )}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={reFetch}
            />
          }
        />

        <Spacer size={20} />
      </Content>
      <Filter />
    </Container>
  );
};

RealEstate.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  realestate: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  reFetch: PropTypes.func,
};

RealEstate.defaultProps = {
  error: null,
  reFetch: null,
};


function mapStateToProps(state){
  return {
      types: state.types
  }
}

export default connect(mapStateToProps)(RealEstate);
