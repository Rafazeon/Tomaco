import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Body, ListItem, Form, Item, Label, Input, CheckBox, Button, View } from 'native-base';
import Messages from './Messages';
import Loading from './Loading';
import Header from './Header';
import Spacer from './Spacer';
import {
  AppRegistry,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import * as firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';
import { Actions } from 'react-native-router-flux';


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
      bedrooms: PropTypes.string,
      bathrooms: PropTypes.string,
      types: PropTypes.string,
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
      bathrooms: props.realestate.bathrooms || '',
      types: props.realestate.types || '',
      image: Math.floor(Math.random() * 99999999) + '.jpg',
      load: false,
      dp: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    if(this.props.realestateId) {
      this.getData()    
    }
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
    console.log(this.state.image)
  }

  handleSubmit = () => {
    const img = Math.floor(Math.random() * 99999999) + '.jpg'
    if(this.props.Create) {
      this.props.onFormSubmit(this.state)
      .then(this.setState({id: this.state.id, title: '', description: '', bedrooms: '', bathrooms: '', types: '', image: img})) 
      .then(Actions.realestate()) 
      .then(() => console.log('Real Estate Atualizado'))
      .catch(e => console.log(`Error: ${e}`));
    }else{
      this.props.onFormSubmit(this.state)
      .then(this.setState({id: this.state.id, image: img})) 
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
            {item.id === RealEstateId ? this.setState({title: item.title, description: item.description, bedrooms: item.bedrooms, bathrooms: item.bathrooms, types: item.types, image: item.image}) : ''} 
          )
          
        } else {
          reject(new Error('error'))
        }
      }, error => {
        reject(new Error(error.message))
      })
    })
  }

  openPicker(){
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
      mediaType: 'photo'
    }).then(image => {

      const imagePath = image.path
      console.log(imagePath)

      let uploadBlob = null
      
      const imageRef = firebase.storage().ref('Images').child(this.state.image)
      
      let mime = 'image/jpg'
      fs.readFile(imagePath, 'base64')
        .then((data) => {
          //console.log(data);
          return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {

          let userData = {}
          //userData[dpNo] = url
          //firebase.database().ref('users').child(uid).update({ ...userData})

          let obj = {}
          obj["load"] = false
          obj["dp"] = url
          this.setState(obj)

        })
        .catch((error) => {
          console.log(error)
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

  render() {
    const { loading, error, success } = this.props;

    const dpr = this.state.dp ? (<TouchableOpacity onPress={ () => this.openPicker() }><Image
         style={{width: 100, height: 100, margin: 5}}
         source={{uri: this.state.dp}}
       /></TouchableOpacity>) : (<Button
      onPress={ () => this.openPicker() }
      title={ "Change Picture" }
    />)

    const dps = this.state.load ? <ActivityIndicator animating={this.state.load} /> : (<View>
      <View style={{flexDirection: "row"}}>
        { dpr }
      </View>
    </View>)

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
              <Label>Camas</Label>
              <Input
                value={this.state.bedrooms}
                onChangeText={v => this.handleChange('bedrooms', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>Banheiros</Label>
              <Input
                value={this.state.bathrooms}
                onChangeText={v => this.handleChange('bathrooms', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>Tipo de Residência</Label>
              <Input
                value={this.state.types}
                onChangeText={v => this.handleChange('types', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>Descrição</Label>
              <Input
                value={this.state.description}
                onChangeText={v => this.handleChange('description', v)}
              />
            </Item>

            <View stackedLabel>
              <Button style={{width: "50%", marginLeft: 'auto', marginRight: 'auto', marginTop: 20 }} block onPress={ () => this.openPicker() }><Text>Enviar Imagem</Text></Button>
            </View>

            <Spacer size={20} />

            
            
            <Button style={{marginBottom: 20}} block onPress={this.handleSubmit}>
              {this.form()}
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default UpdateRealEstate;
