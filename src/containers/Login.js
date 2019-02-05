import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login } from '../actions/member';

const Login = ({
  Layout,
  onFormSubmit,
  member
}) => (
  <Layout
    member={member}
    onFormSubmit={onFormSubmit}
  />
);

Login.propTypes = {
  Layout: PropTypes.func.isRequired,
  member: PropTypes.shape({}).isRequired,
  onFormSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  member: state.member || {}
});

const mapDispatchToProps = {
  onFormSubmit: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
