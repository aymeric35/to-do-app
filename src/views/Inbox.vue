<template>
  <div>
    <!-- <v-container>
      <v-row class="d-flex justify-end py-6 pr-2">
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
              <v-btn color="blue darken-1" text @click="reset()"> Close </v-btn>
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
      </v-row>
    </v-container> -->
    <v-container>
      <v-card v-if="tasks.length > 0">
        <template v-for="(task, i) in tasks">
          <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

          <v-list-item :key="`${i}-${task.name}`">
            <v-list-item-action>
              <v-checkbox
                off-icon="mdi-checkbox-blank-circle-outline"
                on-icon="mdi-checkbox-marked-circle-outline"
                v-model="task.completed"
              >
                <template v-slot:label>
                  <div
                    class="ml-4"
                    v-text="task.name"
                    :class="
                      (task.completed &&
                        'grey--text' &&
                        'text-decoration-line-through') ||
                      'primary--text'
                    "
                  ></div>
                </template>
              </v-checkbox>
            </v-list-item-action>

            <v-spacer></v-spacer>

            <v-dialog v-model="taskModal" :retain-focus="false" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-icon class="mr-2" color="primary" v-bind="attrs" v-on="on">
                  mdi-card-text
                </v-icon>
              </template>

              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  {{ task.name }}
                </v-card-title>

                <v-card-text>
                  {{ task.description }}
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="taskModal = false">
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-menu transition="scroll-y-transition">
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  class="mr-2"
                  :class="'priority-' + task.priority"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-flag
                </v-icon>
              </template>
              <v-list>
                <v-list-item
                  v-for="priority in priorities"
                  :key="priority.value"
                  @click="updatePriority(task, priority.value)"
                  link
                >
                  <v-list-item-icon>
                    <v-icon :class="'priority-' + priority.value"
                      >mdi-flag</v-icon
                    >
                  </v-list-item-icon>
                  <v-list-item-title v-text="priority.text"></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-icon
              class="red--text text--lighten-3"
              @click="deleteTask(task.uuid)"
            >
              mdi-delete
            </v-icon>
          </v-list-item>
        </template>
        <v-divider></v-divider>
        <v-list-item class="justify-center">
          <v-list-item-action>
            <v-dialog v-model="dialog" max-width="600px" persistent>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  elevation="2"
                  color="primary"
                  small
                  outlined
                  fab
                  v-bind="attrs"
                  v-on="on"
                >
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
                          <v-select
                            v-model="selectedPriority"
                            :items="priorities"
                            :rules="rule.priority"
                            label="Task priority"
                            return-object
                            required
                          ></v-select>
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
          </v-list-item-action>
        </v-list-item>
      </v-card>
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
      selectedPriority: { text: "Medium", value: 2 },
      priorities: [
        { text: "Critical", value: 0 },
        { text: "High", value: 1 },
        { text: "Medium", value: 2 },
        { text: "Low", value: 3 },
      ],
      description: "",
      taskModal: false,
      rule: {
        name: [
          (v) => !!v || "Name is required",
          (v) =>
            (v && v.length <= 30) || "Name must be less than 30 characters",
        ],
        selectedPriority: [(v) => !!v || "Priority is required"],
        description: [
          (v) => !!v || "Description is required",
          (v) =>
            (v && v.length <= 200) ||
            "Description must be less than 200 characters",
        ],
      },
    };
  },
  computed: {
    ...mapState(["tasks"]),
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
        completed: false,
        name: this.name,
        description: this.description,
        priority: this.selectedPriority.value,
        date: this.date,
      };
      console.log(this.selectedPriority);
      console.log(this.selectedPriority.value);
      console.log(entry);
      this.$store.commit("ADD_NEW_TASK", entry);
    },
    reset() {
      this.closeDialog();
      this.$refs.form.resetValidation();
      this.selectedPriority = { text: "Medium", value: 2 };
      this.name = "";
      this.description = "";
    },
    openTaskModal() {},
    updatePriority(currentTask, priorityValue) {
      this.$store.commit("UPDATE_PRIORITY", { currentTask, priorityValue });
    },
    deleteTask(uuid) {
      this.$store.commit("DELETE_TASK", uuid);
    },
  },
};
</script>

<style lang="scss">
.v-card .v-input--selection-controls__input i {
  color: var(--v-primary-base);
}

.v-icon.priority-0 {
  color: #dc2626;
}

.v-icon.priority-1 {
  color: #f9a8d4;
}

.v-icon.priority-2 {
  color: #6366f1;
}

.v-icon.priority-3 {
  color: #10b981;
}
</style>