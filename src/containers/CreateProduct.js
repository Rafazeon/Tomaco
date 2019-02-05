import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createProduct } from '../actions/products';
import { getCategory } from '../actions/categories';

class createProductContainer extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    memberLogout: PropTypes.func.isRequired,
    getMemberData: PropTypes.func.isRequired,
    member: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
    }).isRequired,
  }

  componentDidMount = () => this.props.getCategory()

  render = () => {
    const { Layout, member, onFormSubmit, categories } = this.props;

    return <Layout member={member} onFormSubmit={onFormSubmit} categories={categories} />;
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
  categories: state.categories.category || []
});

const mapDispatchToProps = {
  onFormSubmit: createProduct,
  getCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(createProductContainer);
