import { getLocationBasedList, getAttractionCategory } from 'src/api/location'
import { location2Region } from 'src/api/map'

const locationStore = {
  namespaced: true,
  state: {
    currentLocation: {},
    currentRegion: {},
    attractionInfoList: [],
    isDetailModalVisible: false,
    modalContents: {}
  },
  getters: {
    getCurrentLocation: state => state.currentLocation,
    getCurrentRegion: state => state.currentRegion,
    getAttractionInfoList: state => state.attractionInfoList,
    getIsDetailModalVisible: state => state.isDetailModalVisible,
    getModalContents: state => state.modalContents
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
    SET_MODAL_CONTENTS: (state, attraction) => {
      state.modalContents = attraction
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
          console.log('callLocation2Region')
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
          console.log('callLocationBasedList')
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
    async callAttractionCategory({ commit }, category) {
      //console.log(category)
      await getAttractionCategory(
        category,
        result => {
          result = result.data.response.body.items.item[0].name
          return result
        },
        error => {
          console.warn(error)
        }
      )
    }
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
