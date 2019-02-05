import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { signUp } from '../actions/member';

const SignUp = ({
  Layout,
  onFormSubmit,
  member
}) => (
  <Layout
    member={member}
    onFormSubmit={onFormSubmit}
  />
);

SignUp.propTypes = {
  Layout: PropTypes.func.isRequired,
  member: PropTypes.shape({}).isRequired,
  onFormSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  member: state.member || {}
});

const mapDispatchToProps = {
  onFormSubmit: signUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
