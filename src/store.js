import Vue from 'vue';
import { v4 as uuidv4 } from "uuid";

export default Vue.observable({
    tasks: [
        {
            uuid: uuidv4(),
            page: 'test1',
            completed: false,
            name: 'Bonjour',
            description: 'test1',
            priority: 1,
            date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10),
        },
        {
            uuid: uuidv4(),
            page: 'test1',
            completed: false,
            name: 'Hello',
            description: 'test1',
            priority: 1,
            date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10),
        },
        {
            uuid: uuidv4(),
            page: 'test2',
            completed: false,
            name: 'Au revoir',
            description: 'test2',
            priority: 1,
            date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10),
        },
        {
            uuid: uuidv4(),
            page: 'test2',
            completed: false,
            name: 'Goodbye',
            description: 'test2',
            priority: 1,
            date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10),
        },
    ],
    lists: ['test1', 'test2']
})