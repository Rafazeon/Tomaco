import { Firebase, FirebaseRef } from '../lib/firebase';
import * as firebase from 'firebase'

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

    console.log(getState())

    let fireBaseCall = FirebaseRef.child('imobi');

    if(apply_filters) {
      
          const type = fireBaseCall.orderByChild('types_goal').equalTo(filters.types + ' ' + filters.goal).once('value').then(function(snapshot) {
            const realestate = snapshot.val() || {};
            const realestatelist = Object.values(realestate);
            return realestatelist[0]
          })
          
          const price_sell = fireBaseCall.orderByChild('price').startAt(filters.price_sell[0]).endAt(filters.price_sell[1]).once('value').then(function(snapshot) {
            const realestate = snapshot.val() || {};
            const realestatelist = Object.values(realestate);
            return realestatelist[0]
          })

          
          const price_rent = fireBaseCall.orderByChild('price').startAt(filters.price_rent[0]).endAt(filters.price_rent[1]).once('value').then(function(snapshot) {
            const realestate = snapshot.val() || {};
            const realestatelist = Object.values(realestate);
            return realestatelist[0]
          })

          
          const area = fireBaseCall.orderByChild('area').startAt(filters.area[0]).endAt(filters.area[1]).once('value').then(function(snapshot) {
            const realestate = snapshot.val() || {};
            const realestatelist = Object.values(realestate);
            return realestatelist[0]
          })


          const bedrooms = fireBaseCall.orderByChild('bedrooms').equalTo(filters.bedrooms).once('value').then(function(snapshot) {
            const realestate = snapshot.val() || {};
            const realestatelist = Object.values(realestate);
            return realestatelist[0]
          })

          return Promise.all([type, type === 'Venda' ? price_sell : price_rent, area, bedrooms]).
            then(function(results) {
              console.log(results)
                return dispatch({
                  type: 'GET_REAL_ESTATE',
                  data: results
                });
            }).catch(e => console.log(e));
            
    }
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