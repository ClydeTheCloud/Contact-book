<template>
  <div class="container">
    <section class="contact-card">
      <button
        @click="undoChange"
        class="contact-card__undo-button button-icon"
        v-if="isUndoButtonVisible"
      >
        <img src="@/assets/undo.svg" class="button-icon__img" alt="Шаг назад" />
      </button>
      <button
        @click="redoChange"
        class="contact-card__redo-button button-icon"
        v-if="isRedoButtonVisible"
      >
        <img src="@/assets/redo.svg" class="button-icon__img" alt="Шаг вперёд" />
      </button>

      <img
        v-if="currentState.photoUrl"
        :src="currentState.photoUrl"
        :alt="`На фото ${currentState.firstName} ${currentState.lastName}`"
        class="contact-card__photo"
      />

      <p v-if="editingState.submitError.message" class="editing-error-message">
        {{ editingState.submitError.message }}
      </p>

      <div v-if="!isEditing" class="contact-card__main-info">
        <h2 class="contact-card__name">
          {{ currentState.firstName + ' ' + currentState.lastName }}
        </h2>
        <a class="contact-card__phone-number" :href="`tel:${currentState.phoneNumber}`">
          {{ currentState.phoneNumber }}
        </a>
      </div>

      <div v-else class="contact-card__main-info contact-card__main-info--editing">
        <MainInputs
          :firstName="editingState.contact.firstName"
          :lastName="editingState.contact.lastName"
          :phoneNumber="editingState.contact.phoneNumber"
          :photoUrl="editingState.contact.photoUrl"
          @inputFirstName="editingState.contact.firstName = $event"
          @inputLastName="editingState.contact.lastName = $event"
          @inputPhoneNumber="editingState.contact.phoneNumber = $event"
          @inputPhotoUrl="editingState.contact.photoUrl = $event"
          :firstNameError="editingState.submitError.fields.firstName"
          :phoneNumberError="editingState.submitError.fields.phoneNumber"
        />

        <label
          v-for="field in editingState.contact.newCustomFields"
          :key="field.name"
          class="contact-card__label"
        >
          <p class="contact-card__lable-text lable-text">
            {{ field.name }}
          </p>
          <input v-model.trim="field.value" type="text" class="main-input custom-field-input" />
          <button
            @click="removeCustomFieldWhileEditing(field.name)"
            class="new-contact-form__remove-field-button"
          >
            &times;
          </button>
        </label>

        <AddCustomField
          :customFields="currentState.customFields"
          @new-custom-field-added="addCustomFieldWhileEditing"
        />

        <button class="contact-card__button button" @click="updateContactInfo">Сохранить</button>
        <button class="contact-card__button button" @click="cancelUpdateOfContactInfo">
          Отменить
        </button>
      </div>

      <button v-if="!isEditing" @click="isEditing = !isEditing" class="contact-card__button button">
        Редактировать
      </button>

      <ContactCardField
        v-for="field in currentState.customFields"
        :key="field.name"
        v-bind="field"
        :update="updateField"
        :delete="deleteField"
      />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import cloneDeep from 'lodash.clonedeep';
import { Contact, CustomField, ContactCardData } from '@/types';
import ContactCardField from '@/components/ContactCardField.vue';
import MainInputs from '@/components/MainInputs.vue';
import AddCustomField from '@/components/AddCustomField.vue';

export default Vue.extend({
  name: 'ContactCard',
  components: {
    ContactCardField,
    MainInputs,
    AddCustomField,
  },
  data(): ContactCardData {
    return {
      previousState: {
        steps: [],
        currentStep: -1,
      },
      isEditing: false,
      editingState: {
        contact: {
          firstName: '',
          lastName: '',
          phoneNumber: '',
          photoUrl: '',
          newCustomFields: [],
        },
        submitError: {
          message: '',
          fields: {
            firstName: false,
            phoneNumber: false,
          },
        },
      },
    };
  },
  computed: {
    ...mapGetters(['getById']),
    currentState(): Contact {
      return this.getById(this.id);
    },
    isUndoButtonVisible(): boolean {
      return !(this.previousState.currentStep < 1) && !this.isEditing;
    },
    isRedoButtonVisible(): boolean {
      return (
        !(this.previousState.currentStep + 1 === this.previousState.steps.length) && !this.isEditing
      );
    },
  },
  props: {
    id: { type: Number, required: true },
  },
  methods: {
    ...mapActions(['updateContact']),
    commitChange(updatedContact: Contact): void {
      const clonedCurrentState = cloneDeep(updatedContact);
      if (this.previousState.steps.length > this.previousState.currentStep + 1) {
        this.previousState.steps.splice(this.previousState.currentStep + 1);
      }
      this.previousState.steps.push(clonedCurrentState);
      this.previousState.currentStep += 1;
      this.updateContact(updatedContact);
    },
    updateField(field: CustomField): void {
      const newState = cloneDeep(this.currentState);
      const fieldIndex = newState.customFields.findIndex((f: CustomField) => f.name === field.name);
      newState.customFields[fieldIndex] = field;
      this.commitChange(newState);
    },
    addCustomFieldWhileEditing(newFieldName: string): void {
      this.editingState.contact.newCustomFields.push({ name: newFieldName, value: '' });
    },
    removeCustomFieldWhileEditing(name: string): void {
      this.editingState.contact.newCustomFields = this.editingState.contact.newCustomFields.filter(
        (field) => field.name !== name,
      );
    },
    deleteField(field: CustomField): void {
      const newState: Contact = cloneDeep(this.currentState);
      const fieldIndex = newState.customFields.findIndex((f: CustomField) => f.name === field.name);
      newState.customFields.splice(fieldIndex, 1);
      this.commitChange(newState);
    },
    undoChange(): void {
      if (this.previousState.currentStep < 1) {
        console.log('нечего отменять');
        return;
      }
      console.log('отмена, шаг назад');
      console.log('шаг', this.previousState.currentStep);
      this.previousState.currentStep -= 1;
      this.updateContact(this.previousState.steps[this.previousState.currentStep]);
    },
    redoChange(): void {
      if (this.previousState.currentStep + 1 === this.previousState.steps.length) {
        console.log('нечего возвращать');
        return;
      }
      console.log(
        'возвращяемое состояние',
        this.previousState.steps[this.previousState.currentStep],
      );
      console.log('массив состояний', this.previousState.steps);
      console.log('шаг', this.previousState.currentStep);
      this.previousState.currentStep += 1;
      this.updateContact(this.previousState.steps[this.previousState.currentStep]);
    },
    updateContactInfo(): void {
      if (this.editingState.contact.firstName && this.editingState.contact.phoneNumber) {
        // Сохраняем новую контактную информацию
        const newState = cloneDeep(this.currentState);
        newState.firstName = this.editingState.contact.firstName;
        newState.lastName = this.editingState.contact.lastName;
        newState.phoneNumber = this.editingState.contact.phoneNumber;
        newState.photoUrl = this.editingState.contact.photoUrl;
        newState.customFields = [
          ...newState.customFields,
          ...this.editingState.contact.newCustomFields,
        ];
        this.commitChange(newState);
        this.isEditing = false;
        this.resetErrors();
      } else {
        this.editingState.submitError.fields.firstName = !this.editingState.contact.firstName;
        this.editingState.submitError.fields.phoneNumber = !this.editingState.contact.phoneNumber;
        this.editingState.submitError.message = 'Отмеченные поля обязательны для заполнения';
      }
    },
    cancelUpdateOfContactInfo(): void {
      // Отмена обновления контактной информации
      this.setEditingStateToProps();
      this.isEditing = false;
      this.resetErrors();
    },
    resetErrors(): void {
      this.editingState.submitError.fields.firstName = false;
      this.editingState.submitError.fields.phoneNumber = false;
      this.editingState.submitError.message = '';
    },
    setEditingStateToProps(): void {
      this.editingState.contact.firstName = this.currentState.firstName;
      this.editingState.contact.lastName = this.currentState.lastName;
      this.editingState.contact.phoneNumber = this.currentState.phoneNumber;
      this.editingState.contact.photoUrl = this.currentState.photoUrl;
    },
  },
  created(): void {
    this.setEditingStateToProps();

    const clonedCurrentState = cloneDeep(this.currentState);
    this.previousState.steps.push(clonedCurrentState);
    this.previousState.currentStep += 1;
  },
});
</script>

<style lang="scss">
.contact-card {
  @include basicCard;
  position: relative;
  padding: 2rem;
  padding-top: 3rem;
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

  &__button {
    margin: 1rem;
    font-weight: bold;
    background-color: $color-3;
    color: $color-2;
  }

  &__undo-button {
    left: 2rem;
  }

  &__redo-button {
    right: 2rem;
  }

  &__undo-button,
  &__redo-button {
    position: absolute;
    top: 2rem;

    .button-icon__img {
      width: 35px;
    }
  }

  .main-input {
    width: 100%;
  }

  .main-input.custom-field-input {
    width: calc(100% - 3rem);
  }
}
</style>
