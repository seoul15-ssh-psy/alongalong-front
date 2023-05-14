<template id="hello">
    <header-nav></header-nav>
    <upper-intro></upper-intro>
</template>
<script>
import { defineComponent } from 'vue'
import HeaderNav from "src/components/HeaderNav.vue"
import UpperIntro from "src/components/UpperIntro/UpperIntro.vue"
export default defineComponent({
  components: { HeaderNav, UpperIntro },
    
})
</script>
