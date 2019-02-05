import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Container, Content, Text, Form, Item, Label, Input, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Messages from './Messages';
import Header from './Header';
import Spacer from './Spacer';
import * as firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';
import RadioGroup from 'react-native-radio-buttons-group';
import TextInputMask from 'react-native-text-input-mask';

class SignUp extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      dap: '',
      date: '',
      password: '',
      password2: '',
      car: '',
      image: '',
      licence: '',
      cep: '',
      city: '',
      role: '',
      cpf: '',
      cnpj: '',
      data: [
        {
            label: 'CPF',
        },

        {
            label: 'CNPJ',
        },
      ],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
    if(this.state.cpf) {
      this.setState({role: 'User'})
    }else{
      this.setState({role: 'Employee'})
    }
  }

  handleSubmit = () => {
    this.props.onFormSubmit(this.state)
      .then(() => Actions.login())
      .catch(e => console.log(`Error: ${e}`));
  }

  onPress = data => this.setState({ data });

  render() {
    let selectedButton = this.state.data.find(e => e.selected == true);
    selectedButton = selectedButton ? selectedButton.value : this.state.data[0].label;
    console.log(this.state.image)

    return (
      <Container>
        <Content padder>
          <Header
            title="Bem Vindo"
            content="Faça seu registro aqui"
          />

          <Form>
          {this.state.image ? 
            <Image
                source={{ uri: "https://firebasestorage.googleapis.com/v0/b/imobi-cbf7c.appspot.com/o/Images%2F" + this.state.image.modificationDate + "?alt=media" }}
                style={{
                  height: 200,
                  width: null,
                  flex: 1
                }}
              />
            : <Text></Text>}
              <RadioGroup flexDirection='row' radioButtons={this.state.data} onPress={this.onPress} />    
        
              
            <Item stackedLabel>
              <Label>{selectedButton}</Label>
              <TextInputMask 
                    style={{marginLeft: 20, marginRight: 20, width: '100%'}}
                    refInput={ref => { this.input = ref }}
                    onChangeText={(formatted, extracted) => {
                        this.handleChange(selectedButton == 'CPF' ? 'cpf' : 'cnpj', extracted)
                    }}
                    mask={selectedButton == 'CPF' ? '[000].[000].[000]-[00]' : '[00].[000].[000]/[0000].[00]' }  />
              <Input  /> 
            </Item>
              
            
            <Item stackedLabel>
              <Label>Nome</Label>
              <Input onChangeText={v => this.handleChange('firstName', v)} />
            </Item>

            <Item stackedLabel>
              <Label>Email</Label>
              <Input
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={v => this.handleChange('email', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>DAP</Label>
              <Input onChangeText={v => this.handleChange('dap', v)} />
            </Item>

            <Item stackedLabel>
              <Label>Validade</Label>
              <Input
                autoCapitalize="none"
                onChangeText={v => this.handleChange('date', v)}
              />
            </Item>
            
            <Item stackedLabel>
              <Label>CAR</Label>
              <Input
                onChangeText={v => this.handleChange('car', v)}
              />
            </Item>
            

            <Item stackedLabel>
              <Label>Licença</Label>
              <Input onChangeText={v => this.handleChange('licence', v)} />
            </Item>

            <Item stackedLabel>
              <Label>CEP</Label>
              <Input onChangeText={v => this.handleChange('cep', v)} />
            </Item>

            <Item stackedLabel>
              <Label>Cidade</Label>
              <Input onChangeText={v => this.handleChange('city', v)} />
            </Item>

            <Item stackedLabel>
              <Label>Senha</Label>
              <Input secureTextEntry onChangeText={v => this.handleChange('password', v)} />
            </Item>

            <Item stackedLabel>
              <Label>Confirmar Senha</Label>
              <Input secureTextEntry onChangeText={v => this.handleChange('password2', v)} />
            </Item>

            <Spacer size={20} />
            
            <Button value={this.state.image} style={{width: "50%", marginLeft: 'auto', marginRight: 'auto', marginTop: 20, marginBottom: 20 }} block onPress={ this.pickMultiple.bind(this) }><Text>Enviar Foto </Text></Button>

            <Button style={{marginBottom: 20}} block onPress={this.handleSubmit}>
              <Text>Cadastrar</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default SignUp;
