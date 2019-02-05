import Store from '../store/categories';

export const initialState = Store;

export default function favoriteReducer(state = initialState, action) {
    switch (action.type) {

case 'GET_CATEGORY': {
    return {
      ...state,
      category: action.data
    };
  }

  default:
  return state;
  }
}