const minute = 60000;
const hour = 3600000;
const day = 86400000;
const week = 604800000;
const month = 2629800000;
const year = 31557600000;

function convertTime(regtime) {
    let time = new Date() - new Date(regtime)
    //59분전
    if (time < minute-1) {
      return '최근'
    } else if (time < hour-1) {
      return Math.floor(time / minute) + ' 분 전'
    }
    //23시간 전
    else if (time < day-1) {
      return Math.floor(time / hour) + '시간 전'
    }
    //6일 전
    else if (time < week-1) {
      return Math.floor(time / day) + '일 전'
    }
    //? 주 전
    else if (time < month-1) {
      return Math.floor(time / week) + '주 전'
    }
    //1년 전
    else if (time < year-1) {
      return Math.floor(time / month) + '개월 전'
    } else {
      return Math.floor(time / year) + '년 전'
    }
}

export { convertTime };