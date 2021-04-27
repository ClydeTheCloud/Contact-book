<template>
  <button @click="clickHandler">
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

// Кнопка с подтверждением действия, вызывает модальное окно
export default Vue.extend({
  name: 'ButtonWithConfirmationModal',
  props: {
    modalMessage: { type: String, required: true },
    onClick: { type: Function, required: true },
  },
  methods: {
    // Открывает модальное окно и передаёт необходимые аргументы через эвент-хаб
    clickHandler(): void {
      this.$modalEventHub.$emit('open-modal', this.modalMessage, this.onClick);
    },
  },
});
</script>
