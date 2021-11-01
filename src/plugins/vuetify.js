import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true
        },
        themes: {
            light: {
                primary: '#6366F1',
                secondary: '#312E81',
                accent: '#FAFAFA',
                error: '#DC2626',
            },
            dark: {
                primary: '#171717',
                secondary: '#b0bec5',
                accent: '#8c9eff',
                error: '#DC2626',
            }
        },
    },
});
