<template>
  <v-app>
    <v-navigation-drawer color="secondary" permanent expand-on-hover app>
      <v-list nav dense>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon color="primary">mdi-inbox</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="grey--text text--lighten-5"
            >Inbox</v-list-item-title
          >
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon color="primary">mdi-format-list-bulleted</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="grey--text text--lighten-5"
            >My lists</v-list-item-title
          >
        </v-list-item>
        <v-list-item link>
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

    <v-main class="grey lighten-4">
      <v-container class="d-flex justify-end">
        <v-btn elevation="2" color="primary" fab
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </v-container>
      <v-container>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Completed</th>
                <th class="text-left">Task</th>
                <th class="text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in desserts" :key="item.name">
                <td>{{ item.completed }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>
              </tr>
            </tbody>
          </template></v-simple-table
        >
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      desserts: [
        {
          completed: false,
          name: "Go smite pd",
          description: "Jouer à Smite (ps: je déconne, jeune de merde)"
        },
        {
          completed: false,
          name: "jouer à Tales of Arise le bge",
          description: "nofake"
        },
        {
          completed: false,
          name: "Racheter CIG et sortir Star Citizen",
          description: "Trouver 2 milliards avant"
        }
      ]
    }
  }
};
</script>

<style lang="scss">
</style>