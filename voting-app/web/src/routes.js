import Home from './components/Home';
import PollDetail from './components/PollDetail';
import Login from './components/Login';
import Register from './components/Register';
import NewPoll from './components/NewPoll';

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/polls/:id',
    name: 'poll-detail',
    component: PollDetail
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/polls/new',
    name: 'new-poll',
    component: NewPoll
  },
  {
    path: '*',
    redirect: '/'
  }
];
