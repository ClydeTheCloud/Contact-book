<template>
  <div class="contact-list">
    <p v-if="allContacts.length === 0" class="contact-list__no-contacts-message">
      В вашей книге контактов пусто.
    </p>

    <!-- Отображает список контактов -->
    <ContactPreview
      v-else
      v-for="contact in allContacts"
      :key="contact.id"
      :firstName="contact.firstName"
      :lastName="contact.lastName"
      :id="contact.id"
      :photoUrl="contact.photoUrl"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import ContactPreview from './ContactPreview.vue';

export default Vue.extend({
  name: 'ContactList',
  components: {
    ContactPreview,
  },
  computed: mapGetters(['allContacts']),
});
</script>

<style lang="scss">
.contact-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  &__no-contacts-message {
    margin: 0 auto;
    font-size: 2rem;
  }
}
</style>
