<template>
  <div class="transparent q-mx-xs" >
      <!--큰 메뉴-->
      <div class="gt-xs full-width row justify-between items-center">
          
        <q-img id="logoImg" src="../../public/icons/mainIcon.png" class="q-ml-lg"></q-img>
          <div class="row ">
            <div class="col-12 q-ml-md">
              <a class="q-mr-md">지역별 여행지</a>
              <a class="q-mx-md">핫플 게시판</a>
              <a class="q-mx-md">나의 여행계획</a>
              <a class="q-ml-md">자유게시판</a>
            </div>
          </div>
        
          <!-- 로그인 & 마이페이지 버튼2 -->
          <q-avatar class = "q-mr-sm" size="30px">
          <q-img src="../../public/icons/favicon-16x16.png">
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
          </q-img>
        </q-avatar>
      </div>

      <!--작은 메뉴-->
      <div class="lt-sm full-width">
        <div class="row justify-center items-center"> 
          <img id="logoImg2 " class="" src="../../public/icons/mainIcon2.png" >
          <q-avatar class = "absolute-right q-mr-sm q-mt-xs" size="25px">
            <!-- 로그인 & 마이페이지 버튼 -->
            <q-img src="../../public/icons/favicon-16x16.png">
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
            </q-img>
          </q-avatar>
        </div>
        <div class="row full-width justify-around">
              <a>지역별 여행지</a>
              <a>핫플 게시판</a>
              <a>나의 여행계획</a>
              <a>자유게시판</a>
            </div>
      </div>
  </div>
  
</template>

<script>
export default {

}
</script>

<style scoped>
  
  #logoImg{
    width: 100px;
    height: 70px;
  }

  #logoImg2{
    width: 140px;
    height: 50px;
  }



</style>