import axios from 'axios'

// local vue api axios instance
function apiInstance() {
  const instance = axios.create({
    baseURL: 'http://localhost:9999/vue',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
  return instance
}

function attractionApiInstance(latitude, longitude) {
  const instance = axios.create({
    baseURL: 'https://apis.data.go.kr/B551011/KorService1'
  })
  return instance
}

function kakaoMapApiInstance() {
  const instance = axios.create({
    baseURL: 'https://dapi.kakao.com/v2',
    headers: {
      Authorization: `KakaoAK ${process.env.KAKAO_APP_KEY}`
    }
  })
}

export { apiInstance, attractionApiInstance, kakaoMapApiInstance }
