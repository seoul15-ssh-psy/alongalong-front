import { kakaoMapApiInstance } from './index.js'

const api = kakaoMapApiInstance()

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

export { location2Region }
