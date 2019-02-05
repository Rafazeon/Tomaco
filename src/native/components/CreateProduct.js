import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Container, Content, Text, Form, Item, Label, Input, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Messages from './Messages';
import Header from './Header';
import Spacer from './Spacer';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';
import * as firebase from 'firebase';
import { Dropdown } from 'react-native-material-dropdown';

class CreateProduct extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image: '',
      price: '',
      category: '',
      status: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }

  handleSubmit = () => {
    this.props.onFormSubmit(this.state)
      .then(Actions.listProduct())
      .catch(e => console.log(`Error: ${e}`));
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
      multiple: false,
      useFrontCamera: false
    }).then(image => {
      this.setState({
        image: image
      });
    files: image
    testFile = image.path 
      var files = image
      let mime = 'image/jpg'
      let blob = new Blob(RNFetchBlob.wrap(testFile), { type : 'image/jpg;BASE64'})
          // set it up
      firebase.storage().ref('Images').constructor.prototype.putFiles = function(files) { 
        var ref = this;
          return ref.child(image.modificationDate).put(blob, { contentType: mime });
      }
    
      // use it!
      firebase.storage().ref('Images').putFiles(files)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    const { categories } = this.props

    return (
      <Container>
        <Content padder>
          <Form>  
            <Dropdown
                label='Selecione o tipo de alimento'
                data={categories}
                onChangeText={v => this.handleChange('category', v)}
              />

              <Item stackedLabel>
                <Label>Nome</Label>
                <Input onChangeText={v => this.handleChange('name', v)} />
              </Item>

              <Item stackedLabel>
                <Label>Preço</Label>
                <Input onChangeText={v => this.handleChange('price', v)} />
              </Item>

            <Button style={{width: "50%", marginLeft: 'auto', marginRight: 'auto', marginTop: 20, marginBottom: 20 }} block onPress={ this.pickMultiple.bind(this) }><Text>Enviar Foto </Text></Button>

            <Button style={{marginBottom: 20}} block onPress={this.handleSubmit}>
              <Text>Cadastrar</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default CreateProduct;
