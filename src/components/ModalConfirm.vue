<template>
  <transition name="fade">
    <div v-if="isOpen" class="overlay">
      <div class="modal">
        <p class="message">{{ message }}</p>

        <div class="modal__buttons">
          <button class="modal__button button" @click="accept">Да</button>
          <button class="modal__button button" @click="cancel">Отмена</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { ModalConfirmComponentData } from '@/types';
import Vue from 'vue';

// Модальное окно для подтверждения действий
export default Vue.extend({
  name: 'ModalConfirm',
  data(): ModalConfirmComponentData {
    return {
      isOpen: false,
      message: '',
      onAccept: undefined,
    };
  },
  methods: {
    accept(): void {
      if (this.onAccept) {
        this.onAccept();
      }
      this.close();
    },
    cancel(): void {
      this.close();
    },
    // Метод для отображения модального окна с нужными данными
    // Функция получает аргументы из события 'open-modal',
    // которое передаётся через эвент-хаб
    open(message: string, onAccept: () => void): void {
      this.message = message;
      this.onAccept = onAccept;
      this.isOpen = true;
    },
    // Закрывает окно и сбрасывает предыдущее состояние
    close(): void {
      this.message = '';
      this.onAccept = undefined;
      this.isOpen = false;
    },
  },
  // При создании компонент подписывается на события, передаваеймые ему через эвент-хаб
  created(): void {
    this.$modalEventHub.$on('open-modal', this.open);
  },
  // При удалении компонент отписывается от этих событий
  beforeDestroy(): void {
    this.$modalEventHub.$off('open-modal');
  },
});
</script>

<style lang="scss">
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba($color: $color-3, $alpha: 0.5);
  display: grid;
  place-items: center;

  .modal {
    background-color: $color-1;
    color: $color-2;
    padding: 2rem;
    border-radius: 10px;

    .message {
      margin-bottom: 2rem;
      max-width: 400px;
      word-wrap: break-word;
    }

    &__buttons {
      display: flex;
      justify-content: space-around;
    }

    @media screen and (max-width: $tablet) {
      max-width: 450px;
    }

    @media screen and (max-width: $mobile) {
      max-width: 300px;
    }

    @media screen and (max-width: $mobile-sm) {
      max-width: 280px;
    }
  }
}
</style>
