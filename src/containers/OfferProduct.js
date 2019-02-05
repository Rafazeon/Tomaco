import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { filterProduct } from '../actions/products';

class OfferProductContainer extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    memberLogout: PropTypes.func.isRequired,
    getMemberData: PropTypes.func.isRequired,
    member: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
    }).isRequired,
  }

  componentDidMount = () => this.props.filterProduct()

  render = () => {
    const { Layout, member, filter } = this.props;

    return <Layout member={member} filter={filter}  />;
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
  filter: state.products.filter || []
});

const mapDispatchToProps = {
  filterProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferProductContainer);
