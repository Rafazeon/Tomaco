import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import { Firebase, FirebaseRef } from '../lib/firebase';

export function createFavorite(formData) {
    const {
        id,
        userId,
        imobiId,
        email,
        status
      } = formData;
    
      const {
        userId: userId,
        imobiId: imobiId,
        email: email,
        status: status
      } = formData;
    
      return dispatch => new Promise(async (resolve, reject) => {
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/favorite/' + id] = formData;
        return firebase.database().ref().update(updates);
      })
    }

export function getFavorite() {
    if (Firebase === null) return () => new Promise(resolve => resolve());
  
    return dispatch => new Promise(resolve => FirebaseRef.child('favorite')
      .on('value', (snapshot) => {
          const favorite = snapshot.val() || {};
          const favoritelist = Object.values(favorite);
          return resolve(dispatch({
            type: 'GET_FAVORITE',
            data: favoritelist
          }));
      })).catch(e => console.log(e)); 
  }