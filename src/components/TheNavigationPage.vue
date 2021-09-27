<template>
  <v-list-item v-bind="$attrs" link>
    <v-list-item-icon>
      <v-icon color="primary"> {{ icon }} </v-icon>
    </v-list-item-icon>
    <v-list-item-title class="grey--text text--lighten-5">
      {{ title }}</v-list-item-title
    >
  </v-list-item>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
};
</script>