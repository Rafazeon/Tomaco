import React, { Component } from 'react'
import { Image } from 'react-native'
import { Container, Content, Text, CardItem , Card, Button, Body, Label, Item, Form, Input } from 'native-base';
import TextInputMask from 'react-native-text-input-mask';
class OfferProductView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: this.props.item.name
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
        const { item } = this.props
        console.log(item)
        return(
            <Container>
                <Content padder>
                <Form> 
                    <Image
                        source={{ uri: "https://firebasestorage.googleapis.com/v0/b/copyagro-d9155.appspot.com/o/Images%2F" + item.image.modificationDate + "?alt=media" }} width={200} height={200}
                        style={{
                        height: 200,
                        width: null,
                        flex: 1
                        }}
                    />

                    <Item stackedLabel>
                    <Label>Fornecedor</Label>
                    <Input onChangeText={v => this.handleChange('provider', v)} />
                    </Item>

                    <Item stackedLabel>
                    <Label>Lote</Label>
                    <Input onChangeText={v => this.handleChange('lot', v)} />
                    </Item>

                    <Item stackedLabel>
                    <Label>Medida</Label>
                    <Input onChangeText={v => this.handleChange('measure', v)} />
                    </Item>
                    
                    <Item stackedLabel>
                    <Label>Quantidade</Label>
                    <Input onChangeText={v => this.handleChange('amount', v)} />
                    </Item>

                    <Item stackedLabel>
                    <Label>Data Início</Label>
                    <TextInputMask 
                    style={{marginLeft: 20, marginRight: 20, width: '100%'}}
                    refInput={ref => { this.input = ref }}
                    onChangeText={(formatted, extracted) => {
                        this.handleChange('date_start', extracted)
                    }}
                    mask={"[00]/[00]/[0000]"}  />

                    </Item>

                    <Item stackedLabel>
                    <Label>Data Fim</Label>
                    <TextInputMask 
                    style={{marginLeft: 20, marginRight: 20, width: '100%'}}
                    refInput={ref => { this.input = ref }}
                    onChangeText={(formatted, extracted) => {
                        this.handleChange('date_finish', extracted)
                    }}
                    mask={"[00]/[00]/[0000]"}  />
                    </Item>

                    <Item stackedLabel>
                    <Label>Valor</Label>
                    <Input
                        autoCapitalize="none"
                        placeholder="R$"
                        onChangeText={v => this.handleChange('price', v)}
                    />
                    </Item>


                    <Button style={{marginBottom: 20, backgroundColor: 'green'}} block onPress={this.handleSubmit}>
                        <Text>OFERTAR</Text>
                    </Button>
                </Form>
                </Content>
            </Container>
        )
    }
}

export default OfferProductView