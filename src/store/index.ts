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
    updateContact({ commit }, updatedContact: Contact) {
      commit('updateContact', updatedContact);
    },
  },
  mutations: {
    addContact(state, newContact: ContactForm) {
      let newId;
      if (state.contacts.length > 0) {
        newId = Math.max(...state.contacts.map((contact) => contact.id)) + 1;
      } else {
        newId = 1;
      }
      const newContactWithId: Contact = { ...newContact, id: newId };

      state.contacts.push(newContactWithId);

      router.push(`contacts/${newContactWithId.id}`);
    },
    deleteContact(state, id: number) {
      state.contacts = state.contacts.filter((contact) => contact.id !== id);
    },
    updateContact(state, updatedContact: Contact) {
      const contactIndex = state.contacts.findIndex((contact) => contact.id === updatedContact.id);
      Vue.set(state.contacts, contactIndex, updatedContact);
    },
  },
  modules: {},
  plugins: [new VuexPersist().plugin],
});
