import { Firebase, FirebaseRef } from '../lib/firebase';
import * as firebase from 'firebase';
import { array } from 'lodash/array';

/**
  * Sign Up to Firebase
  */
export function createRealEstate(formData) {
  const {
    id,
    title,
    description,
    bedrooms,
    bathrooms,
    types_goal,
    images, 
    suites,
    vacancies,
    area,
    cep,
    address,
    number,
    complement,
    uf,
    city,
    neighborhood,
    price
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Go to Firebase
    const ref = FirebaseRef.child('imobi').push()
    const key = ref.key;

    ref.set({
            id: key,
            title, 
            description,
            bedrooms,
            bathrooms,
            types_goal,
            images,
            suites,
            vacancies,
            area,
            cep,
            address,
            number,
            complement,
            uf,
            city,
            neighborhood,
            price
          }).then(() => statusMessage(dispatch, 'loading', false)
          .then(resolve))
      .catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'REAL_ESTATE_ERROR',
    data: message,
  })));
}

export function getRealEstate() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise(resolve => FirebaseRef.child('imobi')
    .on('value', (snapshot) => {
        const realestate = snapshot.val() || {};
        const realestatelist = Object.values(realestate);
        return resolve(dispatch({
          type: 'GET_REAL_ESTATE',
          data: realestatelist
        }));
    })).catch(e => console.log(e)); 
}

export function getRealEstateWithFilters() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return (dispatch, getState) => {
    const state = getState();
    const apply_filters = state.realestate.apply_filters;
    const filters = state.realestate.filters;
    const types = filters.types + ' ' + filters.goal;

    if(!apply_filters) {
      return getRealEstate();
    }
    
    // Função para filtrar items no front end
    const filter_fcn = item => {
      let filter_price = (filters.goal == 'Alugar') ? 
        item.price > filters.price_rent[0] && item.price < filters.price_rent[1] :
        item.price > filters.price_sell[0] && item.price < filters.price_sell[1];

      let filterAreaPrice = item.area > filters.area[0] && 
                            item.area < filters.area[1] && 
                            filter_price;
      
      if(!filterAreaPrice) {
        return false;
      }

      if(!filters.bedrooms && !filters.bathrooms && !filters.vacancies) {
        return filterAreaPrice;
      }

      const filterMap = {
        bedrooms: filters.bedrooms,
        bathrooms: filters.bathrooms,
        vacancies: filters.vacancies
      }

      
  
      let filterMapResult;
      for(var key in filterMap) {
        if(filterMap[key] === 5) {
          filterMapResult = filterMap[key] >= 5 === item[key] >= 5;
        }else{
          filterMapResult = filterMap[key] ? filterMap[key] === item[key] : true;
        }
        
        if(!filterMapResult) {
          return false;
        }
      }

      return true;
    };
    let fireBaseCall = FirebaseRef.child('imobi');

    return new Promise(resolve => fireBaseCall.orderByChild('types_goal').equalTo(types)
    .once('value', (snapshot) => {
        const realestate = snapshot.val() || {};
        const realestatelist = Object.values(realestate);
        const realestatelistfiltered = _.filter(realestatelist, filter_fcn);
        return resolve(dispatch({
          type: 'GET_REAL_ESTATE',
          data: realestatelistfiltered
        }));
    })).catch(e => console.log(e));
  } 
}

export function setRealEstate(formData) {
const {
    id: id,
    title: title,
    description: description,
    bedrooms: bedrooms,
    bathrooms: bathrooms,
    types_goal: types_goal,
    images: images,
    suites: suites,
    vacancies: vacancies,
    area: area,
    cep: cep,
    address: address,
    number: number,
    complement: complement,
    uf: uf,
    city: city,
    neighborhood: neighborhood,
    price: price
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/imobi/' + id] = formData;
    return firebase.database().ref().update(updates);
  })
}

export function deleteRealEstate(formData) {
  const {
      id: id,
      title: title,
      description: description,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      types_goal: types_goal,
      images: images,
      suites: suites,
      vacancies: vacancies,
      area: area,
      cep: cep,
      address: address,
      number: number,
      complement: complement,
      uf: uf,
      city: city,
      neighborhood: neighborhood,
      price: price
    } = formData;
  
    return dispatch => new Promise(async (resolve, reject) => {
      // Write the new post's data simultaneously in the posts list and the user's post list.
      return firebase.database().ref('/imobi/' + id).remove();
    })
  }

  // FILTERS
export function setRealEstateFilters(filters) {
  return dispatch => dispatch({type: 'SET_REAL_ESTATE_FILTERS', data: filters});
}

export function cleanRealEstateFilters(filters) {
  return dispatch => dispatch({type: 'CLEAN_REAL_ESTATE_FILTERS', data: filters});
}
