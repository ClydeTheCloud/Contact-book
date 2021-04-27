<template>
  <div class="container">
    <ContactCard v-if="contactIsPresent" :id="Number(this.$route.params.id)" />
    <p v-else>Контакт не найден.</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import ContactCard from '../components/ContactCard.vue';

export default Vue.extend({
  name: 'Contact',
  components: {
    ContactCard,
  },
  computed: {
    ...mapGetters(['getById']),
    contactIsPresent(): boolean {
      return !!this.getById(this.$route.params.id);
    },
  },
});
</script>
