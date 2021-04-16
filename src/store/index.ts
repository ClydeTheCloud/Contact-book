import router from '@/router';
import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

import { Contact, ContactForm, State } from '../types';

Vue.use(Vuex);

export default new Vuex.Store<State>({
  state: {
    contacts: [],
  },
  getters: {
    allContacts: (state) => state.contacts,
    getById: (state) => (id: number): Contact | undefined => {
      const result = state.contacts.find((contact) => contact.id === Number(id));
      return result;
    },
  },
  actions: {
    addContact({ commit }, contact: ContactForm) {
      commit('addContact', contact);
    },
    deleteContact({ commit }, id: number) {
      commit('deleteContact', id);
    },
  },
  mutations: {
    setContacts(state, contacts: Contact[]) {
      state.contacts = contacts;
    },
    addContact(state, newContact) {
      const newContactWithId = { ...newContact };
      if (state.contacts.length > 0) {
        newContactWithId.id = Math.max(...state.contacts.map((contact) => contact.id)) + 1;
      } else {
        newContactWithId.id = 1;
      }

      state.contacts.push(newContactWithId);

      router.push(`contacts/${newContactWithId.id}`);
    },
    deleteContact(state, id) {
      state.contacts = state.contacts.filter((contact) => contact.id !== id);
    },
  },
  modules: {},
  plugins: [new VuexPersist().plugin],
});
