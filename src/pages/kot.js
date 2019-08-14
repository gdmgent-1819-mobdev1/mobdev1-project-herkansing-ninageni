import { compile } from 'handlebars';
import update from '../helpers/update';
import functions from '../helpers/functions';

const {getInstance} = require('../firebase/firebase');
const firebase = getInstance();
const database = firebase.database();

// Import the template to use
const kotTemplate = require('../templates/kot.handlebars');

const convertObjectToArray = object => Object.keys(object).map(i => object[i]);

const getKoten = (userId, userType) => {
  return new Promise((resolve, reject) => {
    database.ref('koten').once('value')
    .then(snapshot => snapshot.val())
    .then((koten) => {
      const kotArray = convertObjectToArray(koten);
      const kotUser = [];
      if (!userType){
        kotArray.forEach((kot) => {
          if (kot.ownerId === userId) {
            kotUser.push(kot);
          resolve(kotUser);
          }
        });
      }
      resolve(kotArray);
    })
    .catch((error) => {
      reject(error);
    })
  })
}

export default () => {
  const user = localStorage.getItem('currentUserId');
  const student = functions.getUserType();

  getKoten(user, student).then((koten) => {
    let gevondenKoten = false;

    if (koten.length > 0){
      gevondenKoten = true;
    }
    update(compile(kotTemplate)({ student, gevondenKoten, koten }));
    document.querySelector('.menu-open').addEventListener('click', functions.openMenu, false);
    document.querySelector('.menu-close').addEventListener('click', functions.closeMenu, false);
  })

};