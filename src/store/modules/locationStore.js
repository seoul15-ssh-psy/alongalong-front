import { getLocationBasedList, getAttractionCategory } from 'src/api/location'
import { location2Region } from 'src/api/map'

const locationStore = {
  namespaced: true,
  state: {
    currentLocation: {},
    currentRegion: {},
    attractionInfoList: []
  },
  getters: {
    getCurrentLocation: state => state.currentLocation,
    getCurrentRegion: state => state.currentRegion,
    getAttractionInfoList: state => state.attractionInfoList
  },
  mutations: {
    SET_CURRENT_LOCATION: (state, location) => {
      state.currentLocation = location
    },
    SET_CURRENT_REGION: (state, region) => {
      state.currentRegion = region
    },
    SET_ATTRACTION_INFO_LIST: (state, list) => {
      state.attractionInfoList = []
      state.attractionInfoList.push(...list)
    }
  },
  actions: {
    async callCurrentLocation({ commit }) {
      if (!navigator.geolocation) {
        console.warn('위치 정보를 찾을 수 없습니다.')
      } else {
        navigator.geolocation.getCurrentPosition(
          result => {
            //console.log(result.coords)
            commit('SET_CURRENT_LOCATION', {
              longitude: result.coords.longitude,
              latitude: result.coords.latitude
            })
          },
          error => {
            console.warn('위치 정보를 찾을 수 없습니다. ' + error)
          }
        )
      }
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
    async callLocationBasedList({ commit }, locationInfo) {
      await getLocationBasedList(
        locationInfo,
        result => {
          const list = result.data.response.body.items.item
          commit('SET_ATTRACTION_INFO_LIST', list)
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
          console.log(result)
          return result.data.response.body.items.item[0].name
        },
        error => {
          console.warn(error)
        }
      )
    }
  }
}

export default locationStore
