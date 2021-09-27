<template>
  <v-navigation-drawer color="secondary" permanent expand-on-hover app>
    <v-list nav dense>
      <TheNavigationPage
        to="/"
        icon="mdi-inbox"
        title="Inbox"
      ></TheNavigationPage>
      <TheNavigationPage
        to="/list"
        icon="mdi-format-list-bulleted"
        title="My lists"
      ></TheNavigationPage>
      <TheNavigationPage
        to="/settings"
        icon="mdi-cog"
        title="Settings"
      ></TheNavigationPage>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import TheNavigationPage from "../components/TheNavigationPage";

export default {
  components: {
    TheNavigationPage,
  },
};
</script>