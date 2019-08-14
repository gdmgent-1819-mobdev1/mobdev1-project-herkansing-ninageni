import { compile } from 'handlebars';
import update from '../helpers/update';
import functions from '../helpers/functions';

const {getInstance} = require('../firebase/firebase');
const firebase = getInstance();
const database = firebase.database();

// Import the template to use
const detailKotTemplate = require('../templates/detailKot.handlebars');

const getIdFromUrl = () => {
  const arrayUrl = window.location.href.split('/');
  const kotId = arrayUrl[arrayUrl.length -1];
  return kotId;
};

const getCurrentKot = (id) => {
  return new Promise((resolve, reject) => {
    database.ref(`koten/${id}`).once('value')
    .then(snapshot => snapshot.val())
    .then((kot) => {
      console.log(kot);
      resolve(kot);
    })
    .catch((error) => {
      reject(error);
    });
  });
};

const getOwner = (id) => {
  return new Promise((resolve, reject) => {
    database.ref(`users/${id}`).once('value')
    .then(snapshot => snapshot.val())
    .then ((user) => {
      resolve(user);
    })
    .catch((error) => {
      reject(error);
    });
  });
};

export default () => {
  const kotId = getIdFromUrl();
  getCurrentKot(kotId)
  .then((kot) => {
    getOwner(kot.ownerId)
    .then((user) => {
      const student = functions.getUserType();
      update(compile(detailKotTemplate)({ kot, user, student }));
      document.querySelector('.menu-open').addEventListener('click', functions.openMenu, false);
      document.querySelector('.menu-close').addEventListener('click', functions.closeMenu, false);
    })
  })
  const user = localStorage.getItem('currentUserId');
  const student= localStorage.getItem('currentUserType');

  update(compile(detailKotTemplate)({  }));
  

};