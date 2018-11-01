import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Content, Card, CardItem, Body, Form, Item, Input, Label, Text, Thumbnail, Button } from 'native-base';
import ErrorMessages from '../../constants/errors';
import Error from './Error';
import Spacer from './Spacer';
import * as firebase from 'firebase';
import ImageSlider from 'react-native-image-slider';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { Marker } from 'react-native-maps';
 

const RealEstateView = ({
  error,
  realestate,
  realestateId,
  addFavorite,
  favoriteItem,
  latlong,
  handleChange,
  sendContact
}) => {
  // Error
  if (error) return <Error content={error} />;

  // Get this Recipe from all recipes
  let imobi = null;
  if (realestateId && realestate) {
    imobi = realestate.find(item => item.id === realestateId);
  }

  let favorite = null
  if (realestateId && favoriteItem) {
    favorite = favoriteItem.favorite.find(item => item.imobiId === realestateId);
  }
  
  // Recipe not found
  if (!imobi) return <Error content={ErrorMessages.recipe404} />;
  console.log(imobi)
  return (
    <Container>
      <Content> 
  
      <ImageSlider style={{width: null, height: 300}} 
      
      images={imobi.image.map((item,i)=>
        "https://firebasestorage.googleapis.com/v0/b/imobi-cbf7c.appspot.com/o/Images%2F" + item.modificationDate + "?alt=media"
      )} /> 
        <Spacer size={25} />
         
        {!!firebase.auth().currentUser &&
        <TouchableOpacity onPress={() => addFavorite(imobi.id) }>
        <Card>
          <CardItem>
          <Icon style={{position: 'relative', top: 8}} name="star" size={20} color={favorite && favorite.userId == firebase.auth().currentUser.uid && favorite.status == true ? 'red' : 'gray'} />
          <Body>
            <Text style={{fontWeight: '500', marginTop: 15, fontSize: 13}}>  Adicionar ao Favoritos</Text>
          </Body>
        </CardItem>
        </Card>
        </TouchableOpacity>
        }
        <Card>
          <CardItem style={{height: 300}}>
           
          {latlong.results &&
            <MapView
            style={styles.map}
              initialRegion={{
                latitude: !imobi.address ? -24.9637052 : latlong.results[0] && latlong.results[0].geometry.location.lat,  
                longitude: !imobi.address ? -53.6124374 : latlong.results[0] && latlong.results[0].geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            ><MapView.Marker 
              coordinate={{
                latitude: !imobi.address ? -24.9637052 : latlong.results[0] && latlong.results[0].geometry.location.lat,
                longitude: !imobi.address ? -53.6124374 : latlong.results[0] && latlong.results[0].geometry.location.lng
              }} />
            </MapView>
          }
           </CardItem>
        </Card>
        
      
        <Card>
          <CardItem>
          <Thumbnail style={styles.iconSize} source={{uri: 'https://cdn4.iconfinder.com/data/icons/aiga-symbol-signs/441/aiga_cashier-512.png'}} />
          <Body>
            <Text style={{fontWeight: '500', marginTop: 15, fontSize: 13}}>  R$ {imobi.price}</Text>
          </Body>
        </CardItem>
        </Card>

        <Card>
          <CardItem>
          <Thumbnail style={styles.iconSize} source={{uri: 'https://cdn.iconscout.com/public/images/icon/premium/png-128/surface-area-38181542bf1ea5e7-128x128.png'}} />
          <Body>
            <Text style={{fontWeight: '500', marginTop: 15, fontSize: 13}}>  Área: {imobi.area}m²</Text>
          </Body>
        </CardItem>
        </Card>

        <Grid> 
        <Card>
        
          <CardItem style={styles.mainContainer}>
         
          <Col style={{flexDirection: 'row'}}>
            <Thumbnail style={styles.iconSize} source={{uri: 'http://www.casaouteirotuias.com/wp-content/uploads/2015/07/outeirotuias-manorhouse-bed-icon.png'}} />
            <Text style={{fontWeight: '500', marginTop: 15, fontSize: 13}}>  Quartos: {imobi.bedrooms}</Text>
          </Col>
          <Col style={{flexDirection: 'row'}}>
            <Thumbnail style={styles.iconSize} source={{uri: 'https://cdn0.iconfinder.com/data/icons/simple-mix-outline/160/bed-256.png'}} />
            <Text style={{fontWeight: '500', marginTop: 15, fontSize: 13}}>  Suites: {imobi.suites}</Text>
          </Col>
          <Col style={{flexDirection: 'row'}}>
            <Thumbnail style={styles.iconSize} source={{uri: 'https://icon-icons.com/icons2/37/PNG/128/bathroom_shower_3488.png'}} />
            <Text style={{fontWeight: '500', marginTop: 15, fontSize: 13}}>  Banheiros: {imobi.bathrooms}</Text>
          </Col>
          <Col style={{flexDirection: 'row'}}>
            <Thumbnail style={styles.iconSize} source={{uri: 'http://icons.iconarchive.com/icons/icons8/android/256/Transport-Car-icon.png'}} />
            <Text style={{fontWeight: '500', marginTop: 15, fontSize: 13}}>  Vagas: {imobi.vacancies}</Text>
          </Col>
          
        </CardItem>
        
        </Card>
        </Grid>

        <Card>
          <CardItem>
          <Thumbnail style={styles.iconSize} source={{uri: 'https://cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/location-alt-256.png'}} />
          <Body>
            <Text style={{fontWeight: '500', marginTop: 15, fontSize: 13}}>  Endereço: {imobi.address}</Text>
          </Body>
        </CardItem>
        </Card>

        <Card>
          <CardItem>
          <Thumbnail style={styles.iconSize} source={{uri: 'http://www.halliecrawford.com/wp-content/uploads/2015/05/contrast-list.png'}} />
          <Body>
            <Text style={{fontWeight: '500', marginTop: 15, fontSize: 13}}>  Descrição: {imobi.description}</Text>
          </Body>
        </CardItem>
        </Card>

        <Card>
          <CardItem>
          
            <Thumbnail square style={{height: 100, width: null, flex: 1}} source={{ uri: imobi.photo ? "https://firebasestorage.googleapis.com/v0/b/imobi-cbf7c.appspot.com/o/Images%2F" + imobi.photo.modificationDate + "?alt=media" : "" }}
                     />
            <Body>
              <Text style={{fontWeight: '500', marginTop: 15, fontSize: 18}}>  Imobiliária</Text>
              <Text style={{fontWeight: '500', marginTop: 15, fontSize: 18}}>  {imobi.imobi}</Text>
            </Body>
          </CardItem>
        </Card>

        <Card>
          <CardItem>
            <Form>
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}> 
                <Text>Enviar Mensagem</Text>
            </View>
            <Item stackedLabel>
              <Label>Nome</Label>
              <Input onChangeText={v => handleChange('name', v)} />
            </Item>

            <Item stackedLabel>
              <Label>E-mail</Label>
              <Input 
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={v => handleChange('email', v)} />
            </Item>

            <Item stackedLabel>
              <Label>Telefone</Label>
              <Input onChangeText={v => handleChange('phone', v)} />
            </Item>

            <Button onPress={() => sendContact(imobi.imobi)} style={{marginTop: 10, marginBottom: 10 }} block>
              <Text>Contatar Imobiliária</Text>
            </Button>
            </Form>
          </CardItem>
        </Card>
        
        <Spacer size={20} />
      </Content>
    </Container>
  );
};

RealEstateView.propTypes = {
  error: PropTypes.string,
  realestateId: PropTypes.string.isRequired,
  realestate: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

RealEstateView.defaultProps = {
  error: null,
};

const styles = StyleSheet.create({
   iconSize: {
      fontWeight: '500', 
      marginTop: 15, 
      fontSize: 13,
      width: 20,
      height: 20
   },
   mainContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
   },

   map: {
    ...StyleSheet.absoluteFillObject,
   }
});

export default RealEstateView;
