const {getInstance} = require('../firebase/firebase');
const firebase = getInstance();
const database = firebase.database();

const openMenu = (e) => {
    e.preventDefault();
    document.querySelector('.nav').classList.remove('hidden');
}

const closeMenu = (e) => {
    e.preventDefault();
    document.querySelector('.nav').classList.add('hidden');

    
}

const getCurrentUser = () => {
    return new Promise ((resolve, reject) =>{
        firebase.auth().onAuthStateChanged((user) =>{
            if (user){
                database.ref(`users/${user.uid}`).once('value').then((snapshot)=>{
                    return snapshot.val();
                })
                .then((currentUser) => {
                    resolve(currentUser);
                })
                .catch((error) => {
                    reject(error);
                }) 
            }
        });
    });
};

const getCoordinatesFromAddress = (search) => {
    return new Promise((resolve, reject) => {
        const address = encodeURI(search);
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=1&access_token=pk.eyJ1IjoibmluYWdlbmkiLCJhIjoiY2pvYTg3Zzd0MGNpcTNrbXJxMmtkNXo2cCJ9.ZQg31fYeJDmLbIf0Xolz-Q`
        fetch(url)
        .then(response => response.json())
        .then((data) => {
            const coordinates = data.features[0].center;
            const addressCoords = {longitude: 0, latitude: 0};
            addressCoords.longitude = coordinates[0];
            addressCoords.latitude = coordinates[1];
            resolve(addressCoords);
        })
        .catch((error) => {
            reject(error);
        });
    });
};

const getUserType = () => {
    const typeUser = localStorage.getItem('currentUserType');
    if (typeUser === 'Student'){
        return true;
    }
    return false;
}

export default {
    getCurrentUser, getCoordinatesFromAddress, getUserType, openMenu, closeMenu
};