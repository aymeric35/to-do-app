<template>
  <v-navigation-drawer color="secondary" permanent expand-on-hover app>
    <v-list nav dense>
      <TheNavigationPage
        to="/"
        icon="mdi-inbox"
        title="Inbox"
      ></TheNavigationPage>
      <v-list-group no-action>
        <v-icon slot="appendIcon" color="primary">mdi-chevron-down</v-icon>
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon color="primary">mdi-format-list-bulleted</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="grey--text text--lighten-5"
            >My lists</v-list-item-title
          >
        </template>
        <v-dialog v-model="dialog" max-width="400" persistent>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item v-bind="attrs" v-on="on">
              <v-list-item-icon>
                <v-icon color="primary">mdi-plus-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="grey--text text--lighten-5"
                >Add a list</v-list-item-title
              >
            </v-list-item>
          </template>

          <v-card>
            <v-card-title class="primary text-h5">
              Add a new list
            </v-card-title>
            <v-container>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="name"
                      label="List Name"
                      :counter="30"
                      :rules="rule.name"
                      required
                    ></v-text-field> </v-col
                ></v-row>
              </v-form>
            </v-container>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="reset()"> Close </v-btn>
              <v-btn
                :disabled="!valid"
                color="blue darken-1"
                type="submit"
                text
                @click="validate()"
              >
                Add a list
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-list-item v-for="(list, i) in lists" :key="i" :to="list" link>
          <v-list-item-icon>
            <v-icon color="primary">mdi-check-underline-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="grey--text text--lighten-5"
            >{{list}}</v-list-item-title
          >
        </v-list-item>

      </v-list-group>
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
  data: () => ({
    lists: [],
    name: "",
    dialog: false,
    valid: true,
    rule: {
      name: [
        (v) => !!v || "List name is required",
        (v) => (v && v.length <= 30) || "Name must be less than 30 characters",
      ],
    },
  }),
  methods: {
    closeDialog() {
      this.dialog = false;
    },
    addEntry() {
      const entry = this.name;
      this.lists.unshift(entry);
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.addEntry();
        this.reset();
      }
    },
    reset() {
      this.closeDialog();
      this.$refs.form.resetValidation();
      this.name = "";
    },
  },
};
</script>