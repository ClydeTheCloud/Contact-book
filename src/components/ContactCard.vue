<template>
  <div class="container">
    <section class="contact-card">
      <img
        v-if="photoUrl"
        :src="photoUrl"
        :alt="`На фото ${firstName} ${lastName}`"
        class="contact-card__photo"
      />
      <h2 class="contact-card__name">{{ firstName + ' ' + lastName }}</h2>
      <a class="contact-card__phone-number" :href="`tel:${phoneNumber}`"> {{ phoneNumber }}</a>

      <ContactCardField
        v-for="field in customFields"
        :key="field.name"
        v-bind="field"
        class="contact-card__field"
      >
      </ContactCardField>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ContactCardField from './ContactCardField.vue';

export default Vue.extend({
  name: 'ContactCard',
  components: {
    ContactCardField,
  },
  props: {
    id: Number,
    firstName: String,
    lastName: String,
    phoneNumber: { type: String, required: false },
    customFields: { type: Array, required: false },
    photoUrl: { type: String, required: false },
  },
  methods: {
    commitChange() {
      // TODO save changed contact to state
    },
  },
});
</script>

<style lang="scss">
.contact-card {
  @include basicCard;
  padding: 2rem;
  max-width: 550px;
  margin: 0 auto;

  &__name {
    margin: 1rem 0;
    font-size: 3rem;
  }

  &__phone-number {
    display: block;
    color: $color-1;
    text-decoration: none;
    font-size: 1.5rem;
    margin: 1rem 0;
  }

  &__photo {
    max-height: 200px;
    width: auto;
    border-radius: 10px;
  }
}
</style>
