import { compile } from 'handlebars';
import update from '../helpers/update';

// Import the template to use
const WachtwoordTemplate = require('../templates/wachtwoord.handlebars');

const { getInstance } = require('../firebase/firebase');
const firebase = getInstance();

const wachtwoord = (e) => {
    e.preventDefault;
    const email = document.querySelector('.wachtwoordvergeten_email').value;

    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            window.location.replace('#/login');
        })
}

export default () => {
  // Data to be passed to the template

  // Return the compiled template to the router
  update(compile(WachtwoordTemplate)({ }));
  document.querySelector('.verstuur').addEventListener('click', wachtwoord, false);
};