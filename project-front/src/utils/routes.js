import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

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
  },
  {
    hashPath: '/sign-up',
    key: 'signUp',
    exact: true,
    component: SignUp
  }
];
