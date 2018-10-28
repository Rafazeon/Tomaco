import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Icon, Left, Right } from 'native-base';

class ListEmployee extends Component {
  getEmployee() {
      var employee = this.props.employee
      var imobi = this.props.member.imobi
        return employee.map((item) => {
            if(item.role == 'Employee' && item.imobi == imobi) {
                return (
                    <List>
                        <ListItem>
                        <Left>
                        <Text>{item.firstName + ' ' + item.lastName}</Text>
                        </Left>
                        <Right>
                            <Icon name="arrow-forward" />
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
            
            {this.getEmployee()}
          
        </Content>
      </Container>
    );
  }
}

export default ListEmployee