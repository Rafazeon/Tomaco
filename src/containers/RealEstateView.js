import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRealEstateWithFilters, setError, setRealEstate, getRealEstate } from '../actions/real-estate';
import { getEmployee } from '../actions/member';
import { createFavorite } from '../actions/favorite';

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
      color: ''
    }

    this.addFavorite = this.addFavorite.bind(this)
  }

  starColor() {
    var favoriteItem = this.props.favoriteItem
    var imobiId = this.state.imobiId ? this.state.imobiId : this.props.match.params.id
    
    favoriteItem.favorite.filter((item) => {
        console.log(item.imobiId)
        console.log(imobiId)
      if(item.imobiId == imobiId && item.status == true) {
        this.setState({color: 'red'})
      }else{
        this.setState({color: 'gray'})
      }
    }) 
  }
  
  componentDidMount = () => {     
    if(this.props.realestate.apply_filters === false) {
        this.props.getRealEstate()
    }else{
        this.props.getRealEstateWithFilters()
    }
    this.props.getEmployee()
    this.starColor()
  }

  addFavorite(imobiId, status) {
    this.setState({imobiId: imobiId})
    const obj = {
      userId: this.props.member.uid,
      imobiId: imobiId,
      email: this.props.member.email,
      status: status
    }
    this.props.onFormFavorite(obj).then(response => {
        this.starColor()
    })
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
  onFormFavorite: createFavorite
};

export default connect(mapStateToProps, mapDispatchToProps)(RealEstate);
