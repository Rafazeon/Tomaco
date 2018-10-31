import statusMessage from './status';
import { Firebase, FirebaseRef } from '../lib/firebase';
import * as firebase from 'firebase';

export function createContact(formData) {
    const {
        id,
        name,
        email,
        phone,
        imobi
      } = formData;
    
      return dispatch => new Promise(async (resolve, reject) => {
        const ref = FirebaseRef.child('contact').push()
        const key = ref.key;
        
        ref.set({
            id: key,
            name: name,
            email: email,
            phone: phone,
            imobi: imobi
          }).then(() => statusMessage(dispatch, 'loading', false)
          .then(resolve))
      .catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; })
}

export function getContact() {
    if (Firebase === null) return () => new Promise(resolve => resolve());
  
    return dispatch => new Promise(resolve => FirebaseRef.child('contact').orderByChild('imobi')
      .on('value', (snapshot) => {
          const contact = snapshot.val() || {};
          const contactlist = Object.values(contact);
          return resolve(dispatch({
            type: 'GET_CONTACT',
            data: contactlist
          }));
      })).catch(e => console.log(e)); 
  }