<template>
  <div class="items-stretch" style="width: 100%">
    <q-scroll-area
      style="height: 70vh; overflow-y: hidden"
      :bar-style="{
        borderRadius: '5px',
        background: 'grey',
        width: '7px'
      }"
      :thumb-style="{
        borderRadius: '5px',
        background: 'grey',
        width: '7px',
        opacity: 1
      }"
    >
      <attraction-card></attraction-card>
      <attraction-card></attraction-card>
      <attraction-card></attraction-card>
      <attraction-card></attraction-card>
      <attraction-card></attraction-card>
      <attraction-card></attraction-card>
      <attraction-card></attraction-card>
      <attraction-card></attraction-card>
    </q-scroll-area>
  </div>
</template>
<script>
import AttractionCard from './AttractionCard.vue'
export default {
  components: {
    AttractionCard
  },
  setup() {
    return {}
  }
}
</script>
