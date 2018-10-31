import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Body, ListItem, Form, Item, Label, Input, CheckBox, Button, View, Card, CardItem } from 'native-base';
import Messages from './Messages';
import Loading from './Loading';
import Header from './Header';
import Spacer from './Spacer';
import {
  AppRegistry,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Picker
} from 'react-native';
import * as firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import Adress from '../components/Adress'
import axios from 'axios'


class UpdateRealEstate extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    success: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    realestate: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      bedrooms: PropTypes.number,
      bathrooms: PropTypes.number,
      suites: PropTypes.string,
      vacancies: PropTypes.number,
      area: PropTypes.number,
      cep: PropTypes.string,
      address: PropTypes.string,
      number: PropTypes.string,
      complement: PropTypes.string,
      uf: PropTypes.string,
      city: PropTypes.string,
      neighborhood: PropTypes.string,
      price: PropTypes.number
    })).isRequired,
  }

  static defaultProps = {
    error: null,
    success: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      id: props.realestateId || '',
      title: props.realestate.title || '',
      description: props.realestate.description || '',
      bedrooms: props.realestate.bedrooms || '', 
      suites: props.realestate.suites || '',
      bathrooms: props.realestate.bathrooms || '',
      vacancies: props.realestate.vacancies || '',
      types_goal: props.realestate.types_goal || '',
      area: props.realestate.area || '',
      images: [props.realestate.image || ''], 
      cep: props.realestate.cep || '',
      address: props.realestate.address || '',
      number: props.realestate.number || '',
      complement: props.realestate.complement || '',
      uf: props.realestate.uf || '',
      city: props.realestate.city || '',
      neighborhood: props.realestate.neighborhood || '',
      price: props.realestate.price || '',
      imobi: props.imobi || '',
      load: false,
      dp: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectTypesGoal = this.handleSelectTypesGoal.bind(this);
    this.handleCep = this.handleCep.bind(this);
    console.log(this.props)
  }

  componentDidMount(){
    if(this.props.realestateId) {
      this.getData()    
    }
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val
    });
  }

  handleSubmit = () => {
    const newRealEstate = Object.assign(this.state);
    newRealEstate.price = Number(this.state.price);
    newRealEstate.area = Number(this.state.area);
    newRealEstate.bedrooms = Number(this.state.bedrooms);
    newRealEstate.bathrooms = Number(this.state.bathrooms);
    newRealEstate.vacancies = Number(this.state.vacancies);
    newRealEstate.email = this.props.user.email
    newRealEstate.photo = this.props.user.image
    
    if(this.props.Create) {
      this.props.onFormSubmit(newRealEstate)
      .then(this.setState({id: this.state.id, title: '', description: '', bedrooms: '', bathrooms: '', types: '', suites: '', vacancies: '', goal: '', area: '', price: '', cep: '', address: '',
      number: '', complement: '', uf: '', city: '', neighborhood: '', images: this.state.images, imobi: this.props.imobi})) 
      .then(Actions.realestate()) 
      .then(() => console.log('Real Estate Atualizado'))
      .catch(e => console.log(`Error: ${e}`));
    }else{
      this.props.onFormSubmit(newRealEstate)
      .then(this.setState({id: this.state.id, images: this.state.image, photo: this.state.photo})) 
      .then(Actions.realestate()) 
      .then(() => console.log('Real Estate Atualizado'))
      .catch(e => console.log(`Error: ${e}`));
    }
  }

  getData() {
    new Promise((resolve, reject) => {
      return this.props.reFetch().then(response => {
        const RealEstateId = this.props.realestateId
        if (response) {
          return response.data.map((item,i)=> 
            {item.id === RealEstateId ? this.setState({title: item.title, description: item.description, bedrooms: item.bedrooms.toString(), bathrooms: item.bathrooms.toString(), 
              types_goal: item.types_goal, images: item.images, suites: item.suites, vacancies: item.vacancies.toString(), area: item.area.toString(), price: item.price.toString(), 
              cep: item.cep, address: item.address, number: item.number, complement: item.complement, uf: item.uf, city: item.city, neighborhood: item.neighborhood, imobi: item.imobi, email: item.email, photo: item.photo}) : ''} 
          )       
        } else {
          reject(new Error('error'))
        }
      }, error => {
        reject(new Error(error.message))
      })
    })
  }

  pickMultiple(){
    this.setState({ load: true })
    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob
    //const { uid } = this.state.user
    const uid = "Images"
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
      mediaType: 'photo',
      multiple: true,
      useFrontCamera: false
    }).then(images => {
      
      this.setState({
        image: null,
        images: images.map(i => {
          console.log('received image', i);
          return {uri: i.path, width: i.width, height: i.height, mime: i.mime, modificationDate: i.modificationDate };
        })
      });

  files: images.map(i => {
    testFile = i.path 
      var files = images
      let mime = 'image/jpg'
      let blob = new Blob(RNFetchBlob.wrap(testFile), { type : 'image/jpg;BASE64'})
          // set it up
      firebase.storage().ref('Images').constructor.prototype.putFiles = function(files) { 
        var ref = this;
          return ref.child(i.modificationDate).put(blob, { contentType: mime });
      }
    
      // use it!
      firebase.storage().ref('Images').putFiles(files)
    })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  form() {
    if(this.props.editrealestate) {
      return <Text>Atualizar Imóvel</Text>
    }else if(this.props.delrealestate) {
      return <Text>Deletar Imóvel</Text>
    }else{
      return <Text>Cadastrar Imóvel</Text>
    }
  }

  handleSelectTypesGoal(name, value) {
    this.setState({types_goal: value})
  }

  handleCep() {
    var self = this
    axios.get('http://api.postmon.com.br/v1/cep/' + this.state.cep)
    .then(function (response) {
        self.setState({address: response.data.logradouro, uf: response.data.estado, city: response.data.cidade, neighborhood: response.data.bairro})
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  

  render() {
    const { loading, error, success } = this.props;

    const types_goal = [{
      value: 'Residencial Venda',
    }, {
      value: 'Residencial Alugar',
    },
    {
      value: 'Comercial Venda',
    },
    {
      value: 'Comercial Alugar'
    },
  ];

    // Loading
    if (loading) return <Loading />;

    return (
      <Container style={{flex: 1}}>
        <Content padder>
          {/* <Header style={{textAlign: 'center'}} 
            title="Novo Imóvel"
          /> */}

          {error && <Messages message={error} />}
          {success && <Messages message={success} type="success" />}

          <Form>
            <Item stackedLabel>
              <Label>Título</Label>
              <Input
                value={this.state.title}
                onChangeText={v => this.handleChange('title', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>Valor</Label>
              <Input
                value={this.state.price}
                onChangeText={v => this.handleChange('price', v)}
              />
            </Item>
            
            <View style={{marginLeft: 15, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Dropdown style={{color: '#000'}}
                  animationDuration={500}
                  value={this.state.types_goal}
                  label='Tipo de Imóvel e Finalidade'
                  data={types_goal}
                  onChangeText={v => this.handleSelectTypesGoal('types_goal', v)}
              />
            </View>
            </View>
          <View style={{flexDirection: 'row', width: '100%'}}>
            <Item stackedLabel style={{flex: 1, marginLeft: 15}}>
              <Label>Quartos</Label>
              <Input
                value={this.state.bedrooms}
                onChangeText={v => this.handleChange('bedrooms', v)}
              />
            </Item>

            <Item stackedLabel style={{flex: 1, marginLeft: 30}}>
              <Label>Suítes</Label>
              <Input
                value={this.state.suites}
                onChangeText={v => this.handleChange('suites', v)}
              />
            </Item>
          </View>

          <View style={{flexDirection: 'row', width: '100%'}}>
            <Item stackedLabel style={{flex: 1, marginLeft: 15}}>
              <Label>Banheiros</Label>
              <Input
                value={this.state.bathrooms}
                onChangeText={v => this.handleChange('bathrooms', v)}
              />
            </Item>

            <Item stackedLabel style={{flex: 1, marginLeft: 30}}>
              <Label>Vagas</Label>
              <Input
                value={this.state.vacancies}
                onChangeText={v => this.handleChange('vacancies', v)}
              />
            </Item>
          </View>

          <View style={{marginLeft: 15}}>
          <Item stackedLabel>
              <Label>Área Útil</Label>
              <Input
                value={this.state.area}
                onChangeText={v => this.handleChange('area', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>Descrição</Label>
              <Input
                value={this.state.description}
                onChangeText={v => this.handleChange('description', v)}
              />
            </Item>
          
            <Adress cep={this.state.cep} address={this.state.address} number={this.state.number} complement={this.state.complement} uf={this.state.uf} 
            city={this.state.city} neighborhood={this.state.neighborhood} change={this.handleChange} searchCep={this.handleCep} />

          {this.props.delrealestate ? <View></View> : 
            <View stackedLabel>
              <Button value={this.state.image} style={{width: "50%", marginLeft: 'auto', marginRight: 'auto', marginTop: 20 }} block onPress={ this.pickMultiple.bind(this) }><Text>Enviar Imagem</Text></Button>
            </View>
          }
            <Spacer size={20} />

            
            
            <Button style={{marginBottom: 20}} block onPress={this.handleSubmit}>
              {this.form()}
            </Button>

          </View>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default UpdateRealEstate;