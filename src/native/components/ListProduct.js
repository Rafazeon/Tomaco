import React, { Component } from 'react';
import { Image, TouchableOpacity, FlatList } from 'react-native';
import { Container, Content, Text, CardItem , Card, Button, Body, CheckBox} from 'native-base';
import Spacer from './Spacer';

class ListProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image: '',
      price: '',
      status: ''
    };
  }

  render() {
    const { products } = this.props;

    const onPress = item => {
    if(item.status == true) {
        this.props.setProduct(item.id, false)
    }else{
        this.props.setProduct(item.id, true)
    }
}
    console.log(products)
    return (
      <Container>
        <Content padder>
        
        <FlatList
          numColumns={2}
          data={products}
          renderItem={({ item }) => (
            <Card transparent style={{ paddingHorizontal: 6 }}>
              <CardItem cardBody>
                <TouchableOpacity onPress={() => onPress(item)} style={{ flex: 1 }}>
                <Card style={{padding: 5}}> 
                
                  <Image
                    source={{ uri: "https://firebasestorage.googleapis.com/v0/b/copyagro-d9155.appspot.com/o/Images%2F" + item.image.modificationDate + "?alt=media" }} width={200} height={200}
                    style={{
                      height: 150,
                      width: null,
                      flex: 1,
                      borderRadius: 5
                    }}
                  />
                
                  </Card> 
                </TouchableOpacity>
              </CardItem>
              <CardItem cardBody>
                <Body>
                  <Button
                    block
                    bordered
                    small
                    onPress={() => onPress(item)}
                  >
                    <CheckBox checked={item.status == true} /><Text>{item.name}</Text>
                  </Button>
                  <Spacer size={5} />
                </Body>
              </CardItem>
            </Card>
          )}
        />

        </Content>
      </Container>
    );
  }
}

export default ListProduct;
