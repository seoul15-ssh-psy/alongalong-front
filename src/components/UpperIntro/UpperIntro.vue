<template>
    
    <div class=" gt-xs" id="upperParent1" :style="{paddingBottom:upperParentPB+'px'}">
        <!-- 배경 색깔 + 텍스트-->
        <div class="moveArea1" :style="[{backgroundColor:bgColor },{paddingLeft:upperColorPL+'px'},{paddingBottom:upperColorPB+'px'}]" id="upperColor">
            <q-chip square class="q-mb-sm" color = "black" text-color="white" size="md"><div id="chip" v-text="chipText"></div></q-chip>
            <p class="upperText1 moveArea2" :style="{fontSize:upperText1Size+'px'}" v-html="slideText" ></p>
        </div>
        <!-- 하단 숫자 01/05 & 재생, 앞으로 가기, 뒤로 가기-->
        <div class="row " id="upperBar" :style="{paddingLeft:upperColorPL+'px'}" >
            <div class="col-2 row">
                <q-linear-progress :value="progress" size="4px" color="black" class="q-mt-sm verticalMiddle" instant-feedback="true" animation-speed="500"/>
            </div>
            <div class="row">
                <p v-text:="(i+1) " class="verticalMiddle" :style="[{paddingLeft:'20px'},{paddingRight:'4px'},{fontWeight:'700'},{fontSize:upperBarTextSize+'px'}]"/>
                <p v-text:="' / '+max" class="verticalMiddle" :style="[{paddingRight:upperBarPR+'px'},{fontSize:upperBarTextSize+'px'},{color:'gray'}]"/>
                <q-btn v-on:click="imgListLeft" icon="arrow_back" class="upperImgBtn" :size="upperImgBtnSize+'px'" padding="3px" flat > </q-btn>
                <q-btn v-on:click="imgListToggle" :icon="toggleIcon" class="upperImgBtn" :size="upperImgBtnSize+'px'" padding="3px" flat ></q-btn>
                <q-btn v-on:click="imgListRight" icon="arrow_forward" class="upperImgBtn" :size="upperImgBtnSize+'px'" padding="3px" flat ></q-btn>
            </div>
        </div>
        <img src="../../../public/attraction/upperIntro/transparent.png" class="shadowImg rounded-borders moveArea2 imgShadow" :style="{width:imgWidth+'px'}">
        <q-carousel
            v-model="slide"
            transition-prev="slide-right"
            transition-next="slide-left"
            animated
            padding
            id = "upperImgList"
            :style="{width:imgWidth+'px'}"
            class="transparent moveArea2"
            >
            <q-carousel-slide v-for="img in imgList" v-bind:key="img" :name="img" class="padding-0">
                <img :src="require('../../../public/attraction/upperIntro/'+img+'.jpg')" class="img2 rounded-borders">
            </q-carousel-slide>
        </q-carousel>
        <!--빙글빙글 돌아가는 텍스트 이미지-->
        <img src="../../../public/icons/logo.png" class="logoTextImg" :style="{right:imgWidth-70+'px'}">
    </div>

    <div class="lt-sm" :style="[{backgroundColor:bgColor},{marginBottom:upperParentPB+'px'},{marginTop:'85px'}]"  id="upperParent2">
        <div id="imgArea">
            <q-carousel
            v-model="slide"
            transition-prev="slide-right"
            transition-next="slide-left"
            animated
            id = "upperImgList2"
            class="transparent"
            >
                <q-carousel-slide v-for="img in imgList" v-bind:key="img" :name="img" class="padding-0">
                    <img :src="require('../../../public/attraction/upperIntro/'+img+'.jpg')" class="img2 rounded-borders">
                </q-carousel-slide>
            </q-carousel>
            <q-linear-progress :value="progress" size="3.5px" color="black" class="q-mt-sm" instant-feedback="true" animation-speed="500"/>
            <div class="row">
                <div>        
                    <q-chip square color = "black" text-color="white" id="chip" size="sm"><div id="chip" v-text="chipText"></div></q-chip>
                    <p class="upperText2 col-11" v-html="slideText"></p>
                </div>
                <q-btn v-on:click="imgListToggle" :icon="toggleIcon" class="upperImgBtn2 col-1 q-mb-xl" :size="upperImgBtnSize+'px'" padding="3px" flat ></q-btn>
            </div>
        </div>
    </div>

</template>
<script>
import { useQuasar } from 'quasar'
import { computed } from 'vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'

let toggleIconList = ["pause_circle_outline", "play_circle_outline"];
let slideList = [
    ref('cheongsan'),
    ref('deokyoo'),
    ref('kyeonbok'),
    ref('oonmoon'),
    ref('sosae'),
    ref('yongbi'),
    ref('expo'),
    ref('nospam')
];
let upperTextContent = [
    "아시아 최초의 슬로시티 <br> 청산도에서  <br>느림의 미학을 배워요~",
    "눈꽃이 아름다운<br> 덕유산 설천봉에서 산책해요<br><br> ",
    "경복궁에서 <br> 이쁜 한복입고 <br>인생샷 얻어가자!",
    "분위기 있는 <br>운문사로 놀러가자!  <br>나무아비타불~",
    "십장 폭포를 구경할 수 있는<br> 담양 소쇄원에서 <br>힐링하는건 어때요?",
    "한국의 스위스!<br> 용비지에서 느끼는 <br>유럽의 향기",
    "대전 엑스포 <br>추억의 꿈돌이도 보고 <br>엑스포 다리도 건너고",
    "조선의 대표적인 읍성<br>해미읍성은 <br>어떤 곳일까?",
];
let chipTextList = [
    "슬로시티",
    "눈꽃맞이",
    "인생샷",
    "운문사",
    "폭포 소쇄원",
    "K-SWISS",
    "추억의 꿈돌이",
    "햄이..읎엉 ㅎㅎ",
]
let bgColorList = ['#AFCB3D60','#BEEBFD67','#FFF77FA9','#CB9FFD3A','#AFCB3D69','#9EC5D555','#C9BA9B66','#EADB8077'];

export default {

    data() { 
        return {
            slide: slideList[0],
            slideText:upperTextContent[0],
            progress: 0,
            interval: 0,
            upperText1Size: 30,
            i: 0,
            max: 8,
            toggleOn: true,
            goLeft: false,
            goRight: false,
            bgColor: '#AFCB3D70',
            imgWidth:100,
            upperColorPL:0,
            upperColorPB: 100,
            upperBarPR: 100,
            toggleIcon: "pause_circle_outline",
            imgList: ["cheongsan", "deokyoo", "kyeonbok", "oonmoon", "sosae", "yongbi", "expo", "nospam"],
            chipText:"슬로시티",
        };
    },
    created(){ 
        const screenWidth = window.innerWidth
        this.upperText1Size = screenWidth;
        this.upperText1Size = this.upperText1Size / 60 + 10;
        this.imgWidth = screenWidth / 3 + 150;
        this.upperColorPL = screenWidth * screenWidth / 6000 - 93;
        this.upperColorPB = (screenWidth / 10) - 50;
        this.upperBarPR = (screenWidth / 10) - 90;
        this.upperParentPB = (screenWidth / 12) + 30;
        if (screenWidth > 700) {
            this.upperImgBtnSize = 16;
            this.upperBarTextSize = 20;

        } else { 
            this.upperImgBtnSize = 13;
            this.upperBarTextSize = 15;

        }
    },
   
    mounted() {
        
        this.interval = setInterval(() => {
            if (this.toggleOn) { 
                this.progress = this.progress + 0.01;
            }
            if (this.goLeft) { 
                this.progress = -0.1;
                this.i = this.i == 0 ? this.i = this.max-1 : this.i - 1;
                this.slide = slideList[this.i];
                this.slideText = upperTextContent[this.i];
                this.bgColor = bgColorList[this.i];
                this.goLeft = false;
                this.chipText = chipTextList[this.i];
                return;
            }
            if (this.goRight) { 
                this.progress = -0.1;
                this.i = (this.i+1) % this.max;
                this.slide = slideList[this.i];
                this.slideText = upperTextContent[this.i];
                this.bgColor = bgColorList[this.i];
                this.chipText = chipTextList[this.i];

                this.goRight = false;
                return;
            }
            if (this.progress >= 1) {
                this.progress = -0.1;
                //여기서 사진 옆으로 돌리기
                this.i = (this.i+1) % this.max;
                this.slide = slideList[this.i];
                this.slideText = upperTextContent[this.i];
                this.bgColor = bgColorList[this.i];
                this.chipText = chipTextList[this.i];

                return;
            }
        }, 100);

        window.addEventListener('resize', this.onResize);
        
    },

    methods: {
        
        onResize: function(event){ 
            const screenWidth = window.innerWidth
            this.upperText1Size = screenWidth;
            this.upperText1Size = this.upperText1Size / 60 + 10;
            this.imgWidth = screenWidth / 3 + 150;
            this.upperColorPL = screenWidth * screenWidth / 6000 - 93;
            this.upperColorPB = (screenWidth / 10) - 50;
            this.upperBarPR = (screenWidth / 10) - 90;
            this.upperParentPB = (screenWidth / 12) + 30;

            if (screenWidth > 700) {
                this.upperImgBtnSize = 16;
                this.upperBarTextSize = 20;

            } else { 
                this.upperImgBtnSize = 13;
                this.upperBarTextSize = 15;

            }
        },
        imgListLeft: function (event) { 
            this.goLeft = true;
        },
        imgListToggle: function(event){ 
            this.toggleOn = !this.toggleOn;
            this.toggleIcon = this.toggleOn?toggleIconList[0]:toggleIconList[1];
        },
        imgListRight: function (event) {
            this.goRight = true;
        }
    },
  
    onBeforeUnmount() {
      clearInterval(interval)
    }

}
</script>

<style scoped>
#upperParent1{
    height:60% !important;
}
#upperParent2{
    height:60% !important;
    padding-bottom:10px;
}
#upperColor{
    padding-top: 250px;
}
#upperBar{
    padding-top: 2%;
    height: 10px;
}
.img{
    height:auto;
    width:100% !important;
}

.img2{
    height:98% !important;
    width:100% !important;
}
#imgArea{
    margin-left:2%;
    margin-right:2%;
    padding-top:2%;
}
#upperImgList{
    right: 0;
    top:0;
    margin-top:160px;
    z-index: 2;
    position: absolute;
    padding:0px !important;
    height : auto;
}


.upperText1{
    margin: 0;
    font-weight: 600;
}
.upperText2{
    font-size:1.3em;
    margin: 0;
    font-weight: 600;
}
.moveArea1{
    transition: 1s background ease;

}
.moveArea2{
    transition: 0.1s ease;
}
.shadowImg{
    right: 0;
    top:0;
    margin-top:160px;
    z-index: 3;
    position: absolute;
    padding:0px !important;
    
}

.padding-0{
    padding: 0;
}

.verticalMiddle{
    margin-top: auto;
    margin-bottom: auto;
}

.imgShadow{
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
}

.logoTextImg{
    z-index:3;
    animation: rotate_image 15s linear infinite;
    transform-origin: 50% 50%;
    position:absolute;
    right:0;
    top:105px;
    width:150px;
}

@keyframes rotate_image{
    100% {
        transform: rotate(360deg);
    }
}
.upperImgBtn2{
    position: absolute;
    right:5px;
    margin-top: 5px;
}

</style>