<template>
  <div class="contact-preview">
    <router-link :to="`/contacts/${id}/`">
      <div class="contact-preview__wrapper">
        <!-- Аватар контакта... -->
        <div class="contact-preview__avatar">
          <!-- ...отображает фото (при наличии)... -->
          <img
            v-if="photoUrl"
            :src="photoUrl"
            :alt="`На фото ${firstName} ${lastName}`"
            class="contact-preview__photo"
          />
          <!-- ...или инициалы, если фото отсутствует. -->
          <p v-else class="contact-preview__initials">{{ firstName[0] }} {{ lastName[0] }}</p>
        </div>

        <p class="contact-preview__name">
          {{ firstName }} <br />
          {{ lastName }}
        </p>
      </div>
    </router-link>
    <!-- Кнопка для удаления контакта -->
    <ButtonWithConfirmationModal
      class="contact-preview__delete-button"
      :modalMessage="deleteModalMessage"
      :onClick="() => deleteContact(id)"
      :class="{ 'touch-screen-fix': isUserOnTouchScreen }"
    >
      &times;
    </ButtonWithConfirmationModal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import ButtonWithConfirmationModal from '@/components/ButtonWithConfirmationModal.vue';

export default Vue.extend({
  name: 'ContactPreview',
  components: {
    ButtonWithConfirmationModal,
  },
  props: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    id: { type: Number, required: true },
    photoUrl: { type: String, required: false },
  },
  computed: {
    deleteModalMessage(): string {
      const name = this.lastName
        ? this.firstName.concat(' ').concat(this.lastName)
        : this.firstName;
      return `Вы уверены что хотите удалить контакт ${name}?`;
    },
    // Используется для постоянного отображения кнопки удаления контакта,
    // если пользователь на устройстве с тач-экраном,
    // тогда как на десктопе кнопка удаления появляется при наведении или фокусе на контакт
    isUserOnTouchScreen(): boolean {
      return !!('ontouchstart' in window);
    },
  },
  methods: mapActions(['deleteContact']),
});
</script>

<style lang="scss">
.contact-preview {
  @include basicCard;
  position: relative;
  min-width: 250px;
  margin: 0 auto;
  margin-bottom: 2rem;
  background-color: $color-4;
  transition: all ease-in-out 0.2s;

  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  &__avatar {
    display: grid;
    place-items: center;
    width: 50px;
    height: 50px;
    border-radius: 99px;
    margin-right: 1rem;
    overflow: hidden;
    flex-shrink: 0;
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
    vertical-align: middle;
    text-align: right;
    word-wrap: break-word;
    flex-shrink: 0;
    width: 125px;
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
  &:focus-within &__delete-button,
  .touch-screen-fix {
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
