import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createProductOffer } from '../actions/products';

class OfferProductViewContainer extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    memberLogout: PropTypes.func.isRequired,
    getMemberData: PropTypes.func.isRequired,
    member: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
    }).isRequired,
  }

  render = () => {
    const { Layout, member, params, onFormSubmit } = this.props;

    return <Layout member={member} item={params} onFormSubmit={onFormSubmit}  />;
  }
}

const mapStateToProps = state => ({
  member: state.member || {}
});

const mapDispatchToProps = {
  onFormSubmit: createProductOffer
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferProductViewContainer);
