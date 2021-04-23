<template>
  <div class="contact-field">
    <p class="contact-field__name">{{ name }}:</p>
    <p v-if="!isEditing" class="contact-field__value">
      {{ value }}
    </p>
    <div v-else>
      <input
        @keyup="inputEnterKeyHandler"
        type="text"
        class="contact-field__edit-input"
        v-model="inputValue"
      />
    </div>
    <div v-if="!isEditing" class="contact-field__buttons">
      <button class="contact-field__button button-icon" @click="startEditingHandler">
        <img src="@/assets/edit icon.svg" class="button-icon__img" alt="Редактировать поле" />
      </button>
      <button class="contact-field__button button-icon" @click="deleteHandler">
        <img src="@/assets/delete icon.svg" class="button-icon__img" alt="Удалить" />
      </button>
    </div>
    <div v-else class="contact-field__buttons contact-field__buttons--editing">
      <button class="contact-field__button button-icon" @click="updateHandler">
        <img src="@/assets/accept icon.svg" class="button-icon__img" alt="Сохранить" />
      </button>
      <button class="contact-field__button button-icon" @click="cancelEditing">
        <img src="@/assets/cancel icon.svg" class="button-icon__img" alt="Отменить" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ContactCardField',
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
    inputEnterKeyHandler(e: KeyboardEvent) {
      if (e.key === 'Enter') {
        this.updateHandler();
      }
    },
    updateHandler() {
      this.update({ name: this.name, value: this.inputValue });
      this.isEditing = false;
    },
    deleteHandler() {
      this.delete({ name: this.name, value: this.inputValue });
    },
    cancelEditing() {
      this.inputValue = this.value;
      this.isEditing = false;
    },
    startEditingHandler() {
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
