import { compile } from 'handlebars';
import update from '../helpers/update';
import {Kot} from '../helpers/classes';
import functions from '../helpers/functions';

const {getInstance} = require('../firebase/firebase');
const firebase = getInstance();
const database = firebase.database();

// Import the template to use
const toevoegenTemplate = require('../templates/toevoegen.handlebars');

const addKot = (e) => {
    e.preventDefault();
    const kotId = database.ref('koten').push().getKey();
    const userId = localStorage.getItem('currentUserId');
    const roomTypeInput = document.querySelector('.form_nieuwkot_type_input').value;
    const addressInput = document.querySelector('.form_nieuwkot_adres_input').value;
    const rentPriceInput = document.querySelector('.form_nieuwkot_prijs_input').value;
    const depositInput = document.querySelector('.form_nieuwkot_waarborg_input').value;
    const surfaceInput = document.querySelector('.form_nieuwkot_oppervlakte_input').value;
    const levelInput = document.querySelector('.form_nieuwkot_verdieping_input').value;
    const personsInput = document.querySelector('.form_niewwkot_aantalpersonen_input').value;
    const toiletInput = document.querySelector('.toilet').value;
    const showerInput = document.querySelector('.douche').value;
    const bathInput = document.querySelector('.bad').value;
    const kitchenInput = document.querySelector('.keuken').value;
    const furnitureInput = document.querySelector('.meubels').value;
    const extraInput = document.querySelector('.form_nieuwkot_beschrijving_input').value;

    functions.getCoordinatesFromAddress(addressInput)
    .then((coordinates) => {
        const price = {
            rent: rentPriceInput,
            deposit: depositInput,
        };
        const kotInfo = {
            type: roomTypeInput,
            surface: surfaceInput,
            level: levelInput,
            persons: personsInput,
            toilet: toiletInput,
            shower: showerInput,
            bath: bathInput,
            kitchen: kitchenInput,
            furniture: furnitureInput,
            extra: extraInput,
        };

        const kot = new Kot (kotId, addressInput, coordinates, price, kotInfo, userId);

        database.ref(`koten/${kotId}`).set(kot)
        .then(() => {
            window.location.replace('#/koten/');
        })
    })
}



export default () => {
  update(compile(toevoegenTemplate)({ }));
  document.querySelector('.menu-open').addEventListener('click', functions.openMenu, false);
  document.querySelector('.menu-close').addEventListener('click', functions.closeMenu, false);
  document.querySelector('.button_save').addEventListener('click', addKot, false);
};