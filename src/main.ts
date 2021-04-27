import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// Хаб для обработки событий, всязанных с модальными окнами
Vue.prototype.$modalEventHub = new Vue();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
