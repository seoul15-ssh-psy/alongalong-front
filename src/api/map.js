import { kakaoMapApiInstance, apiInstance } from './index.js'

const api = kakaoMapApiInstance()
const springapi =  apiInstance();

async function location2Region(locationInfo, success, fail) {
  return await api({
    method: 'GET',
    url: '/local/geo/coord2regioncode.json',
    params: {
      x: locationInfo.longitude,
      y: locationInfo.latitude
    }
  })
    .then(success)
    .catch(fail)
}

async function closestSubwayStation(attractionLocationInfo, success, fail) {
  return await api({
    method: 'GET',
    url: '/local/search/category.json',
    params: {
      category_group_code: 'SW8',
      x: attractionLocationInfo.longitude,
      y: attractionLocationInfo.latitude,
      size: 1,
      sort: 'distance'
    }
  })
    .then(success)
    .catch(fail)
}

async function getIfBookMarked(contentid,userid, success, fail) {

  return await springapi({
    method: 'GET',
    url: '/map/bookmarked',
    params: {
      contentid: contentid,
      userid: userid,
    }
  })
    .then(success)
    .catch(fail)
}


export { location2Region, closestSubwayStation, getIfBookMarked, }
