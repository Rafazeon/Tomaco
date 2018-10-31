import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ListEmployee extends Component {
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
    const { Layout, params, contact} = this.props;

    return <Layout imobi={params} contact={contact}  />;
  }
}

const mapStateToProps = state => ({
  contact: state.contact.contact || {}
});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(ListEmployee);
