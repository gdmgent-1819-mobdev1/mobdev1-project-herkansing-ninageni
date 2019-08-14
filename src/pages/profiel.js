import { compile } from 'handlebars';
import update from '../helpers/update';
import functions from '../helpers/functions';

const {getInstance} = require('../firebase/firebase');
const firebase = getInstance();
const database = firebase.database();

// Import the template to use
const ProfielTemplate = require('../templates/profiel.handlebars');

const getSchool = (id) => {
  return new Promise((resolve, reject) => {
    database.ref(`schools/${id}`).once('value').then(snapshot => snapshot.val())
    .then((school) => {
      resolve(school);
    })
    .catch((error) => {
      reject(error);
    });
  });
}

export default () => {
  functions.getCurrentUser().then((user) => {
    localStorage.setItem('currentUserId', user.id);
    localStorage.setItem('currentUserType', user.type);
    let student = false;
    let nameSchool = '';
    if (user.type === 'Student') {
      student = true;
      getSchool(user.school).then((school) => {
        nameSchool = school.name;
        update(compile(ProfielTemplate)({ user, student, nameSchool }));
        document.querySelector('.menu-open').addEventListener('click', functions.openMenu, false);
        document.querySelector('.menu-close').addEventListener('click', functions.closeMenu, false);
        document.querySelector('.afmelden').addEventListener('click', (e) => {
          e.preventDefault()
          firebase.auth().signOut()
            .then(() => {
              localStorage.removeItem('currentUserId');
              localStorage.removeItem('currentUserType');
              window.location.replace('#/')
            })
        },false);

      })
    }
    else {
      update(compile(ProfielTemplate)({ user, student }));
      document.querySelector('.menu-open').addEventListener('click', functions.openMenu, false);
      document.querySelector('.menu-close').addEventListener('click', functions.closeMenu, false);
      document.querySelector('.afmelden').addEventListener('click', (e) => {
        e.preventDefault()
        firebase.auth().signOut()
          .then(() => {
            localStorage.removeItem('currentUserId');
            localStorage.removeItem('currentUserType');
            window.location.replace('#/')
          })
      },false);
    }
  })
  .catch((error) => {
    console.log(error);
  });
  // Data to be passed to the template
  const user = 'Test user';
};


