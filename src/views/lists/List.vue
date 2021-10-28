<template>
  <div>
    <v-container>
      <v-row align="center" class="py-6">
        <v-col cols="4"></v-col>
        <v-col
          cols="4"
          align="center"
          class="text-center grey--text text--lighten-5 text-h4"
        >
          {{ $route.params.list }}
        </v-col>
        <v-col cols="4" align="end">
          <v-dialog v-model="dialog" max-width="600px" persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-btn elevation="2" color="primary" fab v-bind="attrs" v-on="on">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="text-h5">Task</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="name"
                          label="Task name*"
                          :counter="30"
                          :rules="rule.name"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="priority"
                          label="Task priority*"
                          type="number"
                          :rules="rule.priority"
                          min="0"
                          max="9999"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="8">
                        <v-textarea
                          v-model="description"
                          name="input-7-1"
                          rows="1"
                          label="Task description*"
                          :counter="200"
                          :rules="rule.description"
                          auto-grow
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="date"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="date"
                              label="Due date"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="date"
                            color="primary"
                            :min="new Date(Date.now()).toISOString()"
                            no-title
                            scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu.save(date)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="reset()">
                  Close
                </v-btn>
                <v-btn
                  :disabled="!valid"
                  color="blue darken-1"
                  type="submit"
                  text
                  @click="validate()"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Completed</th>
              <th class="text-left">Task</th>
              <th class="text-left">Description</th>
              <th class="text-left">Priority</th>
              <th class="text-left">Due Date</th>
            </tr>
          </thead>
          <tbody v-if="filteredTasks.length > 0">
            <tr v-for="item in filteredTasks" :key="item.uuid">
              <td>
                <v-checkbox
                  v-model="item.completed"
                  @click="checkTaskCompletion(item, item.uuid)"
                ></v-checkbox>
              </td>
              <td>{{ item.name }}</td>
              <td>{{ item.description }}</td>
              <td>{{ item.priority }}</td>
              <td>{{ item.date }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="5" class="mx-auto text-center">
                You have completed all of your tasks or you didn't add a task
                yet.
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { mapState } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      valid: true,
      name: "",
      priority: 1,
      description: "",
      rule: {
        name: [
          (v) => !!v || "Name is required",
          (v) =>
            (v && v.length <= 30) || "Name must be less than 30 characters",
        ],
        priority: [
          (v) => !!v || "Priority is required",
          (v) =>
            (v > 0 && v < 6) ||
            "Priority must be a number between 1 and 5",
        ],
        description: [
          (v) => !!v || "Description is required",
          (v) =>
            (v && v.length <= 200) ||
            "Description must be less than 200 characters",
        ],
      },
    };
  },
  beforeRouteUpdate: function (to, from, next) {
    if (to.name !== "List") return next();
    const exists = this.lists.find((list) => list === to.params.list);
    if (exists) {
      next();
    } else {
      next({ name: "404" });
    }
  },
  computed: {
    ...mapState(["tasks", "lists"]),
    filteredTasks() {
      const currentPage = this.$route.params.list;
      return this.tasks.filter((task) => task.page === currentPage);
    },
  },
  methods: {
    closeDialog() {
      this.dialog = false;
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.addEntry();
        this.reset();
      }
    },
    addEntry() {
      const entry = {
        uuid: uuidv4(),
        page: this.$route.params.list,
        completed: false,
        name: this.name,
        description: this.description,
        priority: this.priority,
        date: this.date,
      };
      this.$store.commit("ADD_NEW_TASK", entry);
    },
    reset() {
      this.closeDialog();
      this.$refs.form.resetValidation();
      this.priority = 1;
      this.name = "";
      this.description = "";
    },
    checkTaskCompletion(item, uuid) {
      this.$store.commit("CHECK_TASK_COMPLETION", { item, uuid });
    },
  },
};
</script>