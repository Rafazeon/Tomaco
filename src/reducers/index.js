import member from './member';
import categories from './categories';
import products from './products';
import favorite from './favorite';
import contact from './contact';
import orders from './orders';

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
  member,
  categories,
  products,
  favorite,
  contact,
  orders
};
