<template>
  <form @submit.prevent="submit" @change="resetError" class="new-contact-form">
    <p v-if="submitError.message" class="editing-error-message">
      {{ submitError.message }}
    </p>

    <MainInputs
      :firstName="newContact.firstName"
      :lastName="newContact.lastName"
      :phoneNumber="newContact.phoneNumber"
      :photoUrl="newContact.photoUrl"
      @inputFirstName="newContact.firstName = $event"
      @inputLastName="newContact.lastName = $event"
      @inputPhoneNumber="newContact.phoneNumber = $event"
      @inputPhotoUrl="newContact.photoUrl = $event"
      :firstNameError="submitError.fields.firstName"
      :phoneNumberError="submitError.fields.phoneNumber"
    />

    <label v-for="field in newContact.customFields" :key="field.name">
      <p class="new-contact-form__lable-text lable-text">
        {{ field.name }}
      </p>
      <input v-model.trim="field.value" type="text" class="main-input" />
      <button @click="removeCustomField(field.name)" class="new-contact-form__remove-field-button">
        &times;
      </button>
    </label>

    <AddCustomField
      :customFields="newContact.customFields"
      @new-custom-field-added="addCustomField"
    />

    <button type="submit" class="new-contact-form__create-button button">Добавить контакт</button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { InputFormWithError } from '@/types';
import MainInputs from '@/components/MainInputs.vue';
import AddCustomField from '@/components/AddCustomField.vue';

export default Vue.extend({
  name: 'NewContactForm',
  components: {
    MainInputs,
    AddCustomField,
  },
  data(): InputFormWithError {
    return {
      newContact: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        customFields: [],
        photoUrl: '',
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
    addCustomField(newFieldName: string): void {
      this.newContact.customFields.push({ name: newFieldName, value: '' });
    },
    removeCustomField(name: string): void {
      this.newContact.customFields = this.newContact.customFields.filter(
        (field) => field.name !== name,
      );
    },
    submit(): void {
      console.log('submit');
      if (this.newContact.firstName && this.newContact.phoneNumber) {
        this.addContact(this.newContact);
      } else {
        this.submitError.fields.firstName = !this.newContact.firstName;
        this.submitError.fields.phoneNumber = !this.newContact.phoneNumber;
        this.submitError.message = 'Отмеченные поля обязательны для заполнения';
      }
    },
    resetError(): void {
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

  &__create-button {
    @include basicCard;
    display: block;
    margin: 0 auto;
    font-size: 1rem;
    color: $color-1;
    background-color: $color-2;
  }
}

.lable-text {
  text-align: left;
}
</style>
