<template>
  <q-card class="my-card" flat bordered>
    <a :href="link">
      <q-img :src="imageUrl" :ratio="ratio" draggable="false">
        <q-checkbox
          class="favorite absolute-top-right transparent"
          style="padding: 0"
          v-model="val"
          checked-icon="favorite"
          unchecked-icon="favorite_border"
          color="red"
          keep-color
          size="50px"
          indeterminate-icon="help"
        /> </q-img
    ></a>

    <q-card-section align="center">
      <a :href="link"
        ><div class="text-subtitle1">
          {{ title }}
        </div></a
      >
    </q-card-section>
  </q-card>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    return {
      val: ref(false)
    }
  },
  props: {
    imageUrl: {
      type: String,
      default: 'https://cdn-icons-png.flaticon.com/512/3875/3875148.png'
    },
    ratio: {
      type: String,
      default: '1'
    },
    link: {
      type: String,
      default: '/'
    },
    title: {
      type: String,
      default: 'default title'
    }
  }
}
</script>

<style scoped>
a {
  color: inherit;
  text-decoration: none;
}
.text-subtitle1 {
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  white-space: nowrap;
}
</style>
