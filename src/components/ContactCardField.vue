<template>
  <div class="contact-field">
    <p class="contact-field__name">{{ name }}:</p>
    <p v-if="!isEditing" class="contact-field__value">
      {{ value }}
      <button class="contact-field__button" @click="isEditing = true">
        <img src="@/assets/edit icon.svg" alt="Редактировать поле" style="width: 25px;" />
      </button>
      <button class="contact-field__button">
        <img src="@/assets/delete icon.svg" alt="Удалить" style="width: 25px;" />
      </button>
    </p>
    <div v-else>
      <input type="text" class="contact-field__edit-input" />
      <button class="contact-field__button">
        <img src="@/assets/accept icon.svg" alt="Сохранить" style="width: 25px;" />
      </button>
      <button class="contact-field__button" @click="isEditing = false">
        <img src="@/assets/cancel icon.svg" alt="Отменить" style="width: 25px;" />
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
    };
  },
  props: {
    name: String,
    value: String,
  },
});
</script>

<style lang="scss">
.contact-field {
  padding: 1rem;
  border-radius: 10px;
  text-align-last: left;

  &__name {
    font-size: 0.95rem;
  }

  &__value {
    font-size: 1.5rem;
  }

  &:nth-of-type(odd) {
    background-color: $color-4;
  }
}
</style>
