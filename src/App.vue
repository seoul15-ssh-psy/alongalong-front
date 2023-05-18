<template>
  <header-nav></header-nav>
  <div id="router">
    <router-view />
  </div>
  <footer-div></footer-div>
</template>

<script>
import { defineComponent } from 'vue'
import FooterDiv from "src/components/common/Footer.vue"
import HeaderNav from "src/components/common/HeaderNav.vue"
import { useQuasar } from 'quasar'
export default defineComponent({
  name: 'App',
  components: { HeaderNav, FooterDiv},
  
})
</script>
<style>
 .clickable{
    cursor: pointer;
  }
  footer-div{
    position:relative;
    transform:translateT(-100%);
  }
  #router{
    min-height: 100%;
    position : relative;
  }

</style>