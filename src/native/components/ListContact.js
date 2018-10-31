import React, { Component } from 'react';
import { Container, Content, List, ListItem, Text, Icon, Body, Right } from 'native-base';


class ListEmployee extends Component {
  getContact() {
      var contact = this.props.contact
      var imobi = this.props.imobi
        return contact.map((item, index) => {
            if(item.imobi == imobi) {
                return (
                    <List key={index}>
                        <ListItem>
                        <Body>
                        <Text>Nome: {item.name}</Text>
                        <Text>E-mail: {item.email}</Text>
                        <Text>Telefone: {item.phone}</Text>
                        </Body>
                        <Right>
                            <Icon name="contact" />
                        </Right>
                        </ListItem>
                    </List>
                )
            }
        })
    }
 

  render() {
    return (
      <Container>
        <Content>
            
            {this.getContact()}
          
        </Content>
      </Container>
    );
  }
}

export default ListEmployee