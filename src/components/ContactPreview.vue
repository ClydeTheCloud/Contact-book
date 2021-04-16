<template>
  <div class="contact-preview">
    <router-link :to="`/contacts/${id}/`">
      <div class="contact-preview__wrapper">
        <div class="contact-preview__avatar">
          <img
            v-if="photoUrl"
            :src="photoUrl"
            :alt="`На фото ${firstName} ${lastName}`"
            class="contact-preview__photo"
          />
          <p v-else class="contact-preview__initials">{{ firstName[0] }} {{ lastName[0] }}</p>
        </div>
        <p class="contact-preview__name">
          {{ firstName }} <br />
          {{ lastName }}
        </p>
      </div>
    </router-link>
    <button class="contact-preview__delete-button" @click="deleteContact(id)">
      <p>&times;</p>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'ContactPreview',
  props: {
    firstName: String,
    lastName: String,
    id: Number,
    photoUrl: String,
  },
  methods: mapActions(['deleteContact']),
});
</script>

<style lang="scss">
.contact-preview {
  @include basicCard;
  position: relative;
  min-width: 250px;
  margin-bottom: 2rem;
  background-color: $color-4;
  transition: all ease-in-out 0.2s;

  &__wrapper {
    display: flex;
    justify-content: space-between;
  }

  &__avatar {
    display: grid;
    place-items: center;
    width: 50px;
    height: 50px;
    border-radius: 99px;
    margin-right: 1rem;
    overflow: hidden;
  }

  &__photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }

  &:nth-child(odd) .contact-preview__avatar {
    background-color: $color-1;
  }

  &:nth-child(even) .contact-preview__avatar {
    background-color: $color-3;
  }

  &__name {
    display: grid;
    place-items: center;
    text-align: right;
  }

  &__initials {
    color: $color-2;
  }

  a {
    display: block;
    padding: 1rem 2rem;
    width: 100%;
    height: 100%;
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &:focus {
      outline: none;
    }
  }

  &:hover,
  &:focus-within {
    transform: translateY(-2px);
    box-shadow: 7px 7px 10px 7px rgba(0, 0, 0, 0.15);
  }

  &:focus-within {
    background-color: $color-5;
  }

  &:hover &__delete-button,
  &:focus-within &__delete-button {
    transform: scale(1);
  }

  &__delete-button {
    place-items: center;
    position: absolute;
    right: -10px;
    top: -10px;
    width: 25px;
    height: 25px;
    background-color: $color-6;
    color: $color-2;
    border: none;
    border-radius: 99px;
    cursor: pointer;
    transition: all ease-in-out 0.2s;
    transform: scale(0);
    font-weight: bold;
    font-size: 1.25em;

    &:focus {
      outline: none;
      box-shadow: 0 0 2px 2px $color-6;
    }

    &:hover,
    &:focus {
      background-color: $color-5;
      color: $color-6;
    }
  }
}
</style>
