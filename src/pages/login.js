// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';

// Import the template to use
const LoginTemplate = require('../templates/login.handlebars');

const { getInstance } = require('../firebase/firebase');
const firebase = getInstance();

const inloggen = (e) =>{
  e.preventDefault();
  const email = document.querySelector('.login_email').value;
  const wachtwoord = document.querySelector('.login_wachtwoord').value;

  firebase.auth().signInWithEmailAndPassword(email, wachtwoord)
    .then(() => {
      window.location.replace('#/profiel');
    });
};

export default () => {
  // Data to be passed to the template
  // Return the compiled template to the router
  update(compile(LoginTemplate)({}));
  document.querySelector('.button_index').addEventListener('click', inloggen, false);
};

