import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateProfile } from '../actions/member';

const UpdateProfile = ({
  Layout,
  onFormSubmit,
  member
}) => (
  <Layout
    member={member}
    onFormSubmit={onFormSubmit}
  />
);

UpdateProfile.propTypes = {
  Layout: PropTypes.func.isRequired,
  member: PropTypes.shape({}).isRequired,
  onFormSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  member: state.member || {},
});

const mapDispatchToProps = {
  onFormSubmit: updateProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
