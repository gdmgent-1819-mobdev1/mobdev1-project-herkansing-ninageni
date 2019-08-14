// Pages
import HomeView from './pages/home';
import AboutView from './pages/about';
import FirebaseView from './pages/firebase-example';
import MapboxView from './pages/mapbox-example';
import SwipeView from './pages/swipe'
import RegistrerenView from './pages/registreren';
import LoginView from './pages/login';
import ProfielView from './pages/profiel';
import WachtwoordView from './pages/wachtwoord';
import KotView from './pages/kot';
import KotAddView from './pages/kot_add';
import DetailkotView from './pages/detailkot';

export default [
  { path: '/', view: HomeView },
  { path: '/about', view: AboutView },
  { path: '/firebase', view: FirebaseView },
  { path: '/mapbox', view: MapboxView },
  { path: '/registreren', view: RegistrerenView },
  { path: '/login', view: LoginView },
  { path: '/profiel', view: ProfielView },
  { path: '/login/wachtwoord', view: WachtwoordView },
  { path: '/koten', view: KotView },
  { path: '/koten/swipe', view: SwipeView },
  { path: '/koten/toevoegen', view: KotAddView },
  { path: '/koten/:id', view: DetailkotView }
];
