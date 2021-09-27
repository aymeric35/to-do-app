<template>
  <v-app>
    <TheNavigation></TheNavigation>

    <v-app-bar color="primary" app>
      <v-toolbar-title class="grey--text text--lighten-5"
        >To-do App</v-toolbar-title
      >
    </v-app-bar>

    <v-main class="grey darken-4">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import TheNavigation from './components/TheNavigation'
export default {
  components: {
    TheNavigation
  }
};
</script>

<style lang="scss">
</style>