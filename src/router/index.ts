import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Contact from '../views/Contact.vue';
import NewContact from '../views/NewContact.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/contacts/:id',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/new',
    name: 'New Contact',
    component: NewContact,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
