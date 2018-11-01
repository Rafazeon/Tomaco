import statusMessage from './status';
import { Firebase, FirebaseRef } from '../lib/firebase';
import * as firebase from 'firebase';

export function createFavorite(formData) {
    const {
        id,
        userId,
        imobiId,
        email,
        status
      } = formData;
    
      return dispatch => new Promise(async (resolve, reject) => {
        const ref = FirebaseRef.child('favorite').push()
        const key = ref.key;
        
        ref.set({
            id: key,
            userId: userId,
            imobiId: imobiId,
            email: email,
            status: status
          }).then(() => statusMessage(dispatch, 'loading', false)
          .then(resolve))
      .catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; })
}

export function setFavorite(formData) {   
    const {
        id,
        userId,
        imobiId,
        email,
        status
        } = formData;
    
        return dispatch => new Promise(async (resolve, reject) => {
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/favorite/' + id + userId] = formData;
        
        return firebase.database().ref().update(updates);
        })
    }
    
// FILTRA PELO FAVORITO DO USUÁRIO
export function getFavorite() {
    if (Firebase === null) return () => new Promise(resolve => resolve());
  
    return dispatch => new Promise(resolve => FirebaseRef.child('favorite').orderByChild('status').equalTo(true)
      .on('value', (snapshot) => {
            var userIdCurrent = firebase.auth().currentUser && firebase.auth().currentUser.uid
            var favorite = snapshot.val() || {};
            var favoritelist = Object.values(favorite);
            var filter = favoritelist.filter((item) => {
                return item.userId == userIdCurrent
            })
            return resolve(dispatch({
                type: 'GET_FAVORITE',
                data: filter
            })); 
      })).catch(e => console.log(e));  
  }

  export function deleteFavorite(formData) {
    const {
        id,
        userId,
        imobiId,
        email,
        status
      } = formData;
    
      return dispatch => new Promise(async (resolve, reject) => {
        // Write the new post's data simultaneously in the posts list and the user's post list.
        return firebase.database().ref('/favorite/' + id).remove();
      })
    }