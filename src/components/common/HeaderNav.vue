<template>
  <div class="q-mx-xs" >
      <!--큰 메뉴-->
      <div class="gt-xs full-width row justify-between items-center fixed-top background q-pl-lg" id="headNavBigMenu" :style="[{backgroundColor:headerNavColor},{boxShadow:headerNavShadow},{paddingLeft:headerNavLogoPad+'px'}]">
          
        <q-img  id="logoImg" src="../../../public/icons/mainIcon1.png" @click="$router.push('/')" class="clickable"></q-img>
          <div class="row ">
            <div class="col-12 q-ml-md">
              <a class="headerNavMenu clickable" :style="[{fontSize:headerNavMenuSize+'px'}]">지역별 여행지</a>
              <a class="headerNavMenu clickable" :style="[{paddingLeft:headerNavMenuPad+'px'},{fontSize:headerNavMenuSize+'px'}]">핫플 게시판</a>
              <a class="headerNavMenu clickable" :style="[{paddingLeft:headerNavMenuPad+'px'},{fontSize:headerNavMenuSize+'px'}]">나의 여행계획</a>
              <a class="headerNavMenu clickable" @click="$router.push('/board')" :style="[{paddingLeft:headerNavMenuPad+'px'},{fontSize:headerNavMenuSize+'px'}]">자유게시판</a>
            </div>
          </div>
          <!---->
          <!-- 로그인 & 마이페이지 버튼2 -->
          <q-avatar class = "q-mr-md" size="35px">
            <q-btn icon="person_outline" size="18px" padding="3px" > </q-btn>
            <q-menu touch-position>
              <q-list dense style="min-width: 100px">
                  <q-item clickable v-close-popup>
                      <q-item-section>로그인</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                      <q-item-section>회원가입</q-item-section>
                  </q-item>
              </q-list>
            </q-menu>
        </q-avatar>
      </div>

      <!--작은 메뉴-->
      <div class="lt-sm full-width q-pb-sm">
        <div class="row justify-center items-center"> 
          <img id="logoImg2 " class="" src="../../../public/icons/mainIcon2.png" >
          <q-avatar class = "absolute-right q-mt-sm" size="60px">
            <!-- 로그인 & 마이페이지 버튼 -->
            <q-btn icon="person_outline" size="25px"> </q-btn>
              <q-menu touch-position>
              <q-list dense style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section>로그인</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>회원가입</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-avatar>
        </div>
        <div class="row full-width justify-around">
              <a class="headerNavMenu2" >지역별 여행지</a>
              <a class="headerNavMenu2">핫플 게시판</a>
              <a class="headerNavMenu2">나의 여행계획</a>
              <a class="headerNavMenu2">자유게시판</a>
            </div>
      </div>
  </div>
</template>

<script>

import { mapState, mapGetters, mapActions } from "vuex";
const memberStore = "memberStore";

export default {
  data() {
    return {
      headerNavMenuSize : 18,
      headerNavMenuPad: 0,
      headerNavLogoPad: 0,
      headerNavLogoSize : 10,
      headerNavColor: "",
      headerNavShadow:"",
    }
  },
  mounted() { 
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.resize);
  },
  
  created(){ 
    this.handleScroll();
    this.resize();
  },
  computed: { 
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapGetters(["checkUserInfo"]),
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
  width: 140px;
  height: 50px;
}
  
  .headerNavMenu{
    color: gray;
    padding-top: 20px;
    padding-bottom:20px;
  }

  .headerNavMenu:hover,.headerNavMenu2:hover{
    color: black;
  }

  .headerNavMenu2{
    color: gray;
    padding-top: 5px;
    padding-bottom:5px;
  }


  #headNavBigMenu{
    z-index: 5;
    padding-top: 10px;
    padding-bottom: 10px;
  }


</style>
