import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Left, Right, Icon } from 'native-base';

class ListOrder extends Component {
  render() {
    return (
    <Container>
        <Content>
        {this.props.orders.map(item => (
          <List>
            <ListItem itemDivider>
              <Text>Pedido: {item.pedido}</Text>
            </ListItem>                    
            <ListItem>
              <Text>Entrega: {item.entrega}</Text>
            </ListItem>
            <ListItem>
              <Text>Validade: {item.validade}</Text>
            </ListItem>
            <ListItem>
              <Text>Lote: {item.lote}</Text>
            </ListItem>
            <ListItem>
              <Text>Medida: {item.medida}</Text>
            </ListItem>
            <ListItem>
              <Text>Produto: {item.produto}</Text>
            </ListItem>
            <ListItem>
              <Text>Quantidade: {item.quantidade}</Text>
            </ListItem>
            <ListItem>
              <Text>Preço: {item.preco}</Text>
            </ListItem>
            <ListItem>
              <Text>Status: {item.status}</Text>
            </ListItem>
          </List>
          ))}
        </Content>
      </Container>
    );
  }
}

export default ListOrder