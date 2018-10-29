import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRealEstateWithFilters, setError, setRealEstate, getRealEstate } from '../actions/real-estate';
import { getEmployee } from '../actions/member';
import { createFavorite, setFavorite } from '../actions/favorite';

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
      status: false
    }

    this.addFavorite = this.addFavorite.bind(this)
  }
  
  componentDidMount = () => {     
    if(this.props.realestate.apply_filters === false) {
        this.props.getRealEstate()
    }else{
        this.props.getRealEstateWithFilters()
    }
    this.props.getEmployee()
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
  
  /**
    * Fetch Data from API, saving to Redux
    */
  fetchRealEstate = () => { 
    return this.props.getRealEstate()
  }
  
  render = () => {
    const { Layout, realestate, filters, editrealestate, match, onFormSubmit, member, params, favoriteItem } = this.props;
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
        params={params}
        addFavorite={this.addFavorite}
        favoriteItem={favoriteItem}
        color={this.state.color}
      />
    );
  }
}

const mapStateToProps = state => (
  { filters: state.realestate.filters,
    realestate: state.realestate || {},
    member: state.member || {},
    favoriteItem: state.favorite || {}
  }
);

const mapDispatchToProps = {
  getRealEstate,
  getRealEstateWithFilters,
  setError,
  onFormSubmit: setRealEstate,
  getEmployee,
  onFormFavorite: createFavorite,
  setFavorite
};

export default connect(mapStateToProps, mapDispatchToProps)(RealEstate);
