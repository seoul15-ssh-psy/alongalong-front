<template>
  <div>
    <q-btn
      :class="bgColor + ' q-mb-sm q-pa-sm'"
      flat
      round
      color="white"
      style="
        border-style: solid;
        border-width: 2px;
        border-color: rgb(231, 231, 231);
      "
    >
      <q-icon :name="iconName" size="35px" />
    </q-btn>
    <div class="text-center">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      required: true
    },
    bgColor: {
      type: String,
      default: 'bg-black-1'
    },
    title: {
      type: String,
      default: 'default title'
    }
  }
}
</script>

<style></style>
