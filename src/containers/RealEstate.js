import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRealEstateWithFilters, setError, setRealEstate, getRealEstate, getRealEstateMap, cleanRealEstateMap } from '../actions/real-estate';
import { getEmployee, getMemberData } from '../actions/member';
import { getFavorite } from '../actions/favorite';

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

    this.getLatLong = this.getLatLong.bind(this)
  }

  async getLatLong(address) {
    this.props.cleanRealEstateMap(address)
    await this.props.getRealEstateMap(address)
  }
  
  componentDidMount = () => {     
    if(this.props.realestate.apply_filters === false) {
        this.props.getRealEstate()
    }else{
        this.props.getRealEstateWithFilters()
    }
    this.props.getEmployee()
    this.props.getFavorite().then(response => {
      console.log(response)
    })
    this.props.getMemberData()
  }
  
  /**
    * Fetch Data from API, saving to Redux
    */
  fetchRealEstate = () => { 
    return this.props.getRealEstate()
  }
  
  render = () => {
    const { Layout, realestate, filters, editrealestate, match, onFormSubmit, member, params, favorite, fav } = this.props;
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
        favorite={favorite.favorite}
        fav={fav}
        userId={member.uid}
        getLatLong={this.getLatLong}
        user={member}
      />
    );
  }
}

const mapStateToProps = state => (
  { filters: state.realestate.filters,
    realestate: state.realestate || {},
    member: state.member || {},
    favorite: state.favorite || {}
  }
);

const mapDispatchToProps = {
  getRealEstate,
  getRealEstateWithFilters,
  setError,
  onFormSubmit: setRealEstate,
  getEmployee,
  getFavorite,
  getMemberData,
  getRealEstateMap,
  cleanRealEstateMap
};

export default connect(mapStateToProps, mapDispatchToProps)(RealEstate);
