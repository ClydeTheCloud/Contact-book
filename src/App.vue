<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '@/components/Header.vue';

// TODO Абстракция над кнопкой для блокировки во время вызова модального окна
// TODO Reusable модальное окно подтверждения действия

export default Vue.extend({
  components: {
    Header,
  },
});
</script>

<style lang="scss">
@import './scss/main.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color-1;
}
</style>
