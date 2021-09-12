import Home from '../views/Home.vue';
import UserIndex from '../views/users/UserIndex';
import UserShow from '../views/users/UserShow';

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/users', name: 'UserIndex', component: UserIndex },
  { path: '/users/:id', name: 'UserShow', component: UserShow }
]
export default routes;