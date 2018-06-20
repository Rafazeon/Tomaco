import status from './status';
import member from './member';
import recipes from './recipes';
import realestate from './real-estate'

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
  realestate,
};
