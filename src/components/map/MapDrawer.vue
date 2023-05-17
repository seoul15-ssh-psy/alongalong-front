<template>
  <q-drawer
    v-model="drawer"
    show-if-above
    :mini="!drawer || miniState"
    :width="450"
    :mini-width="0"
    :breakpoint="300"
    bordered
    class="shadow-3"
  >
    <!-- contents -->
    <div class="q-mini-drawer-hide">
      <div class="text-h5 text-bold q-mx-lg q-my-xl">
        서울특별시 관악구
        <q-separator class="q-mt-xs" color="grey-6" size="2px" />
      </div>
      <div class="row justify-center">
        <div class="flex q-gutter-lg">
          <icon-button
            v-for="(item, index) in iconButtons"
            :iconName="item.iconName"
            :bgColor="item.bgColor"
            :title="item.title"
            :key="index"
          />
        </div>
      </div>
      <q-separator class="q-my-lg" />
      <div class="row"><map-list></map-list></div>
    </div>

    <!-- drawer buttons -->
    <div class="flex absolute-right items-center">
      <div class="q-mini-drawer-only">
        <q-btn
          dense
          flat
          unelevated
          icon="arrow_forward_ios"
          size="20px"
          @click="miniState = false"
          style="right: -100%"
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
          style="right: -100%"
        />
      </div>
    </div>
  </q-drawer>
</template>

<script>
import { ref } from 'vue'
import IconButton from './IconButton.vue'
import AttractionCard from './AttractionCard.vue'
import MapList from './MapList.vue'

export default {
  components: {
    IconButton,
    MapList,
    AttractionCard
  },
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
      },

      iconButtons: [
        {
          iconName: 'o_map',
          bgColor: 'bg-green-3',
          title: '관광지'
        },
        {
          iconName: 'o_restaurant',
          bgColor: 'bg-orange-3',
          title: '음식점'
        },
        {
          iconName: 'o_local_cafe',
          bgColor: 'bg-pink-3',
          title: '카페'
        },
        {
          iconName: 'o_hotel',
          bgColor: 'bg-purple-3',
          title: '숙소'
        }
      ]
    }
  }
}
</script>

<style></style>
