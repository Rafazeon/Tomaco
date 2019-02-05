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
    produto,
    fornecedor,
    lote,
    medida,
    quantidade,
    entrega,
    validade,
    preco
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Go to Firebase
    const ref = FirebaseRef.child('offers').push()
    const key = ref.key;

    ref.set({
            id: key,
            produto,
            fornecedor,
            lote,
            medida,
            quantidade,
            entrega,
            validade,
            preco
          }).then(() => statusMessage(dispatch, 'loading', false)
          .then(resolve))
      .catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'ERROR_PRODUCT',
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

export function setProduct(id, status) {
  return dispatch => new Promise(async (resolve, reject) => {
    return firebase.database().ref('product/' + id).update({
      status: status
    });
  })
}
