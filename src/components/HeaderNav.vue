<template>
  <div class="q-mx-xs">
    <!--큰 메뉴-->
    <div
      class="gt-xs full-width row justify-between items-center fixed-top q-pt-md q-pb-md q-pl-md q-pr-md"
      id="headerNavi"
      :style="[
        { backgroundColor: headerNavColor },
        { boxShadow: headerNavShadow },
      ]"
    >
      <q-img
        id="logoImg"
        src="../../public/icons/mainIcon1.png"
        class="q-ml-md"
        :style="{width:headerNavImgSize+'px'}"
      ></q-img>
      <div class="row">
        <div class="col-12 q-ml-md">
          <a class="navText q-py-lg" :style="[{fontSize:headerNavFontSize+'px'},{marginRight:headerNavTextPad+'px'}]">지역별 여행지</a>
          <a class="navText q-py-lg" :style="[{fontSize:headerNavFontSize+'px'},{marginLeft:headerNavTextPad+'px'},{marginRight:headerNavTextPad+'px'}]">핫플 게시판</a>
          <a class="navText q-py-lg" :style="[{fontSize:headerNavFontSize+'px'},{marginLeft:headerNavTextPad+'px'},{marginRight:headerNavTextPad+'px'}]">나의 여행계획</a>
          <a class="navText q-py-lg" :style="[{fontSize:headerNavFontSize+'px'},{marginLeft:headerNavTextPad+'px'},{marginRight:headerNavTextPad+'px'}]">자유게시판</a>
        </div>
      </div>

      <!-- 로그인 & 마이페이지 버튼2 -->
      <q-avatar class="q-mr-sm" size="30px">
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
    <div class="lt-sm full-width q-pb-sm q-ml-lg">
      <div class="row justify-center items-center">
        <img id="logoImg2 " class="q-py-lg" src="../../public/icons/mainIcon2.png" />
        <q-avatar id="avatar2" class="absolute" size="35px">
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
        <a class="navText navTextSmall ">지역별 여행지</a>
        <a class="navText navTextSmall ">핫플 게시판</a>
        <a class="navText navTextSmall ">나의 여행계획</a>
        <a class="navText navTextSmall ">자유게시판</a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      headerNavColor: 'transparent',
      headerNavShadow: 'none',
      headerNavFontSize: 18,
      headerNavImgSize: 70,
      headerNavTextPad: 30,
    }
  },

  mounted() {
    window.addEventListener('scroll', event => {
      if (document.documentElement.scrollTop == 0) {
        this.headerNavColor = 'transparent';
        this.headerNavShadow = 'none';
      } else {
        this.headerNavColor = 'white';
        this.headerNavShadow = '0 2px 15px rgba(0,0,0,0.30)';
      }
    })

    window.addEventListener('resize', event=>{
      const screenWidth = window.innerWidth;
      console.log(screenWidth);
      if (screenWidth > 740) {
        this.headerNavFontSize = 18;
        this.headerNavImgSize = 100;
        this.headerNavTextPad = screenWidth / 60;
      } else { 
        this.headerNavFontSize = 16;
        this.headerNavImgSize = 70;
        this.headerNavTextPad = 5;

      }

    })
  }
}
</script>

<style scoped>
#logoImg {
  height: auto;
}

#logoImg2 {
  width: 140px;
  height: 50px;
}

#headerNavi {
  z-index: 4;
}
#avatar2{
  padding-top: 5px;
  right: 15px;
}
.navText{
  font-weight: 800;
  color: gray;
}
.navTextBig{
  font-size: 18px;
}
.navTextSmall{
  font-size: 15px;
}
.navText:hover {
  color: black;
}
</style>
