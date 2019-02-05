import statusMessage from './status';
import { Firebase, FirebaseRef } from '../lib/firebase';
import * as firebase from 'firebase';

const key = "AIzaSyCrCsmgenHNfYgkdjXIn8AShOEXbksbX8M"

/**
  * Sign Up to Firebase
  */
export function createCategory(formData) {
  const {
    id,
    value
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Go to Firebase
    const ref = FirebaseRef.child('category').push()
    const key = ref.key;

    ref.set({ 
            id: key,
            value
          }).then(() => statusMessage(dispatch, 'loading', false)
          .then(resolve))
      .catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'CATEGORY_ERROR',
    data: message,
  })));
}

export function getCategory() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise(resolve => FirebaseRef.child('category')
    .on('value', (snapshot) => {
        const category = snapshot.val() || {};
        const categorylist = Object.values(category);
        return resolve(dispatch({
          type: 'GET_CATEGORY',
          data: categorylist
        }));
    })).catch(e => console.log(e)); 
}