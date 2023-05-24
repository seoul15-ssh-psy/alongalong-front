<template>
  <div class="footer q-py-lg q-pl-md row" style="display:flex; justify-content:space-between; position:relative;">
    <div>
    <img src="../../../public/icons/mainIconWhite.png" style="width:15rem; height:auto;">
    <p></p>
    <div class="row text-gray">
      <a href="https://github.com/songsoo"><p class="q-pd-md q-mr-sm">송수현 깃허브 링크</p></a> |
      <a href="https://github.com/soun997"><p class="q-pd-md q-mx-sm">박소윤 깃허브 링크</p></a> |
      <a href="https://www.notion.so/along-along/c7f3b8920dbc4df7b5bd0f5dc4889978?v=25e74c62e2764388b71d6a9d979b811e"><p class="q-pd-md q-mx-sm">노션 링크</p></a>
    </div>
    <div class="row right-0 text-gray">
      <p class="q-pd-md">2023 서울 15반 8조 관통프로젝트 &nbsp;&nbsp;</p>
      <p class="q-pd-md">E-mail: ssh102525@gmail.com &nbsp;| &nbsp; soun997@gmail.com</p>
    </div>
  </div>
  <div class="gt-md footerImgDiv" style="position:absolute; bottom:30px; right:10px;">
    <a href="https://www.ssafy.com/ksp/jsp/swp/swpMain.jsp" class="q-mr-xs"><img src="../../../public/icons/ssafylogo.png" style="width:auto; height:3rem;"></a>
    <a href="https://www.data.go.kr/" class="q-mx-xs"><img src="../../../public/icons/data.png" style="width:auto; height:3rem;"></a>
    <a href="https://api.visitkorea.or.kr/#/" class="q-mx-xs"><img src="../../../public/icons/tourapi.png" style="width:auto; height:3rem;"></a>
    <a href="https://github.com/seoul15-ssh-psy" class="q-mx-xs"><img src="../../../public/icons/github.png" style="width:auto; height:3rem;"></a>
  </div>
  <div class="gt-sm lt-lg footerImgDiv" style="position:absolute; bottom:30px; right:10px;">
    <a href="https://www.ssafy.com/ksp/jsp/swp/swpMain.jsp" class="q-mr-xs"><img src="../../../public/icons/ssafylogo.png" style="width:auto; height:2.22rem;"></a>
    <a href="https://www.data.go.kr/" class="q-mx-xs"><img src="../../../public/icons/data.png" style="width:auto; height:2.22rem;"></a>
    <a href="https://api.visitkorea.or.kr/#/" class="q-mx-xs"><img src="../../../public/icons/tourapi.png" style="width:auto; height:2.22rem;"></a>
    <a href="https://github.com/seoul15-ssh-psy" class="q-mx-xs"><img src="../../../public/icons/github.png" style="width:auto; height:2.22rem;"></a>
  </div>
  <div class="lt-md footerImgDiv">
    <a href="https://www.ssafy.com/ksp/jsp/swp/swpMain.jsp" class="q-mr-xs"><img src="../../../public/icons/ssafylogo.png" style="width:auto; height:2.22rem;"></a>
    <a href="https://www.data.go.kr/" class="q-mx-xs"><img src="../../../public/icons/data.png" style="width:auto; height:2.22rem;"></a>
    <a href="https://api.visitkorea.or.kr/#/" class="q-mx-xs"><img src="../../../public/icons/tourapi.png" style="width:auto; height:2.22rem;"></a>
    <a href="https://github.com/seoul15-ssh-psy" class="q-mx-xs"><img src="../../../public/icons/github.png" style="width:auto; height:2.22rem;"></a>
  </div>
  </div>
</template>
<script>

export default {
  
}
</script>

<style scoped>
  .footer{
    background-color: rgb(22, 22, 22);
    color: ghostwhite;
    padding-left: 3%;
    padding-right: 5px;
  }

  .right-0{
    right: 0px;
  }

  .text-gray{
    color:lightgray;
  }

  .text-gray a:link, a:visited, a:active{
    color:lightgray;
    text-decoration: none;
  }

  .text-gray a:hover{
    color: white;
  }

  .footerImgDiv img:hover{
    filter: brightness(0.7);
  }


</style>
