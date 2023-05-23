<template>
  <div class="full-width" style="height: 100%">
    <!-- 관광지 사진 -->
    <div class="row full-width" style="height: 35%">
      <q-img
        style="border-radius: 5px"
        :src="attraction.firstimage"
        :ratio="4 / 3"
      />
    </div>
    <!-- 관광지 정보 -->
    <div style="height: 15%">
      <!-- 관광지 타입, 관광지 명 -->
      <div class="row q-ma-md">
        <div class="text-subtitle1 text-grey">
          {{
            this.contentType[attraction.contenttypeid] +
            '/' +
            this.modalContentsCategory
          }}
        </div>
        <div
          class="text-h5 text-bold text-black"
          style="text-decoration: underline"
        >
          {{ this.attraction.title }}
        </div>
      </div>
      <!-- 관광지 주소 정보 -->
      <div class="row q-mx-md">
        <div class="row text-subtitle1 text-bold text-grey-8">
          {{ '주소: ' + this.attraction.addr1 }}
        </div>
        <div class="row text-subtitle2 text-grey-8 q-mb-sm">
          {{
            this.subwayStation.place_name +
            '에서 ' +
            Math.round((this.subwayStation.distance / 1000) * 100) / 100 +
            'km'
          }}
        </div>
      </div>
    </div>
    <div class="full-width q-my-sm">
      <q-separator color="grey-4" />
    </div>
    <div style="height: 45%">
      <q-scroll-area style="height: 100%">
        <!-- 관광지 상세 정보 -->
        <div class="q-mx-md">
          <template v-for="(item, index) in this.detailContents" :key="index">
            <div class="full-width q-my-mx">
              <div class="text-subtitle1 text-bold">{{ item[0] }}</div>
              <q-separator color="grey-4" />
            </div>
            <div class="full-width q-my-md">
              <div
                class="text-subtitle2"
                v-for="(data, index) in item[1]"
                :key="index"
              >
                {{ data }}
              </div>
            </div>
          </template>
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { contentTypeId } from '../../../public/common/global.js'

const locationStore = 'locationStore'

export default {
  props: {
    attraction: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      contentType: contentTypeId,
      detailContents: []
    }
  },
  computed: {
    ...mapState(locationStore, [
      'subwayStation',
      'modalContentsDetail',
      'modalContentsCategory'
    ])
  },
  watch: {
    modalContentsDetail(attractionDetail) {
      console.log(attractionDetail)
      if (attractionDetail.contenttypeid == 39) {
        this.detailContents = [
          ['운영시간', [attractionDetail.opentimefood]],
          ['휴무일', [attractionDetail.restdatefood]],
          ['연락처', [attractionDetail.infocenterfood]],
          [
            '정보',
            [
              '주차: ' + attractionDetail.parkingfood,
              '포장: ' + attractionDetail.packing,
              '예약: ' + attractionDetail.reservationfood
            ]
          ],
          ['메뉴', [attractionDetail.treatmenu]]
        ]
      } else if (attractionDetail.contenttypeid == 32) {
        this.detailContents = [
          ['체크인', [attractionDetail.checkintime]],
          ['체크아웃', [attractionDetail.checkouttime]],
          ['편의시설', [attractionDetail.subfacility]],
          ['식당', [attractionDetail.foodplace]],
          [
            '정보',
            [
              '취사: ' + attractionDetail.chkcooking,
              '주차: ' + attractionDetail.infocenterlodging
            ]
          ],
          ['예약사이트', [attractionDetail.reservationurl]],
          ['예약 문의', [attractionDetail.reservationlodging]]
        ]
      }
    }
  },
  methods: {
    ...mapMutations(locationStore, ['SET_IS_DETAIL_MODAL_UPDATED']),
    ...mapActions(locationStore, ['callClosestSubwayStation'])
  }
}
</script>

<style></style>
