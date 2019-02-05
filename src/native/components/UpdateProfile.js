import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Body, ListItem, Form, Item, Label, Input, CheckBox, Button, View } from 'native-base';
import Messages from './Messages';
import Loading from './Loading';
import Header from './Header';
import Spacer from './Spacer';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';

class UpdateProfile extends React.Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    member: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      firstName: props.member.firstName || '',
      lastName: props.member.lastName || '',
      email: props.member.email || '',
      password: '',
      password2: '',
      changeEmail: false,
      changePassword: false,
      image: props.member.image || ''
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
      .then(() => console.log('Perfil Atualizado'))
      .then(Actions.login())
      .catch(e => console.log(`Error: ${e}`));
  }
  

  render() {
    return (
      <Container>
        <Content padder>
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
              <Input
                value={this.state.firstName}
                onChangeText={v => this.handleChange('firstName', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>Sobrenome</Label>
              <Input
                value={this.state.lastName}
                onChangeText={v => this.handleChange('lastName', v)}
              />
            </Item>

            <ListItem>
              <CheckBox
                checked={this.state.changeEmail}
                onPress={() => this.handleChange('changeEmail', !this.state.changeEmail)}
              />
              <Body>
                <Text>Alterar Email</Text>
              </Body>
            </ListItem>

            {this.state.changeEmail &&
              <Item stackedLabel>
                <Label>Email</Label>
                <Input
                  autoCapitalize="none"
                  value={this.state.email}
                  keyboardType="email-address"
                  onChangeText={v => this.handleChange('email', v)}
                />
              </Item>
            }

            <ListItem>
              <CheckBox
                checked={this.state.changePassword}
                onPress={() => this.handleChange('changePassword', !this.state.changePassword)}
              />
              <Body>
                <Text>Alterar Senha</Text>
              </Body>
            </ListItem>

            {this.state.changePassword &&
              <View padder>
                <Item stackedLabel>
                  <Label>Senha</Label>
                  <Input secureTextEntry onChangeText={v => this.handleChange('password', v)} />
                </Item>

                <Item stackedLabel last>
                  <Label>Confirmar Senha</Label>
                  <Input secureTextEntry onChangeText={v => this.handleChange('password2', v)} />
                </Item>
              </View>
            }

            {!!firebase.auth().currentUser &&
              <Button value={this.state.image} style={{width: "50%", marginLeft: 'auto', marginRight: 'auto', marginTop: 20, marginBottom: 20 }} block onPress={ this.pickMultiple.bind(this) }><Text>Enviar Logo </Text></Button>
            }

            <Spacer size={20} />

            <Button block onPress={this.handleSubmit}>
              <Text>Atualizar Perfil</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default UpdateProfile;
