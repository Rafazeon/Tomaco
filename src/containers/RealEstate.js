import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OneSignal from 'react-native-onesignal'; // Import package from node modules

import { getRealEstateWithFilters, setError, setRealEstate, getRealEstate, getRealEstateMap, cleanRealEstateMap } from '../actions/products';
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
    OneSignal.init("2c855fb8-935d-4e0f-9678-1b1c1f81f3a9");

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);

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

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
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
