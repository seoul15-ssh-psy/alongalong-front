import {
  getLocationBasedList,
  getAttractionCategory,
  getAttractionDetail
} from 'src/api/location'
import { location2Region, closestSubwayStation, getIfBookMarked, saveIntoBookMark, deleteFromBookMark } from 'src/api/map'

const locationStore = {
  namespaced: true,
  state: {
    currentLocation: {},
    currentRegion: {},
    attractionInfoList: [],
    isDetailModalVisible: false,
    isDetailModalUpdated: false,
    modalContents: {},
    modalContentsDetail: {},
    modalContentsCategory: {},
    isBookMarked:false,
    subwayStation: { place_name: '신림역 2호선', distance: 1000 }
  },
  getters: {
    getCurrentLocation: state => state.currentLocation,
    getCurrentRegion: state => state.currentRegion,
    getAttractionInfoList: state => state.attractionInfoList,
    getIsDetailModalVisible: state => state.isDetailModalVisible,
    getIsDetailModalVisible: state => state.isDetailModalUpdated,
    getModalContents: state => state.modalContents,
    getModalContentsDetail: state => state.modalContentsDetail,
    getSubwayStation: state => state.subwayStation,
    getIsBookMarked: state => state.isBookMarked,
  },
  mutations: {
    SET_CURRENT_LOCATION: (state, location) => {
      state.currentLocation = location
    },
    SET_CURRENT_REGION: (state, region) => {
      state.currentRegion = region
    },
    SET_ATTRACTION_INFO_LIST: (state, list) => {
      console.log('list modified')
      state.attractionInfoList = []
      state.attractionInfoList.push(...list)
    },
    SET_IS_DETAIL_MODAL_VISIBLE: (state, isVisible) => {
      state.isDetailModalVisible = isVisible
    },
    SET_IS_DETAIL_MODAL_UPDATED: (state, status) => {
      state.isDetailModalUpdated = status
    },
    SET_MODAL_CONTENTS: (state, attraction) => {
      state.modalContents = attraction
    },
    SET_MODAL_CONTENTS_DETAIL: (state, attractionDetail) => {
      state.modalContentsDetail = attractionDetail
    },
    SET_MODAL_CONTENTS_CATEGORY: (state, attractionCategory) => {
      state.modalContentsCategory = attractionCategory
    },
    SET_SUBWAY_STATION: (state, subwayStation) => {
      state.subwayStation = subwayStation
    },
    IS_BOOK_MARKED: (state, isBookMarked) => {
      state.isBookMarked = isBookMarked
    }
  },
  actions: {
    async callCurrentLocation({ commit }) {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          console.warn('위치 정보를 찾을 수 없습니다.')
        } else {
          navigator.geolocation.getCurrentPosition(
            result => {
              resolve(result)
              commit('SET_CURRENT_LOCATION', {
                longitude: result.coords.longitude,
                latitude: result.coords.latitude
              })
            },
            error => {
              reject(error)
              console.warn('위치 정보를 찾을 수 없습니다. ' + error)
            }
          )
        }
      })
    },
    async callLocation2Region({ commit }, locationInfo) {
      await location2Region(
        locationInfo,
        result => {
          commit('SET_CURRENT_REGION', result.data.documents[0])
        },
        error => {
          console.warn(error)
        }
      )
    },
    async callLocationBasedList({ commit, state }, locationInfo) {
      await getLocationBasedList(
        locationInfo,
        result => {
          const list = result.data.response.body.items.item
          const sortedByDistance = list.sort((a, b) => {
            a.distance =
              Math.round(
                calculateDistance(
                  { longitude: a.mapx, latitude: a.mapy },
                  state.currentLocation
                ) * 10
              ) / 10
            b.distance =
              Math.round(
                calculateDistance(
                  { longitude: b.mapx, latitude: b.mapy },
                  state.currentLocation
                ) * 10
              ) / 10
            return a.distance - b.distance
          })
          commit('SET_ATTRACTION_INFO_LIST', sortedByDistance)
        },
        error => {
          console.warn(error)
        }
      )
    },
    async callAttractionDetail({ commit, state }, attraction) {
      //console.log(attraction)
      await getAttractionDetail(
        attraction,
        result => {
          const data = result.data.response.body.items.item[0]
          commit('SET_MODAL_CONTENTS_DETAIL', data)
        },
        error => {
          console.warn(error)
        }
      )
    },
    async callAttractionCategory({ commit }, category) {
      //console.log(category)
      await getAttractionCategory(
        category,
        result => {
          const data = result.data.response.body.items.item[0].name
          commit('SET_MODAL_CONTENTS_CATEGORY', data)
        },
        error => {
          console.warn(error)
        }
      )
    },
    async callClosestSubwayStation({ commit }, attractionLocationInfo) {
      await closestSubwayStation(
        attractionLocationInfo,
        response => {
          const data = response.data.documents[0]
          commit('SET_SUBWAY_STATION', data)
        },
        error => {
          console.warn(error)
        }
      )
    },
    async callGetIfBookMarked({ commit }, attraction) {
      await getIfBookMarked(
        attraction.contentid,
        attraction.userid,
        response => {
          console.log(response.data);
          if (response.datae = "success") {
            commit('IS_BOOK_MARKED', true)
          } else if(response.datae = "fail"){ 
            commit('IS_BOOK_MARKED', false)
          }
        },
        error => {
          console.warn(error)
        }
      )
    },
    async callSaveIntoBookMark({ commit }, attractionLocationInfo) {
      console.log(attractionLocationInfo);
      await saveIntoBookMark(
        attractionLocationInfo,
        response => {
          if (response.datae = "success") {
            commit('IS_BOOK_MARKED', true)
          } else if(response.datae = "fail"){ 
            commit('IS_BOOK_MARKED', false)
          }
        },
        error => {
          console.warn(error)
        }
      )
    },
    async callDeleteFromBookMark({ commit }, attractionLocationInfo) {
      await deleteFromBookMark(
        attractionLocationInfo,
        response => {
          if (response.datae = "success") {
            commit('IS_BOOK_MARKED', false)
          } else if(response.datae = "fail"){ 
            commit('IS_BOOK_MARKED', true)
          }
        },
        error => {
          console.warn(error)
        }
      )
    },
  }
}

function calculateDistance(origin, target) {
  const R = 6371 // 지구 반지름 (단위: km)
  const dLat = deg2rad(origin.latitude - target.latitude)
  const dLon = deg2rad(origin.longitude - target.longitude)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(target.latitude)) *
      Math.cos(deg2rad(origin.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c // 두 지점 간의 거리 (단위: km)
  return distance
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

export default locationStore
