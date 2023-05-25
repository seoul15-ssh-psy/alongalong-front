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
    <div class="q-my-md" style="height: 15%">
      <!-- 관광지 타입, 관광지 명 -->
      <div class="q-mx-md">
        <div class="text-subtitle1 text-grey">
          {{
            this.contentType[attraction.contenttypeid] +
            '/' +
            this.modalContentsCategory
          }}
        </div>
        <div class="flex">
          <div
            class="ellipsis-component text-h5 text-bold text-black"
            style="text-decoration: underline"
          >
            {{ this.attraction.title }}
          </div>
          <q-checkbox
            v-model="isBookMarked"
            checked-icon="bookmark"
            unchecked-icon="bookmark_border"
            color="primary"
            keep-color
            size="40px"
            indeterminate-icon="help"
            @click="switchBookMark"
            v-if="isLogin"
          />
        </div>
      </div>
      <!-- 관광지 주소 정보 -->
      <div class="row q-ma-md">
        <div
          class="ellipsis-component text-subtitle1 text-bold text-black items-center"
        >
          <q-icon
            class="q-mr-xs"
            name="location_on"
            color="grey-7"
            size="17px"
          ></q-icon>
          {{ this.attraction.addr1 }}
        </div>
        <div class="row text-subtitle2 text-black q-mb-sm items-center">
          <q-icon
            class="q-mr-sm"
            name="subway"
            color="grey-7"
            size="17px"
          ></q-icon>
          {{
            this.subwayStation.place_name +
            '에서 ' +
            Math.round((this.subwayStation.distance / 1000) * 100) / 100 +
            'km'
          }}
        </div>
      </div>
    </div>
    <div class="full-width q-mt-lg q-mb-md">
      <q-separator color="grey-4" />
    </div>
    <div style="height: 45%">
      <q-scroll-area style="height: 95%">
        <!-- 관광지 상세 정보 -->
        <div class="q-mx-md">
          <template v-for="(item, index) in this.detailContents" :key="index">
            <div class="full-width">
              <div class="text-subtitle1 text-bold" v-html="item[0]"></div>
              <q-separator color="grey-4" />
            </div>
            <div class="full-width q-mt-sm q-mb-lg">
              <div v-for="(data, index) in item[1]" :key="index">
                <div
                  class="text-subtitle2"
                  v-html="data ? data : this.emptyData"
                ></div>
              </div>
            </div>
          </template>
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import { contentTypeId } from '../../../public/common/global.js'

const locationStore = 'locationStore'
const memberStore = 'memberStore'

export default {
  setup() {
    return {
      val: ref(false)
    }
  },
  props: {
    attraction: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      contentType: contentTypeId,
      detailContents: [],
      emptyData: '<span class="text-grey-6">데이터가 존재하지 않습니다.</span>'
    }
  },
  computed: {
    ...mapState(locationStore, [
      'subwayStation',
      'modalContentsDetail',
      'modalContentsCategory',
      'isBookMarked'
    ]),
    ...mapState(memberStore, ['isLogin', 'userInfo']),
    val() {
      return this.isBookMarked
    }
  },
  watch: {
    modalContentsDetail(attractionDetail) {
      if (attractionDetail.contenttypeid == 12) {
        this.detailContents = [
          ['운영시간', [attractionDetail.usetime]],
          ['휴무일', [attractionDetail.restdate]],
          ['문의', [attractionDetail.infocenter]],
          ['주차시설', [attractionDetail.parking]],
          [
            '정보',
            [
              '유모차제공 : ' +
                this.makeNotEmptyData(attractionDetail.chkbabycarriage),
              '애완동물동반가능 : ' +
                this.makeNotEmptyData(attractionDetail.chkpet)
            ]
          ]
        ]
      } else if (attractionDetail.contenttypeid == 14) {
        this.detailContents = [
          ['운영시간', [attractionDetail.usetimeculture]],
          ['휴무일', [attractionDetail.restdateculture]],
          ['입장료/이용요금', [attractionDetail.usefee]],
          ['할인정보', [attractionDetail.discountinfo]],
          ['문의', [attractionDetail.infocenterculture]],
          [
            '주차',
            [attractionDetail.parkingculture + attractionDetail.parkingfee]
          ],
          [
            '정보',
            [
              '유모차제공 : ' +
                this.makeNotEmptyData(attractionDetail.chkbabycarriageculture),
              '애완동물동반가능 : ' +
                this.makeNotEmptyData(attractionDetail.chkpetculture)
            ]
          ]
        ]
      } else if (attractionDetail.contenttypeid == 28) {
        this.detailContents = [
          ['운영시간', [attractionDetail.usetimeleports]],
          ['휴무일', [attractionDetail.restdateleports]],
          ['입장료/이용요금', [attractionDetail.usefeeleports]],
          ['예약사이트', [attractionDetail.reservation]],
          ['문의', [attractionDetail.infocenterleports]],
          [
            '주차',
            [
              attractionDetail.parkingleports +
                attractionDetail.parkingfeeleports
            ]
          ],
          [
            '정보',
            [
              '유모차제공 :' +
                this.makeNotEmptyData(attractionDetail.chkbabycarriageleports),
              '애완동물동반가능 :' +
                this.makeNotEmptyData(attractionDetail.chkpetleports)
            ]
          ]
        ]
      } else if (attractionDetail.contenttypeid == 32) {
        this.detailContents = [
          ['체크인', [attractionDetail.checkintime]],
          ['체크아웃', [attractionDetail.checkouttime]],
          ['편의시설', [attractionDetail.subfacility]],
          ['식당', [attractionDetail.foodplace]],
          ['예약사이트', [attractionDetail.reservationurl]],
          ['예약문의', [attractionDetail.reservationlodging]],
          [
            '정보',
            [
              '취사: ' + attractionDetail.chkcooking,
              '주차: ' + attractionDetail.infocenterlodging
            ]
          ]
        ]
      } else if (attractionDetail.contenttypeid == 39) {
        this.detailContents = [
          ['운영시간', [attractionDetail.opentimefood]],
          ['휴무일', [attractionDetail.restdatefood]],
          ['문의', [attractionDetail.infocenterfood]],
          [
            '정보',
            [
              '주차 : ' + this.makeNotEmptyData(attractionDetail.parkingfood),
              '포장 : ' + this.makeNotEmptyData(attractionDetail.packing),
              '예약 : ' +
                this.makeNotEmptyData(attractionDetail.reservationfood)
            ]
          ],
          ['메뉴', [attractionDetail.treatmenu]]
        ]
      }
    },
    async val(newVal) {
      console.log('hello' + this.isBookMarked)
      if (newVal) {
        await this.callGetIfBookMarked({
          contentid: this.attraction.contentid,
          userid: this.userInfo.userid
        })
      } else {
        await this.callGetIfBookMarked({
          contentid: this.attraction.contentid,
          userid: this.userInfo.userid
        })
      }
      this.changeBookMarked(this.attraction)
    }
  },
  methods: {
    ...mapMutations(locationStore, ['SET_IS_DETAIL_MODAL_UPDATED']),
    ...mapActions(locationStore, [
      'callClosestSubwayStation',
      'callSaveIntoBookMark',
      'callDeleteFromBookMark',
      'callGetIfBookMarked'
    ]),
    makeNotEmptyData(data) {
      return data ? data : this.emptyData
    },
    async switchBookMark() {
      console.log(this.attraction.contentid)
      console.log(this.userInfo.userid)
      if (this.isBookMarked) {
        await this.callDeleteFromBookMark({
          contentid: this.attraction.contentid,
          userid: this.userInfo.userid
        })
      } else {
        await this.callSaveIntoBookMark({
          contentid: this.attraction.contentid,
          firstimage: this.attraction.firstimage,
          address: this.attraction.addr1,
          title: this.attraction.title,
          userid: this.userInfo.userid
        })
      }
    }
  }
}
</script>

<style>
.ellipsis-component {
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
  white-space: nowrap;
}
</style>
