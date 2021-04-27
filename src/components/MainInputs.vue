<template>
  <!-- Поля для основной информации о контакте -->
  <div class="main-inputs">
    <label>
      <p class="main-inputs__lable-text">
        Имя
      </p>
      <input
        v-model.trim="firstNameValue"
        type="text"
        class="main-input"
        :class="{ '--input-error': firstNameError }"
      />
    </label>
    <label>
      <p class="main-inputs__lable-text">
        Фамилия
      </p>
      <input v-model.trim="lastNameValue" type="text" class="main-input" />
    </label>
    <label>
      <p class="main-inputs__lable-text">
        Телефон
      </p>
      <input
        v-model.trim="phoneNumberValue"
        type="tel"
        class="main-input"
        placeholder="+79876543210"
        :class="{ '--input-error': phoneNumberError }"
      />
    </label>
    <label>
      <p class="main-inputs__lable-text">
        Фото (ссылка)
      </p>
      <input
        v-model.trim="photoUrlValue"
        type="url"
        class="main-input"
        placeholder="https://placekeanu.com/200/350/"
      />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'NewContactForm',
  props: {
    firstNameError: { type: Boolean, required: true },
    phoneNumberError: { type: Boolean, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    photoUrl: { type: String, required: true },
  },
  // Геттеры и сеттеры для контроля значения полей из родительского компонента
  computed: {
    firstNameValue: {
      get(): string {
        return this.firstName;
      },
      set(value: string): void {
        this.$emit('inputFirstName', value);
      },
    },
    lastNameValue: {
      get(): string {
        return this.lastName;
      },
      set(value: string): void {
        this.$emit('inputLastName', value);
      },
    },
    phoneNumberValue: {
      get(): string {
        return this.phoneNumber;
      },
      set(value: string): void {
        this.$emit('inputPhoneNumber', value);
      },
    },
    photoUrlValue: {
      get(): string {
        return this.photoUrl;
      },
      set(value: string): void {
        this.$emit('inputPhotoUrl', value);
      },
    },
  },
});
</script>

<style lang="scss">
.main-input {
  @include basicCard;
  display: inline-block;
  width: calc(100% - 3rem);
  margin-top: 0.15em;
  margin-bottom: 1.5em;
  padding: 0.3em 0.125em;
  font-size: 1.15rem;
  border-radius: 0.25em;
  border: none;
}

.main-inputs {
  width: 100%;

  input.--input-error {
    box-shadow: 0 0 0 4px $color-6;
  }

  &__lable-text {
    text-align-last: left;
  }

  &__input {
    width: 100%;
  }
}
</style>
