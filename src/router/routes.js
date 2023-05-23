import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

// https://v3.router.vuejs.org/kr/guide/advanced/navigation-guards.html
const onlyAuthUser = async (to, from, next) => {

  const checkUserInfo = store.getters["checkUserInfo"];
  const checkToken = store.getters["memberStore/checkToken"];
  let token = sessionStorage.getItem("access-token");
  console.log("로그인 처리 전", checkUserInfo, token);

  if (checkUserInfo != null && token) {
    console.log("토큰 유효성 체크하러 가자!!!!");
    await store.dispatch("memberStore/getUserInfo", token);
  }
  if (!checkToken || checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
  } else {
    console.log("로그인 했다!!!!!!!!!!!!!.");
    next();
  }
};

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/TestPageSSH.vue') }
    ]
  },

  {
    path: '/board',
    component: () => import('layouts/MainLayout.vue'),
    redirect: "/board/list",
    children: [
        { name:"boardlist",path: 'list', component: () => import('../components/board/BoardList') }
      , { name: "boardview", path: 'view/:articleno', component: () => import('../components/board/BoardView') }
      , { name: "boardwrite", path: 'write', beforeEnter: onlyAuthUser, component: () => import('../components/board/BoardWrite') }
      , { name: "boardmodify", path: 'modify/:articleno', component: () => import('../components/board/BoardModify') }
      , { name: "boarddelete", path: 'delete/:articleno', component: () => import('../components/board/BoardDelete') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
]

export default routes
