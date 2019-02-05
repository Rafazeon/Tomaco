import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createRealEstate } from '../actions/products';

const UpdateRealEstate = ({
  Layout,
  member,
  onFormSubmit,
  realestate,
  isLoading,
  errorMessage,
  successMessage,
  Create
}) => (
  <Layout
    realestate={realestate}
    loading={isLoading}
    error={errorMessage}
    success={successMessage}
    imobi={member.imobi}
    onFormSubmit={onFormSubmit}
    Create={true}
    user={member}
  />
);

UpdateRealEstate.propTypes = {
  Layout: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string
};

UpdateRealEstate.defaultProps = {
  errorMessage: null,
  successMessage: null,
};

const mapStateToProps = state => ({
  realestate: state.realestate || {},
  isLoading: state.status.loading || false,
  errorMessage: state.status.error || null,
  successMessage: state.status.success || null,
  member: state.member
});

const mapDispatchToProps = {
  onFormSubmit: createRealEstate,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRealEstate);
