<template>
  <div class="q-mx-xs" >
      <!--큰 메뉴-->
      <div class="gt-xs full-width row justify-between items-center fixed-top q-pl-lg" id="headNavBigMenu" :style="[{zIndex:'5'},{backgroundColor:headerNavColor},{boxShadow:headerNavShadow},{paddingLeft:headerNavLogoPad+'px'}]">
          
        <q-img  id="logoImg" src="../../../public/icons/mainIcon1.png" @click="routerPush('main')" class="clickable"></q-img>
          <div class="row ">
            <div class="col-12 q-ml-md">
              <a class="headerNavMenu clickable" @click="routerPush('map')" :style="[{fontSize:headerNavMenuSize+'px'},{color:linkSelected[1]}]">지역별 여행지</a>
              <a class="headerNavMenu clickable" @click="routerPush('hotPlace')" :style="[{paddingLeft:headerNavMenuPad+'px'},{fontSize:headerNavMenuSize+'px'},{color:linkSelected[2]}]">핫플 게시판</a>
              <a class="headerNavMenu clickable" @click="routerPush('myPlan')" :style="[{paddingLeft:headerNavMenuPad+'px'},{fontSize:headerNavMenuSize+'px'},{color:linkSelected[3]}]">나의 여행계획</a>
              <a class="headerNavMenu clickable" @click="routerPush('boardList')" :style="[{paddingLeft:headerNavMenuPad+'px'},{fontSize:headerNavMenuSize+'px'},{color:linkSelected[4]}]">자유게시판</a>
            </div>
          </div>
          <!---->
          <!-- 로그인 & 마이페이지 버튼2 -->
          <q-avatar class = "q-mr-md" size="35px">
            <q-btn icon="person_outline" size="18px" padding="3px" > </q-btn>
            <q-menu touch-position>
              <q-list dense style="min-width: 100px">
                  <q-item clickable v-close-popup v-if="!getIsLogin ">
                      <q-item-section @click="showLogInModal">로그인</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup v-if="!getIsLogin ">
                      <q-item-section @click="showRegisterModal">회원가입</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup v-if="getIsLogin ">
                  <q-item-section @click="onClickLogout" >로그아웃</q-item-section>
                </q-item>
                <q-item clickable v-close-popup v-if="getIsLogin ">
                  <q-item-section @click="showLogInModal" >마이페이지</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
        </q-avatar>
      </div>

      <!--작은 메뉴-->
      <div class="lt-sm full-width q-pb-sm  fixed-top" :style="[{zIndex:'5'},{backgroundColor:'white'}]">
        <div class="row justify-center items-center"> 
          <img id="logoImg2" src="../../../public/icons/mainIcon2.png" @click="routerPush('main')" class="clickable">
          <q-avatar class = "absolute-right q-mt-xs q-mr-sm" size="40px">
            <!-- 로그인 & 마이페이지 버튼 -->
            <q-btn icon="person_outline" size="17px"> </q-btn>
              <q-menu touch-position>
              <q-list dense style="min-width: 100px">
                <q-item clickable v-close-popup v-if="!getIsLogin ">
                  <q-item-section @click="showLogInModal" >로그인</q-item-section>
                </q-item>
                <q-item clickable v-close-popup v-if="!getIsLogin ">
                  <q-item-section @click="showRegisterModal">회원가입</q-item-section>
                </q-item>
                <q-item clickable v-close-popup v-if="getIsLogin ">
                  <q-item-section @click="onClickLogout" >로그아웃</q-item-section>
                </q-item>
                <q-item clickable v-close-popup v-if="getIsLogin ">
                  <q-item-section @click="showLogInModal" >마이페이지</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-avatar>
        </div>
        <div class="row full-width justify-around">
              <a class="headerNavMenu2 clickable" @click="routerPush('map')" :style="{color:linkSelected[1]}">지역별 여행지</a>
              <a class="headerNavMenu2 clickable" @click="routerPush('hotPlace')" :style="{color:linkSelected[2]}">핫플 게시판</a>
              <a class="headerNavMenu2 clickable" @click="routerPush('myPlan')" :style="{color:linkSelected[3]}">나의 여행계획</a>
              <a class="headerNavMenu2 clickable" @click="routerPush('boardList')" :style="{color:linkSelected[4]}">자유게시판</a>
            </div>
      </div>
      <log-in id="logInModal" @close="hideLogInModal" v-if="isShowLogInModal"></log-in>
      <register-D id="logInModal" @close="hideRegisterModal" v-if="isShowRegisterModal"></register-D>

  </div>
</template>

<script>

import { mapState, mapGetters, mapActions } from "vuex";
import logIn from "src/components/member/logIn.vue";
import registerD from "src/components/member/register.vue";


const memberStore = "memberStore";
var recentlySelected = 0;

export default {
  components:{ 
    logIn, registerD
  }
  ,
  data() {
    return {
      headerNavMenuSize : 18,
      headerNavMenuPad: 0,
      headerNavLogoPad: 0,
      headerNavLogoSize : 10,
      headerNavColor: "",
      headerNavShadow: "",//홈, 지도, 핫플, 여행계획, 자유게시판
      linkSelected: ["gray", "gray", "gray", "gray", "gray"],
      isShowLogInModal: false,
      isShowRegisterModal: false,
    }
  },
  mounted() { 
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.resize);
  },
  
  created(){ 
    this.handleScroll();
    this.resize();
    console.log(this.getIsLogin);  
  },
  computed: { 
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapGetters(memberStore, ["checkUserInfo","getIsLogin"]),
  },
  methods: { 
    handleScroll() { 
      if (window.scrollY == 0) {
        this.headerNavColor = "";
        this.headerNavShadow = "";
      } else { 
        this.headerNavColor = "white";
        this.headerNavShadow = "0 1px 3px rgba(0,0,0,0.30)";
      }
    },

    resize() { 
      const screenWidth = window.innerWidth;
      if (screenWidth>700) { 
        this.headerNavMenuSize = 18; 
        this.headerNavLogoPad = 50;
      } else {
        this.headerNavMenuSize = 15;
        this.headerNavLogoPad = 20;

      }
      this.headerNavMenuPad = screenWidth / 30;
    },

    showLogInModal() { 
    this.isShowLogInModal = true; 
    },
    hideLogInModal() { 
      this.isShowLogInModal = false; 
      console.log("creat" + this.getIsLogin);
    },

    showRegisterModal() { 
    this.isShowRegisterModal = true; 
    },
    hideRegisterModal() { 
      this.isShowRegisterModal = false; 
    },

    ...mapActions(memberStore, ["userLogout"]),
    // ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickLogout() {
      // this.SET_IS_LOGIN(false);
      // this.SET_USER_INFO(null);
      // sessionStorage.removeItem("access-token");
      // if (this.$route.path != "/") this.$router.push({ name: "main" });
      console.log(this.userInfo.userid);
      //vuex actions에서 userLogout 실행(Backend에 저장 된 리프레시 토큰 없애기
      //+ satate에 isLogin, userInfo 정보 변경)
      // this.$store.dispatch("userLogout", this.userInfo.userid);
      this.userLogout(this.userInfo.userid);
      sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
      sessionStorage.removeItem("refresh-token"); //저장된 토큰 없애기
      if (this.$route.path != "/") this.$router.push({ name: "main" });
      console.log("돼쓰까요"+this.getIsLogin);  
    },

    routerPush(goTo) { 
      console.log(goTo);
      if (goTo == "main") {
        this.linkSelected[recentlySelected] = "gray";
        this.$router.push('/')
      } else if (goTo == "map") {
        this.linkSelected[recentlySelected] = "gray";
        recentlySelected = 1;
        this.linkSelected[recentlySelected] = "black";

      } else if (goTo == "hotPlace") {
        this.linkSelected[recentlySelected] = "gray";
        recentlySelected = 2;
        this.linkSelected[recentlySelected] = "black";

      } else if (goTo == "myPlan") {
        this.linkSelected[recentlySelected] = "gray";
        recentlySelected = 3;
        this.linkSelected[recentlySelected] = "black";

      } else if (goTo == "boardList") {
        this.linkSelected[recentlySelected] = "gray";
        recentlySelected = 4;
        this.linkSelected[recentlySelected] = "black";
        this.$router.push('/board')
      } 
    },

  }

}
</script>

<style scoped>
  
  #logoImg{
    width: 80px;
    height: auto;
  }

  #logoImg2 {
    width: auto;
    height: 46px;
  }
  
  .headerNavMenu{
    padding-top: 20px;
    padding-bottom:20px;
  }

  .headerNavMenu:hover,.headerNavMenu2:hover{
    color: black;
  }

  .headerNavMenu2{
    padding-top: 5px;
    padding-bottom:5px;
  }


  #headNavBigMenu{
    padding-top: 10px;
    padding-bottom: 10px;
    height: 85px;
  }

  *:focus{
    outline:1000cap;  }

  #logInModal{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* 반투명한 배경색 */
    z-index: 9999; /* 모달을 최상위로 배치 */
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
