<template>
  <div class="container">
    <ContactList />
    <NewContactButton />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ContactList from '@/components/ContactList.vue';
import NewContactButton from '@/components/NewContactButton.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    ContactList,
    NewContactButton,
  },
});
</script>
