<template>
  <div class="contact-field">
    <!-- Название поля -->
    <p class="contact-field__name">{{ name }}:</p>
    <!-- Значение поля в режиме просмотра -->
    <p v-if="!isEditing" class="contact-field__value">
      {{ value }}
    </p>

    <!-- Значение поля в режиме редактирования -->
    <div v-else>
      <input
        @keyup="inputEnterKeyHandler"
        type="text"
        class="contact-field__edit-input"
        v-model="inputValue"
      />
    </div>

    <!-- Блок кнопок в режиме просмотра -->
    <div v-if="!isEditing" class="contact-field__buttons">
      <button class="contact-field__button button-icon" @click="startEditingHandler">
        <img src="@/assets/edit icon.svg" class="button-icon__img" alt="Редактировать поле" />
      </button>
      <ButtonWithConfirmationModal
        class="contact-field__button button-icon"
        :modalMessage="'Вы уверены что хотите удалить поле '.concat(name).concat('?')"
        :onClick="deleteHandler"
      >
        <img src="@/assets/delete icon.svg" class="button-icon__img" alt="Удалить" />
      </ButtonWithConfirmationModal>
    </div>

    <!-- Блок кнопок в режиме редактирования -->
    <div v-else class="contact-field__buttons">
      <button class="contact-field__button button-icon" @click="updateHandler">
        <img src="@/assets/accept icon.svg" class="button-icon__img" alt="Сохранить" />
      </button>
      <ButtonWithConfirmationModal
        class="contact-field__button button-icon"
        :modalMessage="'Внесённые изменения будут потеряны. Продолжить?'"
        :onClick="cancelEditing"
      >
        <img src="@/assets/cancel icon.svg" class="button-icon__img" alt="Отменить" />
      </ButtonWithConfirmationModal>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ButtonWithConfirmationModal from '@/components/ButtonWithConfirmationModal.vue';

export default Vue.extend({
  name: 'ContactCardField',
  components: {
    ButtonWithConfirmationModal,
  },
  data() {
    return {
      isEditing: false,
      inputValue: this.value,
    };
  },
  props: {
    name: { type: String, required: true },
    value: { type: String, required: true },
    update: { type: Function, required: true },
    delete: { type: Function, required: true },
  },
  methods: {
    inputEnterKeyHandler(e: KeyboardEvent): void {
      if (e.key === 'Enter') {
        this.updateHandler();
      }
    },
    // Обновляет значение поля
    updateHandler(): void {
      this.update({ name: this.name, value: this.inputValue });
      this.isEditing = false;
    },
    // Удаляет поле
    deleteHandler(): void {
      this.delete({ name: this.name, value: this.inputValue });
    },
    // Отмена редактирования поля, сброс значения инпута к изначальному
    cancelEditing(): void {
      this.inputValue = this.value;
      this.isEditing = false;
    },
    // Переход в режим редактирования значения поля
    startEditingHandler(): void {
      this.inputValue = this.value;
      this.isEditing = true;
    },
  },
});
</script>

<style lang="scss">
.contact-field {
  position: relative;
  padding: 1rem;
  border-radius: 10px;
  text-align-last: left;

  &__name {
    font-size: 0.95rem;
  }

  &__value {
    font-size: 1.5rem;
  }

  &__edit-input {
    font-size: calc(1.5rem - 6px);
    width: calc(100% - 25px - 1rem);
  }

  &:nth-of-type(even) {
    background-color: $color-4;
  }

  &__buttons {
    position: absolute;
    right: 1rem;
    top: 50%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    height: 100%;
    transform: translateY(-50%);
  }
}
</style>
