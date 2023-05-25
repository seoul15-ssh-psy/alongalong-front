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
    url: '/map/bookmark/isbooked',
    params: {
      contentid: contentid,
      userid: userid,
    }
  })
    .then(success)
    .catch(fail)
}

async function saveIntoBookMark(attractionLocationInfo, success, fail) {

  return await springapi({
    method: 'POST',
    url: '/map/bookmark',
    params: {
      userid: attractionLocationInfo.userid,
      contentid: attractionLocationInfo.contentid,
      firstimage: attractionLocationInfo.firstimage,
      address: attractionLocationInfo.address,
      title : attractionLocationInfo.title,
    }
  })
    .then(success)
    .catch(fail)
}

async function deleteFromBookMark(attractionLocationInfo, success, fail) {

  return await springapi({
    method: 'DELETE',
    url: '/map/bookmark',
    params: {
      userid: attractionLocationInfo.userid,
      contentid: attractionLocationInfo.contentid,
    }
  })
    .then(success)
    .catch(fail)
}

function getBookMarks(userid, success, fail) {
  return springapi({
    method: 'GET',
    url: '/map/bookmark',
    params: {
      userid: userid,
    }
  })
    .then(success)
    .catch(fail)
}

function getPlans(userid, success, fail) {
  return springapi({
    method: 'GET',
    url: '/map/plan',
    params: {
      userid: userid,
    }
  })
    .then(success)
    .catch(fail)
}


function getPlanByDate(userid,plandate, success, fail) {
  return springapi({
    method: 'GET',
    url: '/map/plan/bydate',
    params: {
      userid: userid,
      plandate: plandate
    }
  })
    .then(success)
    .catch(fail)
}



export { location2Region, closestSubwayStation, getIfBookMarked, saveIntoBookMark, deleteFromBookMark, getBookMarks, getPlans, getPlanByDate}
