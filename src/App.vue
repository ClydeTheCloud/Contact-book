<template>
  <div id="app">
    <Header />
    <transition mode="out-in" name="slide">
      <router-view />
    </transition>
    <ModalConfirm />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '@/components/Header.vue';
import ModalConfirm from '@/components/ModalConfirm.vue';

export default Vue.extend({
  components: {
    Header,
    ModalConfirm,
  },
});
</script>

<style lang="scss">
@import './scss/main.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: $color-1;
}
</style>
