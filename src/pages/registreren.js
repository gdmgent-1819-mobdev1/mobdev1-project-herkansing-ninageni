// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';
import { Student, Kotbaas } from '../helpers/classes';

const { getInstance } = require('../firebase/firebase');
const firebase = getInstance();

// Import the template to use
const registrerenTemplate = require('../templates/registreren.handlebars');

const scholenOphalen = () => {
  return new Promise ((resolve, reject) =>{
    firebase.database().ref('schools').once('value')
      .then((snapshot) => {
        return snapshot.val();
      })
      .then((schools) => {
        resolve(schools);
      })
  })
};

const registreren = (e) => {
  e.preventDefault();
  const voornaam = document.querySelector('.registreren_voornaam').value;
  const achternaam = document.querySelector('.registreren_achternaam').value;
  const adres = document.querySelector('.registreren_adres').value;
  const email = document.querySelector('.registreren_email').value;
  const wachtwoord = document.querySelector('.registreren_wachtwoord').value;
  const herhaalWachtwoord = document.querySelector('.registreren_herhaalwachtwoord').value;
  const telefoonnummer = document.querySelector('.registreren_telefoonnummer').value;
  const studentKotbaas = document.querySelector('input[name=type]:checked').value;
  const school = document.querySelector('.select_scholen').value;
  let profiel = {};
  console.log(email);
  

  if (wachtwoord === herhaalWachtwoord){
    firebase.auth().createUserWithEmailAndPassword(email, wachtwoord)
      .then(() => {
        firebase.auth().useDeviceLanguage();
        firebase.auth().currentUser.sendEmailVerification();

        const userId = firebase.auth().currentUser.uid;

        if (studentKotbaas === 'Student') {
          profiel = new Student(userId, voornaam, achternaam, adres, email, telefoonnummer, studentKotbaas, school)
        }
        else {
          profiel = new Kotbaas(userId, voornaam, achternaam, adres, email, telefoonnummer, studentKotbaas)
        }

        firebase.database().ref(`users/${userId}`).set(profiel)
          .then(() => {
            window.location.replace('#/profiel')
          });

      })
  }
};

export default () => {
  // Data to be passed to the template
  // Return the compiled template to the router
  scholenOphalen()
    .then((schools) => {
      update(compile(registrerenTemplate)({schools}));
      document.querySelector('.button_index').addEventListener('click',registreren,false);
      const radio = document.querySelectorAll('.registreren_radio');
      radio.forEach(element => {
        element.addEventListener('click', () =>{
            const studentKotbaas = document.querySelector('input[name=type]:checked').value;
            if (studentKotbaas === 'Student'){
              document.querySelector('.form_select_scholen').classList.remove('hidden');
            }
            else{
              document.querySelector('.form_select_scholen').classList.add('hidden');
            }
        })
      });
    })


};



