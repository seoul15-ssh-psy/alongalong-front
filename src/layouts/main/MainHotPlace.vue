<template>
  <div class="container">
    <!-- header -->
    <main-header>
      <template v-slot:header-icon>
        <q-icon name="pin_drop" size="50px" color="teal-8"></q-icon>
      </template>
      <template v-slot:header-title>여행콕콕</template>
      <template v-slot:header-text
        >전국 방방곡곡 여행지를 추천해드려요.</template
      >
    </main-header>
    <!-- 지역 선택 -->
    <q-separator class="q-mt-md q-mb-md"></q-separator>
    <responsive-button-group></responsive-button-group>
    <q-separator class="q-mt-md q-mb-md"></q-separator>
    <!-- 지역별 관광지 사진 -->
    <div class="row q-gutter-lg justify-center">
      <div class="card" v-for="(item, index) in attractions" :key="index">
        <card-contents
          link="/"
          :imageUrl="item.imageUrl"
          :title="item.title"
        ></card-contents>
      </div>
    </div>
    <!-- footer -->
    <div class="row q-my-lg justify-center">
      <q-btn
        outline
        rounded
        icon="add_circle_outline"
        color="teal-5"
        label="더보기"
      />
    </div>
  </div>
</template>

<script>
import MainHeader from 'components/main/MainHeader.vue'
import ResponsiveButtonGroup from 'src/components/main/ResponsiveButtonGroup.vue'
import CardContents from 'components/main/CardContents.vue'

export default {
  components: {
    MainHeader,
    CardContents,
    ResponsiveButtonGroup
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
        },
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
.card {
  width: 22%;
}
@media (max-width: 1300px) {
  .card {
    width: 45%;
  }
}
@media (max-width: 800px) {
  .card {
    width: 90%;
  }
}
</style>
