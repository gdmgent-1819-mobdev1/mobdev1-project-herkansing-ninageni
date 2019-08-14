import { compile } from 'handlebars';
import update from '../helpers/update';
import functions from '../helpers/functions';

const {getInstance} = require('../firebase/firebase');
const firebase = getInstance();
const database = firebase.database();

// Import the template to use
const swipeTemplate = require('../templates/swipe.handlebars');

let aantalKoten = 0;

const convertObjectToArray = object => Object.keys(object).map(i => object[i]);

const checkExists = (favorites, kotId) => {
    let exists = false;
    favorites.forEach((favorit) => {
      if (favorit === kotId) {
        exists = true;
      }
    });
    return exists;
  };

const getFavorites = (userId) => {
    return new Promise((resolve, reject) => {
      database.ref(`users/${userId}`).once('value')
        .then(snapshot => snapshot.val())
        .then((user) => {
          const favoritesArray = [];
          if (user.favorites !== undefined) {
            user.favorites.forEach((favorit) => {
              favoritesArray.push(favorit);
            });
            resolve(favoritesArray);
          }
          resolve(favoritesArray);
        })
        .catch((error) => {
          reject(error);
        });
    });
};

const kotenSwipe = (koten, user, student, gevondenKot) => {
    getFavorites(user)
    .then((favorites) => {
        const favoritArray = favorites;
        if (gevondenKot) {
            let gevondenKoten = gevondenKot;
            let exist = false;
            if (aantalKoten < koten.length) {
                exist = checkExists(favorites, koten[aantalKoten].id);
            } 

            if (exist) {
                aantalKoten += 1;
                kotenSwipe(koten, user, student, gevondenKoten);
            } else {
                const kot = koten[aantalKoten];

                update(compile(swipeTemplate)({ gevondenKoten, kot, student }));
                    document.querySelector('.menu-open').addEventListener('click', functions.openMenu, false);
                    document.querySelector('.menu-close').addEventListener('click', functions.closeMenu, false);
                    document.querySelector('.yes').addEventListener('click', (e) => {
                    e.preventDefault();
                    favoritArray.push(kot.id);
                    database.ref(`users/${user}/favorites`).set(favoritArray);
                    aantalKoten += 1;
                    kotenSwipe(koten, user, student, gevondenKoten);
                }, false);
                document.querySelector('.no').addEventListener('click', (e) => {
                    e.preventDefault();
                    aantalKoten += 1;
                    kotenSwipe(koten, user, student, gevondenKoten);
                }, false);
            }
        }
    });
}


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
        kotenSwipe(koten, user, student, gevondenKoten);
    }
    
  })

};