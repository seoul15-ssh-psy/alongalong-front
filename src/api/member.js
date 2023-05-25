import { apiInstance } from './index.js';

const api = apiInstance();

async function login(user, success, fail) {
  await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  api.defaults.headers['access-token'] = sessionStorage.getItem('access-token');
  await api.get(`/user/info/${userid}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  // access-token 재발급을 위한 refresh-token
  api.defaults.headers['refresh-token'] = sessionStorage.getItem('refresh-token'); //axios header에 refresh-token 셋팅
  await api.post(`/user/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
  await api.get(`/user/logout/${userid}`).then(success).catch(fail);
}

async function register(user, success, fail) {
  await api.post(`/user/register`, JSON.stringify(user)).then(success).catch(fail);
}

function getComments(userid, success, fail) {
  return api({
    method: 'GET',
    url: '/user/comment',
    params: {
      userid: userid,
    }
  })
    .then(success)
    .catch(fail)
}

function getArticles(userid, success, fail) {
  return api({
    method: 'GET',
    url: '/user/article',
    params: {
      userid: userid,
    }
  })
    .then(success)
    .catch(fail)
}

export { login, findById, tokenRegeneration, logout, register, getComments, getArticles };
