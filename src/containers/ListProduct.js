import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getProduct, setProduct } from '../actions/products';

class ListProductContainer extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    memberLogout: PropTypes.func.isRequired,
    getMemberData: PropTypes.func.isRequired,
    member: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
    }).isRequired,
  }

  componentDidMount = () => this.props.getProduct()

  render = () => {
    const { Layout, member, products, setProduct } = this.props;

    return <Layout member={member} products={products} setProduct={setProduct} />;
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
  products: state.products.product || []
});

const mapDispatchToProps = {
  getProduct,
  setProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(ListProductContainer);
