<template id="hello">
    <upper-intro></upper-intro>
    <main-hot-place></main-hot-place>
    <main-tour-cource></main-tour-cource>
</template>
<script>
import { defineComponent } from 'vue'
import UpperIntro from "src/components/UpperIntro/UpperIntro.vue"
import MainHotPlace from "src/layouts/main/MainHotPlace.vue"
import MainTourCource from "src/layouts/main/MainTourCourse.vue"
export default defineComponent({
  components: { UpperIntro, MainHotPlace, MainTourCource},
    
})
</script>
