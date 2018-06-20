import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRealEstate, setError, setRealEstate, deleteRealEstate } from '../actions/real-estate';

class DeleteRealEstate extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    realestate: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      realestate: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    getRealEstate: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired
  }

  static defaultProps = {
    match: null,
  }

  componentDidMount = () => this.fetchRealEstate();

  /**
    * Fetch Data from API, saving to Redux
    */
   fetchRealEstate = () => {
    return this.props.getRealEstate()
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });
  }

  

  render = () => {
    const { Layout, realestate, delrealestate, match, onFormSubmit } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    return (
      <Layout 
        realestateId={id}
        error={realestate.error}
        loading={realestate.loading}
        realestate={realestate.realestate}
        reFetch={() => this.fetchRealEstate()}
        onFormSubmit={onFormSubmit}
        delrealestate={true}
      />
    );
  }
}

const mapStateToProps = state => ({
  realestate: state.realestate || {},
});

const mapDispatchToProps = {
  getRealEstate,
  setError,
  onFormSubmit: deleteRealEstate
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteRealEstate);
