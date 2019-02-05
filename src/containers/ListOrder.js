import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getOrder } from '../actions/orders';

class ListOrderContainer extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    memberLogout: PropTypes.func.isRequired,
    getMemberData: PropTypes.func.isRequired,
    member: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
    }).isRequired,
  }

  componentDidMount = () => this.props.getOrder()

  render = () => {
    const { Layout, member, orders } = this.props;

    return <Layout member={member} orders={orders} />;
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
  orders: state.orders.order || []
});

const mapDispatchToProps = {
  getOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOrderContainer);
