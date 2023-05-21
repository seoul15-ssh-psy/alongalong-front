import { attractionApiInstance } from './index.js'

const api = attractionApiInstance()
const serviceKey = process.env.ATTRACTION_SERVICE_KEY

const locationBasedList = async (count, isList, locationInfo) => {
  return await api({
    method: 'GET',
    url: `/locationBasedList1?serviceKey=${serviceKey}`,
    params: {
      numOfRows: count,
      pageNo: 1,
      MobileOS: 'ETC',
      MobileApp: 'AlongAlong',
      _type: 'json',
      listYN: isList,
      arrange: 'O',
      mapX: locationInfo.longitude,
      mapY: locationInfo.latitude,
      radius: 2000
    }
  })
}

async function getLocationBasedList(locationInfo, success, fail) {
  const count = (await locationBasedList(1, 'N', locationInfo)).data.response
    .body.items.item[0].totalCnt
  return await locationBasedList(count, 'Y', locationInfo)
    .then(success)
    .catch(fail)
}

export { getLocationBasedList }
