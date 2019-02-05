import status from './status';
import member from './member';
import recipes from './recipes';
import categories from './categories';
import products from './products';
import favorite from './favorite';
import contact from './contact';

const rehydrated = (state = false, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return null;
    default:
      return state;
  }
};


export default {
  rehydrated,
  status,
  member,
  recipes,
  categories,
  products,
  favorite,
  contact
};
