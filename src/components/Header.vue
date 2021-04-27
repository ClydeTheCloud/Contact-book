<template>
  <header class="container header">
    <router-link v-if="$route.path !== '/'" to="/" class="header__home-button"
      >На главную</router-link
    >
    <h1>Книга контактов</h1>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Header',
});
</script>

<style lang="scss">
.header {
  position: relative;
  border: solid 1px transparent;

  &__home-button {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    text-decoration: none;
    color: $color-1;

    &:hover {
      color: $color-3;
    }

    @media screen and (max-width: $tablet) {
      top: 25%;
    }
  }

  @media screen and (max-width: $tablet) {
    font-size: 0.9em;

    h1 {
      margin: 2em 0;
    }
  }

  // @media screen and (max-width: $mobile) {
  //   font-size: 0.8em;
  //   h1 {
  //     display: block;
  //     width: 50%;
  //     margin: 1em auto;
  //   }
  // }
}
</style>
