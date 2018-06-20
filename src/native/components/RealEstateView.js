import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, H3, List, ListItem, Text, Thumbnail } from 'native-base';
import ErrorMessages from '../../constants/errors';
import Error from './Error';
import Spacer from './Spacer';
import * as firebase from 'firebase';
import ImageSlider from 'react-native-image-slider';
import { Col, Row, Grid } from "react-native-easy-grid";
 
const RealEstateView = ({
  error,
  realestate,
  realestateId,
}) => {
  // Error
  if (error) return <Error content={error} />;

  // Get this Recipe from all recipes
  let imobi = null;
  if (realestateId && realestate) {
    imobi = realestate.find(item => item.id === realestateId);
  }

  // Recipe not found
  if (!imobi) return <Error content={ErrorMessages.recipe404} />;
        
  return (
    <Container>
      <Content>
      
      <ImageSlider style={{width: null, height: 300}} 
      
      images={imobi.image.map((item,i)=>
        "https://firebasestorage.googleapis.com/v0/b/imobi-cbf7c.appspot.com/o/Images%2F" + item.modificationDate + "?alt=media"
      )} /> 
 
        <Spacer size={25} />
      
        <Card>
          <CardItem>
          <Thumbnail source={{uri: 'http://wfarm3.dataknet.com/static/resources/icons/set7/c11f6261a4e9.png'}} />
          <Body>
            <Text style={{fontWeight: '500', marginTop: 15, fontSize: 13}}> R$ {imobi.price}</Text>
          </Body>
        </CardItem>
        </Card>

        <Card>
          <CardItem>
          <Thumbnail source={{uri: 'https://cdn.iconscout.com/public/images/icon/premium/png-128/surface-area-38181542bf1ea5e7-128x128.png'}} />
          <Body>
            <Text style={{fontWeight: '500', marginTop: 15, fontSize: 13}}> Área: {imobi.area}m²</Text>
          </Body>
        </CardItem>
        </Card>

        <Grid> 
        <Card>
        
          <CardItem>
         
          <Col>
            <Thumbnail source={{uri: 'http://www.casaouteirotuias.com/wp-content/uploads/2015/07/outeirotuias-manorhouse-bed-icon.png'}} />
            <Text style={{fontWeight: '500', marginTop: 15, fontSize: 13}}> Quartos: {imobi.bedrooms}</Text>
          </Col>
          <Col>
            <Thumbnail source={{uri: 'https://cdn0.iconfinder.com/data/icons/simple-mix-outline/160/bed-256.png'}} />
            <Text style={{fontWeight: '500', marginTop: 15, fontSize: 13}}> Suites: {imobi.suites}</Text>
          </Col>
          <Col>
            <Thumbnail source={{uri: 'https://icon-icons.com/icons2/37/PNG/128/bathroom_shower_3488.png'}} />
            <Text style={{fontWeight: '500', marginTop: 15, fontSize: 13}}> Banheiros: {imobi.bathrooms}</Text>
          </Col>
          <Col>
            <Thumbnail source={{uri: 'http://icons.iconarchive.com/icons/icons8/android/256/Transport-Car-icon.png'}} />
            <Text style={{fontWeight: '500', marginTop: 15, fontSize: 13}}> Vagas: {imobi.vacancies}</Text>
          </Col>
          
        </CardItem>
        
        </Card>
        </Grid>

        <Card>
          <CardItem>
          <Thumbnail source={{uri: 'https://cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/location-alt-256.png'}} />
          <Body>
            <Text style={{fontWeight: '500', marginTop: 15, fontSize: 13}}> Endereço: {imobi.address}</Text>
          </Body>
        </CardItem>
        </Card>

        <Card>
          <CardItem>
          <Thumbnail source={{uri: 'http://www.halliecrawford.com/wp-content/uploads/2015/05/contrast-list.png'}} />
          <Body>
            <Text style={{fontWeight: '500', marginTop: 15, fontSize: 13}}> Descrição: {imobi.description}</Text>
          </Body>
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

export default RealEstateView;
