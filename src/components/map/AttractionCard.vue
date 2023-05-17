<template>
  <div
    class="row q-mt-md items-center"
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
        src="https://picsum.photos/500/300"
        :ratio="1"
        style="border-radius: 5px"
      ></q-img>
    </div>
    <div class="col-7 q-ml-lg">
      <div class="row items-center">
        <div class="col-4 text-subtitle1 text-bold">서울도서관</div>
        <div class="col-4 text-subtitle2 q-ml-xs">주변 여행지</div>
      </div>
      <div class="row">
        <div class="text-subtitle2">내 위치로부터 0.1km</div>
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
export default {}
</script>

<style></style>
