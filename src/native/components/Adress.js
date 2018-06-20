import React, { Component } from 'react'
import {View, Label, Card, CardItem, Item, Text, Input, Button} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'

class Adress extends Component{
    render() {
        return (
        <View>
          <Card>
              <CardItem>
                 <View style={{flexDirection: 'row'}}>     
                   <Icon style={{position: 'relative', top: 5}} name="check" />    
                    <Text style={{marginLeft: 10}}>
                        Cadastro de Endereço
                    </Text>
                  </View>
              </CardItem>
          </Card>
          
            <Item stackedLabel>
              <Label>CEP</Label>
              <Input
                onSelectionChange={() => this.props.searchCep()}
                value={this.props.cep}
                onChangeText={v => this.props.change('cep', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>Endereço</Label>
              <Input
                value={this.props.address}
                onChangeText={v => this.props.change('address', v)}
              />
            </Item>

            <View style={{flexDirection: 'row', width: '100%'}}>
              <Item stackedLabel style={{flex: 1}}>
                <Label>Número</Label>
                <Input
                  value={this.props.number}
                  onChangeText={v => this.props.change('number', v)}
                />
              </Item>

              <Item stackedLabel style={{flex: 1, marginLeft: 30}}>
                <Label>Complemento</Label>
                <Input
                  value={this.props.complement}
                  onChangeText={v => this.props.change('complement', v)}
                />
              </Item>
            </View> 

            <View style={{flexDirection: 'row', width: '100%'}}>
              <Item stackedLabel style={{flex: 1}}>
                <Label>UF</Label>
                <Input
                  value={this.props.uf}
                  onChangeText={v => this.props.change('uf', v)}
                />
              </Item>

              <Item stackedLabel style={{flex: 1, marginLeft: 30}}>
                <Label>Cidade</Label>
                <Input
                  value={this.props.city}
                  onChangeText={v => this.props.change('city', v)}
                />
              </Item>
            </View>

            <Item stackedLabel>
              <Label>Bairro</Label>
              <Input
                value={this.props.neighborhood}
                onChangeText={v => this.props.change('neighborhood', v)}
              />
            </Item>
            </View>
            
        )
    }
}

export default Adress