<template>
  <q-drawer
    v-model="drawer"
    show-if-above
    :mini="!drawer || miniState"
    :width="400"
    :mini-width="50"
    :breakpoint="300"
    bordered
    class="shadow-3"
  >
    <!-- contents -->
    <div class="q-mini-drawer-hide text-h5 text-bold q-mx-lg q-my-xl">
      서울특별시 관악구
    </div>
    <!-- drawer buttons -->
    <div
      class="flex absolute-right justify-end items-center"
      style="height: 95vh"
    >
      <div class="q-mini-drawer-only">
        <q-btn
          dense
          flat
          unelevated
          icon="arrow_forward_ios"
          size="20px"
          @click="miniState = false"
        />
      </div>
      <div class="q-mini-drawer-hide">
        <q-btn
          dense
          flat
          unelevated
          icon="arrow_back_ios"
          size="20px"
          @click="miniState = true"
        />
      </div>
    </div>
  </q-drawer>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const miniState = ref(false)

    return {
      drawer: ref(false),
      miniState,

      drawerClick(e) {
        if (miniState.value) {
          miniState.value = false
          e.stopPropagation()
        }
      }
    }
  }
}
</script>

<style>
.edge {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: grey;
}
</style>
