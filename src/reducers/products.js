import Store from '../store/products';
import merge from 'lodash/merge';

export const initialState = Store;

export default function productReducer(state = initialState, action) {
    switch (action.type) {

  case 'ERROR_PRODUCT': {
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

  default:
  return state;
}
}