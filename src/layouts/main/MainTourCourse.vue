<template>
  <div class="container">
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="teal-5"
      navigation
      navigation-icon="radio_button_unchecked"
      padding
      arrows
      height="100%"
    >
      <q-carousel-slide :name="1" class="column no-wrap q-mt-xl">
        <div
          class="row fit justify-center items-center q-gutter-md q-col-gutter no-wrap"
        >
          <div class="col" v-for="(item, index) in attractions" :key="index">
            <card-contents
              link="/"
              :imageUrl="item.imageUrl"
              :title="item.title"
              :ratio="3 / 4"
            ></card-contents>
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="2" class="column no-wrap q-mt-xl">
        <div
          class="row fit justify-center items-center q-gutter-md q-col-gutter no-wrap"
        >
          <div class="col" v-for="(item, index) in attractions" :key="index">
            <card-contents
              link="/"
              :imageUrl="item.imageUrl"
              :title="item.title"
              :ratio="3 / 4"
            ></card-contents>
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="3" class="column no-wrap q-mt-xl">
        <div
          class="row fit justify-center items-center q-gutter-xs q-col-gutter no-wrap"
        >
          <div class="col" v-for="(item, index) in attractions" :key="index">
            <card-contents
              link="/"
              :imageUrl="item.imageUrl"
              :title="item.title"
              :ratio="3 / 4"
            ></card-contents>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
import { ref } from 'vue'
import CardContents from 'components/main/CardContents.vue'

export default {
  components: {
    CardContents
  },
  setup() {
    return {
      slide: ref(1)
    }
  },
  data() {
    return {
      attractions: [
        {
          imageUrl:
            'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=1e43cf40-a4b0-42de-a5aa-d2c08771f66b',
          title: '경희궁'
        },
        {
          imageUrl:
            'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=c47e282c-6ceb-4cf7-b4ea-1f0dfa4b75d9',
          title: '마복림할머니 막내아들네'
        },
        {
          imageUrl:
            'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=f8e84f56-b94c-4d8e-a528-f5b1864963d9',
          title: '창경궁'
        },
        {
          imageUrl:
            'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=f329dfe0-58e3-4a53-a2b3-f3f4670d6e30',
          title: '종이잡지클럽'
        }
      ]
    }
  }
}
</script>

<style>
.container {
  width: 60%;
  margin: auto;
}
</style>
