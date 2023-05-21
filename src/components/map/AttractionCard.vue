<template>
  <div
    class="row items-center"
    style="
    width: 100%
      height: 200px;
      border-style: solid;
      border-width: 1px;
      border-color: rgb(228, 228, 228);
    "
  >
    <div class="col-4">
      <a href="#"
        ><q-img
          class="q-ma-sm"
          :src="imageUrl"
          :ratio="1"
          style="border-radius: 5px"
        ></q-img
      ></a>
    </div>
    <div class="col-7 q-ml-md">
      <div class="row items-center">
        <a href="#" class="subtitle1"
          ><div class="text-subtitle1 text-bold">{{ title }}</div></a
        >
        <div class="subtitle2 text-subtitle2 q-ml-xs">{{ category }}</div>
      </div>
      <div class="row">
        <div class="text-subtitle2">내 위치로부터 {{ distance }}km</div>
      </div>
      <div class="row">
        <q-btn flat round>
          <q-icon name="o_bookmark_add"></q-icon>
        </q-btn>
      </div>
    </div>
    <q-separator size="10px" />
  </div>
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
      default: 'https://picsum.photos/500/300?t=' + Math.random()
    },
    title: {
      type: String,
      default: 'default title'
    },
    category: {
      type: String,
      default: 'default type'
    },
    distance: {
      type: Number,
      default: 0.1
    }
  }
}
</script>

<style>
.subtitle1 {
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 65%;
  white-space: nowrap;
}
</style>
