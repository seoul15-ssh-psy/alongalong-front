<template>
  <q-card class="my-card" flat bordered>
    <a :href="link" draggable="false">
      <q-img :src="imageUrl" :ratio="16 / 9" draggable="false">
        <q-checkbox
          class="favorite absolute-top-right transparent"
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
      <a :href="link" draggable="false"
        ><div class="text-subtitle1">
          {{ title }}
        </div>
      </a>
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
.my-card {
  width: 25%;
  float: left;
  cursor: pointer;
}
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
