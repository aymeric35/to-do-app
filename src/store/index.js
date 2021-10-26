import Vue from 'vue'
import Vuex from 'vuex'
import { v4 as uuidv4 } from "uuid"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [
      {
        uuid: uuidv4(),
        page: 'test1',
        completed: false,
        name: 'Task 0',
        description: 'placeholder',
        priority: 1,
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
      },
      {
        uuid: uuidv4(),
        page: 'test1',
        completed: false,
        name: 'Task 1',
        description: 'placeholder',
        priority: 1,
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
      },
      {
        uuid: uuidv4(),
        page: 'test2',
        completed: false,
        name: 'Task 2',
        description: 'placeholder',
        priority: 1,
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
      },
      {
        uuid: uuidv4(),
        page: 'test2',
        completed: false,
        name: 'Task 3',
        description: 'placeholder',
        priority: 1,
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
      },
    ],
    lists: ['test1', 'test2']
  },
  mutations: {
    DELETE_LIST(state, { list, i }) {
      state.lists.splice(i, 1);
      const filtered = state.tasks.filter((task) => task.page !== list);
      state.tasks = filtered;
    }
  },
  actions: {
  },
  modules: {
  }
})
