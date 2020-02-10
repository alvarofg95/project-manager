import Home from '../pages/Home';
import Login from '../pages/Login';

export default [
  {
    hashPath: '/',
    key: 'home',
    exact: true,
    component: Home
  },
  {
    hashPath: '/login',
    key: 'login',
    exact: true,
    component: Login
  }
];
