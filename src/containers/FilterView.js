import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setRealEstateFilters, cleanRealEstateFilters } from '../actions/real-estate';

class FilterView extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    setRealEstateFilters: PropTypes.func.isRequired,
    cleanRealEstateFilters: PropTypes.func.isRequired,
  }

  render = () => {
    const { Layout, filters, setRealEstateFilters, cleanRealEstateFilters } = this.props;

    return <Layout 
        filters={filters}
        setFilterState={setRealEstateFilters} 
        cleanFilterState={cleanRealEstateFilters}
        />;
  }
}

const mapStateToProps = state => ({
  filters: state.realestate.filters,
  apply_filters: state.realestate.apply_filters,
});

const mapDispatchToProps = {
    setRealEstateFilters,
    cleanRealEstateFilters
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterView);
