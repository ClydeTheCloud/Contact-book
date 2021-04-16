<template>
  <router-link class="contact-list__new-contact-button button" to="/new">
    Добавить контакт
  </router-link>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'NewContactButton',
});
</script>

<style lang="scss">
.contact-list__new-contact-button {
  display: block;
  max-width: 300px;
  color: $color-2;
  background-color: $color-1;
  margin: 2em auto;

  &:hover {
    background-color: $color-3;
  }
}
</style>
