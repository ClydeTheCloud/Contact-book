<template>
  <div class="add-custom-field">
    <button @click="openCustomField" v-if="!isOpen" class="add-custom-field__button">
      + Новое поле
    </button>

    <div v-else class="add-custom-field__wrapper">
      <p v-if="error" class="add-custom-field__error-message editing-error-message">
        {{ error }}
      </p>
      <label>
        <p class="add-custom-field__lable-text lable-text">
          Название поля
        </p>
        <input
          type="text"
          v-model.trim="name"
          class="add-custom-field__add-field-input main-input"
          :class="{ '--input-error': error }"
        />
      </label>
      <div class="add-custom-field__custom-field-controls">
        <button @click.prevent="addCustomField" class="add-custom-field__button">
          Добавить поле
        </button>
        <button @click="cancelCustomField" class="add-custom-field__button">
          Отмена
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { NewField, CustomField } from '@/types';

export default Vue.extend({
  name: 'AddCustomField',
  data(): NewField {
    return {
      error: '',
      isOpen: false,
      name: '',
    };
  },
  props: {
    customFields: {
      type: Array as PropType<CustomField[]>,
      required: true,
    },
  },

  methods: {
    addCustomField(): void {
      if (this.name && this.customFields.every((field: CustomField) => field.name !== this.name)) {
        // this.newContact.customFields.push({ name: this.newField.name, value: '' });
        this.$emit('new-custom-field-added', this.name);
        this.resetError();
      } else if (this.name) {
        this.error = 'Поле с таким именем уже существует';
      } else {
        this.error = 'Введите имя поля';
      }
    },
    cancelCustomField(): void {
      this.resetError();
    },
    openCustomField(): void {
      this.isOpen = true;
    },
    resetError(): void {
      this.name = '';
      this.isOpen = false;
      this.error = '';
    },
  },
});
</script>

<style lang="scss">
.add-custom-field {
  &__wrapper {
    position: relative;

    .add-custom-field__error-message {
      top: 0;
      transform: translate(-50%, -50%);
    }
  }

  &__custom-field-controls {
    display: flex;
    justify-content: space-between;
  }

  &__button {
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
}
</style>
