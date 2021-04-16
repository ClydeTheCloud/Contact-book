<template>
  <div class="container">
    <NewContactForm />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import NewContactForm from '@/components/NewContactForm.vue';

export default Vue.extend({
  name: 'Contact',
  components: {
    NewContactForm,
  },
});
</script>
