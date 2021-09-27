<template>
  <v-app>
    <v-navigation-drawer color="secondary" permanent expand-on-hover app>
      <v-list nav dense>
        <v-list-item to="/" link>
          <v-list-item-icon>
            <v-icon color="primary">mdi-inbox</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="grey--text text--lighten-5"
            >Inbox</v-list-item-title
          >
        </v-list-item>
        <v-list-item to="/list" link>
          <v-list-item-icon>
            <v-icon color="primary">mdi-format-list-bulleted</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="grey--text text--lighten-5"
            >My lists</v-list-item-title
          >
        </v-list-item>
        <v-list-item to="/settings" link>
          <v-list-item-icon>
            <v-icon color="primary">mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="grey--text text--lighten-5"
            >Settings</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

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
export default {};
</script>

<style lang="scss">
</style>