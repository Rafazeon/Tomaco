import Store from '../store/real-estate';
import merge from 'lodash/merge';

export const initialState = Store;

export default function realEstateReducer(state = initialState, action) {
    switch (action.type) {

  case 'REAL_ESTATE_ERROR': {
    return {
      ...state,
      error: action.data,
    };
  }

  case 'GET_REAL_ESTATE': {
    let realestate = [];

    // Pick out the props I need, ERROR ACHO Q FALTA O DATABASE DELE
    if (action.data && typeof action.data === 'object') {
        realestate = action.data.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        bedrooms: item.bedrooms,
        bathrooms: item.bathrooms,
        types_goal: item.types_goal,
        image: item.images,
        suites: item.suites,
        vacancies: item.vacancies,
        area: item.area,
        cep: item.cep,
        address: item.address,
        number: item.number,
        complement: item.complement,
        uf: item.uf,
        city: item.city,
        neighborhood: item.neighborhood,
        price: item.price,
        imobi: item.imobi
      }));
      
    }

    return {
      ...state,
      error: null,
      loading: false,
      realestate
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