import { Firebase, FirebaseRef } from '../lib/firebase';

export function getOrder() {
    if (Firebase === null) return () => new Promise(resolve => resolve());
  
    return dispatch => new Promise(resolve => FirebaseRef.child('orders')
      .on('value', (snapshot) => {
          const order = snapshot.val() || {};
          const orderlist = Object.values(order);
          return resolve(dispatch({
            type: 'GET_ORDER',
            data: orderlist
          }));
      })).catch(e => console.log(e)); 
  }