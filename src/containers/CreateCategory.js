import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createCategory } from '../actions/categories';

class createCategoryContainer extends Component {
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
    const { Layout, member, onFormSubmit } = this.props;

    return <Layout member={member} onFormSubmit={onFormSubmit} />;
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
});

const mapDispatchToProps = {
  onFormSubmit: createCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(createCategoryContainer);
