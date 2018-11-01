import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Container, Content, List, ListItem, Body, Left, Text, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Header from './Header';

const Profile = ({ member, logout, updateRealEstate }) => (
  <Container>
    <Content>
      <List>
        {(member && member.email) ?
          <View>
            <Content padder>
              <Header
                title={`Oi ${member.firstName},`}
                content={`Atualmente logado como ${member.email}`}
              />
            </Content>

            <ListItem onPress={Actions.updateProfile} icon>
              <Left>
                <Icon name="person-add" />
              </Left>
              <Body>
                <Text>Atualizar Perfil</Text>
              </Body>
            </ListItem>
            
            {member.role == 'Admin' && 
            <ListItem onPress={Actions.signUp} icon>
              <Left>
                <Icon name="add-circle" />
              </Left>
              <Body>
                <Text>Cadastrar Funcionário</Text>
              </Body>
            </ListItem>
            }
            
            {member.imobi !== '' &&
            <ListItem onPress={Actions.updateRealEstate} icon>
              <Left>
                <Icon name="home" />
              </Left>
              <Body>
                <Text>Cadastrar Imóvel</Text>
              </Body>
            </ListItem>
            }

            <ListItem onPress={logout} icon>
              <Left>
                <Icon name="power" />
              </Left>
              <Body>
                <Text>Sair</Text> 
              </Body>
            </ListItem>
          </View>
        :
          <View>
            <Content padder>
              <Header
                title="Ola,"
                content="Faça login para ter acesso a outros conteúdos"
              />
            </Content>

            <ListItem onPress={Actions.login} icon>
              <Left>
                <Icon name="power" />
              </Left>
              <Body>
                <Text>Login</Text>
              </Body>
            </ListItem>

            <ListItem onPress={Actions.signUpUser} icon>
              <Left>
                <Icon name="add-circle" />
              </Left>
              <Body>
                <Text>Registrar</Text>
              </Body>
            </ListItem>
            
            <ListItem onPress={Actions.forgotPassword} icon>
              <Left>
                <Icon name="help-buoy" />
              </Left>
              <Body>
                <Text>Esqueci a Senha</Text>
              </Body>
            </ListItem>
          </View>
        }
      </List>
    </Content>
  </Container>
);

Profile.propTypes = {
  member: PropTypes.shape({}),
  logout: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  member: {},
};

export default Profile;
