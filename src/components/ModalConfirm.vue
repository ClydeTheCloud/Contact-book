<template>
  <div class="overlay">
    <div class="modal">
      <p class="message">{{ message }}</p>
    </div>

    <div class="modal__buttons">
      <button class="modal__button" @click="accept">Да</button>
      <button class="modal__button" @click="cancel">Отмена</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'ModalConfirm',

  props: {
    message: String,
    onAccept: Function,
    onCancel: Function,
  },

  methods: {
    accept() {
      if (this.onAccept) {
        this.onAccept();
      }
    },
    cancel() {
      if (this.onCancel) {
        this.onCancel();
      }
    },
  },
});
</script>

<style lang="scss">
.overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: $color-1;
  opacity: 0.2;
}
</style>
