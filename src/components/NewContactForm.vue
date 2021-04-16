<template>
  <form @submit.prevent="submit" @change="resetError" class="new-contact-form">
    <p v-if="submitError.message" class="new-contact-form__error-message">
      {{ submitError.message }}
    </p>
    <label>
      <p class="new-contact-form__lable-text">
        Имя
      </p>
      <input
        v-model.trim="newContact.firstName"
        type="text"
        :class="{ '--input-error': submitError.fields.firstName }"
      />
    </label>
    <label>
      <p class="new-contact-form__lable-text">
        Фамилия
      </p>
      <input v-model.trim="newContact.lastName" type="text" />
    </label>
    <label>
      <p class="new-contact-form__lable-text">
        Телефон
      </p>
      <input
        v-model.trim="newContact.phoneNumber"
        type="tel"
        placeholder="+79876543210"
        :class="{ '--input-error': submitError.fields.phoneNumber }"
      />
    </label>
    <label>
      <p class="new-contact-form__lable-text">
        Фото (ссылка)
      </p>
      <input
        v-model.trim="newContact.photoUrl"
        type="url"
        placeholder="https://placekeanu.com/200/350/"
      />
    </label>

    <label v-for="field in newContact.customFields" :key="field.name">
      <p class="new-contact-form__lable-text">
        {{ field.name }}
      </p>
      <input v-model.trim="field.value" type="text" />
      <button @click="removeCustomField(field.name)" class="new-contact-form__remove-field-button">
        &times;
      </button>
    </label>

    <button
      @click="openCustomField"
      v-if="!newField.isOpen"
      class="new-contact-form__custom-field-button"
    >
      + Новое поле
    </button>
    <div v-else class="new-contact-form__custom-field-wrapper">
      <p v-if="newField.error" class="new-contact-form__error-message">
        {{ newField.error }}
      </p>
      <label>
        <p class="new-contact-form__lable-text">
          Название поля
        </p>
        <input
          type="text"
          v-model.trim="newField.name"
          class="new-contact-form__add-field-input"
          :class="{ '--input-error': newField.error }"
        />
      </label>
      <div class="new-contact-form__custom-field-controls">
        <button @click.prevent="addCustomField" class="new-contact-form__custom-field-button">
          Добавить поле
        </button>
        <button @click="cancelCustomField" class="new-contact-form__custom-field-button">
          Отмена
        </button>
      </div>
    </div>

    <button type="submit" class="new-contact-form__create-button button">Добавить контакт</button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { InputFormWithError } from '@/types';

export default Vue.extend({
  name: 'NewContactForm',
  data(): InputFormWithError {
    return {
      newContact: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        customFields: [],
        photoUrl: '',
      },
      newField: {
        error: '',
        isOpen: false,
        name: '',
      },
      submitError: {
        message: '',
        fields: {
          firstName: false,
          phoneNumber: false,
        },
      },
    };
  },
  methods: {
    ...mapActions(['addContact']),
    addCustomField() {
      if (
        this.newField.name &&
        this.newContact.customFields.every((field) => field.name !== this.newField.name)
      ) {
        this.newContact.customFields.push({ name: this.newField.name, value: '' });
        this.newField.name = '';
        this.newField.isOpen = false;
      } else if (this.newField.name) {
        this.newField.error = 'Поле с таким именем уже существует';
      } else {
        this.newField.error = 'Введите имя поля';
      }
    },
    cancelCustomField() {
      this.newField.name = '';
      this.newField.isOpen = false;
      this.newField.error = '';
    },
    openCustomField() {
      this.newField.isOpen = true;
    },
    removeCustomField(name: string) {
      this.newContact.customFields = this.newContact.customFields.filter(
        (field) => field.name !== name,
      );
    },
    submit() {
      console.log('submit');
      if (this.newContact.firstName && this.newContact.phoneNumber) {
        this.addContact(this.newContact);
      } else {
        this.submitError.fields.firstName = !this.newContact.firstName;
        this.submitError.fields.phoneNumber = !this.newContact.phoneNumber;
        this.submitError.message = 'Отмеченные поля обязательны для заполнения';
      }
    },
    resetError() {
      this.submitError.message = '';
      this.submitError.fields.firstName = false;
      this.submitError.fields.phoneNumber = false;
    },
  },
});
</script>

<style lang="scss">
.new-contact-form {
  @include basicCard;
  position: relative;
  width: 600px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: bold;
  color: $color-1;
  background-color: $color-4;

  &__error-message {
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    color: $color-6;

    // &--field-error {

    // }
  }

  &__lable-text {
    text-align-last: left;
  }

  input {
    @include basicCard;
    display: inline-block;
    width: calc(100% - 3rem);
    margin-top: 0.15em;
    margin-bottom: 1.5em;
    padding: 0.3em 0.125em;
    font-size: 1.15rem;
    border-radius: 0.25em;
    border: none;
    // background-color: $color-4;
  }

  input.--input-error {
    box-shadow: 0 0 0 4px $color-6;
  }

  input:last-child {
    width: 100%;
  }

  &__remove-field-button {
    width: 2rem;
    height: 2rem;
    padding: 5px;
    margin-left: 1rem;
    border-radius: 99px;
    background-color: red;
    border: none;
    color: $color-2;
  }

  &__custom-field-wrapper {
    position: relative;

    .new-contact-form__error-message {
      top: -1em;
    }
  }

  &__custom-field-controls {
    display: flex;
    justify-content: space-between;
  }

  &__custom-field-button {
    display: block;
    margin-bottom: 1rem;
    background-color: transparent;
    color: $color-3;
    border: none;
    font-size: 1rem;

    &:hover {
      color: $color-1;
    }
  }

  &__create-button {
    @include basicCard;
    display: block;
    margin: 0 auto;
    font-size: 1rem;
    color: $color-1;
    background-color: $color-2;
  }
}
</style>
