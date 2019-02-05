import Store from '../store/favorite';

export const initialState = Store;

export default function favoriteReducer(state = initialState, action) {
    switch (action.type) {

case 'GET_FAVORITE': {
    return {
      ...state,
      favorite: action.data
    };
  }

  default:
  return state;
  }
}