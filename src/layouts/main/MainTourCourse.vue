<template>
  <div class="container">
    <!-- header -->
    <main-header>
      <template v-slot:header-icon>
        <q-icon name="o_golf_course" size="50px" color="black"></q-icon>
      </template>
      <template v-slot:header-title>추천 여행코스</template>
      <template v-slot:header-text>새로운 발견을 하게 될 거에요.</template>
    </main-header>
    <q-separator class="q-mt-md"></q-separator>
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
import MainHeader from 'components/main/MainHeader.vue'
import CardContents from 'components/main/CardContents.vue'

export default {
  components: {
    MainHeader,
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
            'http://tong.visitkorea.or.kr/cms/resource/81/1075281_image2_1.jpg',
          title: '경복궁 북쪽마을 북촌 즐기기'
        },
        {
          imageUrl:
            'http://tong.visitkorea.or.kr/cms/resource/72/1782972_image2_1.jpg',
          title: '낮이 좋아? 밤이 좋아? 서울의 주경, 야경 여행코스'
        },
        {
          imageUrl:
            'http://tong.visitkorea.or.kr/cms/resource/88/1568388_image2_1.jpg',
          title: '동대문 주변에서 만나는 역사의 현장'
        },
        {
          imageUrl:
            'http://tong.visitkorea.or.kr/cms/resource/11/1945811_image2_1.jpg',
          title: '사라진 성곽길을 따라 걷기'
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
