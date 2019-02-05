import Store from '../store/products';
import merge from 'lodash/merge';

export const initialState = Store;

export default function productReducer(state = initialState, action) {
    switch (action.type) {

  case 'REAL_ESTATE_ERROR': {
    return {
      ...state,
      error: action.data,
    };
  }

  case 'GET_PRODUCT': {
    return {
      ...state,
      product: action.data
    };
  }

  case 'FILTER_PRODUCT': {
    return {
      ...state,
      filter: action.data
    };
  }

  case 'GET_MAP': {
    const latlong = {
      latlong: action.data
    };
      return merge({}, state, latlong);
  }

  case 'CLEAN_MAP': {
    const latlong = {
      latlong: initialState.latlong
    };
      return merge({}, state, latlong);
  }
  
  case 'SET_REAL_ESTATE_FILTERS':
  {
      const filters = {
        filters: action.data,
        apply_filters: true
      };
      return merge({}, state, filters);
  }
  case 'CLEAN_REAL_ESTATE_FILTERS':
  {
    const filters = {
      filters: initialState.filters,
      apply_filters: false
    };
      return merge({}, state, filters);
  }

  default:
  return state;
}
}