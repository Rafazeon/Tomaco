import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Container, Content, Text, Form, Item, Label, Input, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Messages from './Messages';
import Header from './Header';
import Spacer from './Spacer';
import * as firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';

class SignUp extends React.Component {
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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
      imobi: this.props.member && this.props.member.imobi,
      image: '',
      role: 'Employee'
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
  }

  handleSubmit = () => {
    this.props.onFormSubmit(this.state)
      .then(() => Actions.login())
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { loading, error } = this.props;
    console.log(this.state.image)
    // Loading
    if (loading) return <Loading />;

    return (
      <Container>
        <Content padder>
          <Header
            title="Bem Vindo"
            content="Faça seu registro aqui"
          />

          {error && <Messages message={error} />}

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
            <Item stackedLabel>
              <Label>Nome</Label>
              <Input onChangeText={v => this.handleChange('firstName', v)} />
            </Item>

            <Item stackedLabel>
              <Label>Sobrenome</Label>
              <Input onChangeText={v => this.handleChange('lastName', v)} />
            </Item>

            <Item stackedLabel>
              <Label>Email</Label>
              <Input
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={v => this.handleChange('email', v)}
              />
            </Item>
            {!!firebase.auth().currentUser ? <Item></Item> :
            <Item stackedLabel>
              <Label>Imobiliária</Label>
              <Input
                onChangeText={v => this.handleChange('imobi', v)}
              />
            </Item>
            }

            <Item stackedLabel>
              <Label>Senha</Label>
              <Input secureTextEntry onChangeText={v => this.handleChange('password', v)} />
            </Item>

            <Item stackedLabel>
              <Label>Confirmar Senha</Label>
              <Input secureTextEntry onChangeText={v => this.handleChange('password2', v)} />
            </Item>

            <Spacer size={20} />
            
            <Button value={this.state.image} style={{width: "50%", marginLeft: 'auto', marginRight: 'auto', marginTop: 20, marginBottom: 20 }} block onPress={ this.pickMultiple.bind(this) }><Text>Enviar Logo </Text></Button>

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
