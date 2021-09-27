<template>
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
</template>