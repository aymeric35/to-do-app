<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      color="secondary"
      app
    >
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar color="primary" app>
      <v-app-bar-nav-icon color="accent" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!--  -->
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ drawer: null }),
  }
</script>