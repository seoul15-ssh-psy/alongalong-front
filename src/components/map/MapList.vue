<template>
  <div class="items-stretch" style="width: 100%">
    <q-scroll-area
      :style="{ height: windowHeight - 360 + 'px' }"
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
  },
  data() {
    return {
      windowHeight: window.innerHeight
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize(event) {
      this.windowHeight = window.innerHeight
    }
  }
}
</script>
