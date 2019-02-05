import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Form, Item, Label, Input, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Messages from './Messages';
import Header from './Header';
import Spacer from './Spacer';

class CreateCategory extends React.Component {
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
      value: '',
      image: '',
      price: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  } 

  handleSubmit = () => {
    this.props.onFormSubmit(this.state)
      .then(Actions.createProduct())
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { loading, error } = this.props;
    
    // Loading
    if (loading) return <Loading />;

    return (
      <Container>
        <Content padder>
        
          <Form>
            <Item stackedLabel>
              <Label>Nome</Label>
              <Input onChangeText={v => this.handleChange('value', v)} />
            </Item>

            <Spacer size={20} />

            <Button style={{marginBottom: 20}} block onPress={this.handleSubmit}>
              <Text>Cadastrar</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default CreateCategory;
