<template>
  <div class="transparent q-mx-xs" >
      <!--큰 메뉴-->
      <div class="gt-xs full-width row justify-between items-center">
          <img id="logoImg" src="../../public/icons/mainIcon.png" class="q-ml-lg">
          <div class="row ">
            <div class="col-12 q-ml-md">
              <a class="q-mr-lg">메뉴 1</a>
              <a class="q-mx-lg">메뉴 1</a>
              <a class="q-mx-lg">메뉴 1</a>
              <a class="q-mx-lg">메뉴 1</a>
              <a class="q-ml-lg">메뉴 1</a>
            </div>
          </div>
        <q-avatar class = "q-mr-lg" size="30px">
          <!-- 로그인 & 마이페이지 버튼 -->
          <img src="../../public/icons/favicon-16x16.png">
        </q-avatar>
      </div>

      <!--작은 메뉴-->
      <div class="lt-sm full-width">
        <div class="row justify-center items-center"> 
          <img id="logoImg2 " class="" src="../../public/icons/mainIcon2.png" >
          <q-avatar class = "absolute-right q-mr-sm q-mt-xs" size="25px">
            <!-- 로그인 & 마이페이지 버튼 -->
            <img src="../../public/icons/favicon-16x16.png">
          </q-avatar>
        </div>
        <div class="row full-width justify-around">
              <a>메뉴 111</a>
              <a>메뉴 111</a>
              <a>메뉴 111</a>
              <a>메뉴 111</a>
              <a>메뉴 111</a>
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