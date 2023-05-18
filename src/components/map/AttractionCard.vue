<template>
  <div
    class="row items-center"
    style="
      height: 200px;
      border-style: solid;
      border-width: 1px;
      border-color: rgb(228, 228, 228);
    "
  >
    <div class="col-4">
      <q-img
        class="q-mx-sm"
        :src="imageUrl"
        :ratio="1"
        style="border-radius: 5px"
      ></q-img>
    </div>
    <div class="col-7 q-ml-lg">
      <div class="row items-center">
        <div class="col text-subtitle1 text-bold">{{ title }}</div>
        <div class="col text-subtitle2 q-ml-xs">{{ category }}</div>
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

<style></style>
