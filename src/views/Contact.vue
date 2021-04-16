<template>
  <div class="container">
    <ContactCard v-if="contact" v-bind="contact" />
    <p v-else>Контакт не найден.</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import ContactCard from '../components/ContactCard.vue';
import { Contact } from '../types';

export default Vue.extend({
  name: 'Contact',
  components: {
    ContactCard,
  },
  computed: {
    ...mapGetters(['getById']),
    contact(): Contact {
      return this.getById(this.$route.params.id);
    },
  },
});
</script>
