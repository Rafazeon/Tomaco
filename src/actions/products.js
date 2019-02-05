import statusMessage from './status';
import { Firebase, FirebaseRef } from '../lib/firebase';
import * as firebase from 'firebase';
import { array } from 'lodash/array';
import axios from 'axios';

const key = "AIzaSyCrCsmgenHNfYgkdjXIn8AShOEXbksbX8M"

/**
  * Sign Up to Firebase
  */
export function createProduct(formData) {
  const {
    id,
    category,
    name,
    price,
    image,
    status
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Go to Firebase
    const ref = FirebaseRef.child('product').push()
    const key = ref.key;

    ref.set({
            id: key,
            category,
            name,
            price,
            image,
            status
          }).then(() => statusMessage(dispatch, 'loading', false)
          .then(resolve))
      .catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

export function createProductOffer(formData) {
  const {
    id,
    name,
    provider,
    lot,
    measure,
    amount,
    date_start,
    date_finish,
    price
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Go to Firebase
    const ref = FirebaseRef.child('product_offer').push()
    const key = ref.key;

    ref.set({
            id: key,
            name,
            provider,
            lot,
            measure,
            amount,
            date_start,
            date_finish,
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

export function getProduct() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise(resolve => FirebaseRef.child('product')
    .on('value', (snapshot) => {
        const product = snapshot.val() || {};
        const productlist = Object.values(product);
        return resolve(dispatch({
          type: 'GET_PRODUCT',
          data: productlist
        }));
    })).catch(e => console.log(e)); 
}

export function filterProduct() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise(resolve => FirebaseRef.child('product').orderByChild('status').equalTo(true)
    .on('value', (snapshot) => {
        const product = snapshot.val() || {};
        const productlist = Object.values(product);
        return resolve(dispatch({
          type: 'FILTER_PRODUCT',
          data: productlist
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

export function setProduct(id, status) {
  return dispatch => new Promise(async (resolve, reject) => {
    return firebase.database().ref('product/' + id).update({
      status: status
    });
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
      price: price,
      email: email,
      photo: photo
    } = formData;
  
    return dispatch => new Promise(async (resolve, reject) => {
      // Write the new post's data simultaneously in the posts list and the user's post list.
      return firebase.database().ref('/imobi/' + id).remove();
    })
  }

  export function getRealEstateMap(address) {
    // BUSCA GEO 
      return (dispatch) => new Promise((resolve) => {
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=`+ address + `&key=` + key).then(function(response) {
          return resolve(dispatch({
              type: 'GET_MAP',
              data: response.data
            })), console.log(response)
        })
        .catch(e => console.log(e));
      })
    }

  // FILTERS
export function setRealEstateFilters(filters) {
  return dispatch => dispatch({type: 'SET_REAL_ESTATE_FILTERS', data: filters});
}

export function cleanRealEstateFilters(filters) {
  return dispatch => dispatch({type: 'CLEAN_REAL_ESTATE_FILTERS', data: filters});
}

export function cleanRealEstateMap(address) {
  return dispatch => dispatch({type: 'CLEAN_MAP', data: address});
}