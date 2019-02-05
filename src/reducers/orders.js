import Store from '../store/orders';

export const initialState = Store;

export default function orderReducer(state = initialState, action) {
    switch (action.type) {

case 'GET_ORDER': {
    return {
      ...state,
      order: action.data
    };
  }

  default:
  return state;
  }
}
