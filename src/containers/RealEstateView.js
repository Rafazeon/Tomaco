import React, { Component } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { getRealEstateWithFilters, setError, setRealEstate, getRealEstate } from '../actions/real-estate';
import { getEmployee, getMemberData } from '../actions/member';
import { setFavorite } from '../actions/favorite';
import { createContact } from '../actions/contact';

class RealEstate extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    realestate: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      realestate: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    getRealEstate: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired
  }

  static defaultProps = {
    match: null,
  }
  
  constructor(props) {
    super(props)

    this.state = {
      imobiId: '',
      color: '',
      status: false,
      name: '',
      email: '',
      phone: ''
    }

    this.addFavorite = this.addFavorite.bind(this)
    this.sendContact = this.sendContact.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  
  componentDidMount = () => {     
    if(this.props.realestate.apply_filters === false) {
        this.props.getRealEstate()
    }else{
        this.props.getRealEstateWithFilters()
    }
    this.props.getEmployee()
    this.props.getMemberData()
    Actions.refresh({title: this.props.match.params.title})
  }

  addFavorite(imobiId) {
    this.setState({status: true})
    const obj = {
        id: this.props.match.params.id,
        userId: this.props.member.uid,
        imobiId: imobiId,
        email: this.props.member.email,
        status: this.state.status
    }
    
    this.props.setFavorite(obj)
  }

  sendContact(imobi) {
    const data = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      imobi: imobi
    }

    if(!data.name) {
      return Alert.alert('Preencha seu nome')
    }

    if(!data.email || !data.phone){
      return Alert.alert('Preencha seu email ou telefone')
    }
    
    this.props.createContact(data).then(
      Alert.alert('Contato Enviado, Obrigado')
    )
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }
  
  /**
    * Fetch Data from API, saving to Redux
    */
  fetchRealEstate = () => { 
    return this.props.getRealEstate()
  }
  
  render = () => {
    const { Layout, realestate, filters, editrealestate, match, onFormSubmit, member, favoriteItem, latlong } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;
    
    return (
      <Layout
        realestateId={id}
        error={realestate.error}
        loading={realestate.loading}
        realestate={realestate.realestate}
        reFetch={() => this.fetchRealEstate()} 
        onFormSubmit={onFormSubmit}
        editrealestate={true}
        filters={filters}
        imobi={member.imobi}
        params={match.params}
        addFavorite={this.addFavorite}
        favoriteItem={favoriteItem}
        color={this.state.color}
        userId={member.uid}
        latlong={latlong}
        handleChange={this.handleChange}
        sendContact={this.sendContact}
      />
    );
  }
}

const mapStateToProps = state => (
  { filters: state.realestate.filters,
    realestate: state.realestate || {},
    member: state.member || {},
    favoriteItem: state.favorite || {},
    latlong: state.realestate.latlong || {}
  }
);

const mapDispatchToProps = {
  getRealEstate,
  getRealEstateWithFilters,
  setError,
  onFormSubmit: setRealEstate,
  getEmployee,
  setFavorite,
  getMemberData,
  createContact
};

export default connect(mapStateToProps, mapDispatchToProps)(RealEstate);
