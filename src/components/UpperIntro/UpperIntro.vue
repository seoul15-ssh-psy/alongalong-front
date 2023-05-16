<template>
    
    <div class=" gt-xs" id="upperParent1" :style="{paddingBottom:upperParentPB+'px'}">
        <!-- 배경 색깔 + 텍스트-->
        <div class="moveArea1" :style="[{backgroundColor:bgColor },{paddingLeft:upperColorPL+'px'},{paddingBottom:upperColorPB+'px'}]" id="upperColor">
            <p class="upperText1 moveArea2" :style="{fontSize:upperText1Size+'px'}" v-html="slideText" ></p>
        </div>
        <!-- 하단 숫자 01/05 & 재생, 앞으로 가기, 뒤로 가기-->
        <div class="row " id="upperBar" :style="{paddingLeft:upperColorPL+'px'}" >
            <div class="col-2 row">
                <q-linear-progress :value="progress" size="3.5px" color="black" class="q-mt-sm verticalMiddle" instant-feedback="true" animation-speed="500"/>
            </div>
            <div class="row">
                <p v-text:="(i+1) " class="verticalMiddle" :style="[{paddingLeft:'20px'},{paddingRight:'4px'},{fontWeight:'700'}]"/>
                <p v-text:="' / '+max" class="verticalMiddle" :style="[{paddingRight:upperBarPR+'px'}]"/>
                <q-btn v-on:click="imgListLeft" icon="arrow_back" class="upperImgBtn" size="13px" padding="3px" flat > </q-btn>
                <q-btn v-on:click="imgListToggle" :icon="toggleIcon" class="upperImgBtn" size="13px" padding="3px" flat ></q-btn>
                <q-btn v-on:click="imgListRight" icon="arrow_forward" class="upperImgBtn" size="13px" padding="3px" flat ></q-btn>
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
            <q-carousel-slide name="imgList1" class="transparent padding-0" >
                <img src="../../../public/attraction/upperIntro/skyrim(1).jpg" class="img rounded-borders">
            </q-carousel-slide>
            <q-carousel-slide name="imgList2" class="transparent  padding-0">
                <img src="../../../public/attraction/upperIntro/skyrim(2).jpg" class="img rounded-borders">
            </q-carousel-slide>
            <q-carousel-slide name="imgList3" class="transparent  padding-0">
                <img src="../../../public/attraction/upperIntro/skyrim(3).jpg" class="img rounded-borders">
            </q-carousel-slide>
        </q-carousel>
        <!--빙글빙글 돌아가는 텍스트 이미지-->
        <img src="../../../public/icons/logo.png" class="logoTextImg" :style="{right:imgWidth-70+'px'}">
    </div>

    <div class="lt-sm" :style="[{backgroundColor:bgColor},{marginBottom:upperParentPB+'px'}]"  id="upperParent2">
        <div id="imgArea">
            <q-carousel
            v-model="slide"
            transition-prev="slide-right"
            transition-next="slide-left"
            animated
            id = "upperImgList2"
            class="transparent"
            >
                <q-carousel-slide name="imgList1" class=" padding-0">
                    <img src="../../../public/attraction/upperIntro/skyrim(1).jpg" class="img2 rounded-borders">
                </q-carousel-slide>
                <q-carousel-slide name="imgList2" class="transparent padding-0">
                    <img src="../../../public/attraction/upperIntro/skyrim(2).jpg" class="img2 rounded-borders">
                </q-carousel-slide>
                <q-carousel-slide name="imgList3" class="transparent padding-0">
                    <img src="../../../public/attraction/upperIntro/skyrim(3).jpg" class="img2 rounded-borders">
                </q-carousel-slide>
            </q-carousel>
            <q-linear-progress :value="progress" size="3.5px" color="black" class="q-mt-sm" instant-feedback="true" animation-speed="500"/>
            <p class="upperText2" v-html="slideText"></p>
        </div>
    </div>

</template>
<script>
import { useQuasar } from 'quasar'
import { computed } from 'vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'

let toggleIconList = ["pause_circle_outline", "play_circle_outline"];
let slideList = [ref('imgList1'), ref('imgList2'), ref('imgList3')];
let upperTextContent = ["밤 나들이 <br>야간 개장으로 만나는 <br>고즈넉~","여기는<br> 또 어떤 느낌의 <br>여행지일까요 ㅎㅎ","여기는<br> 스카이림 <br>노드의 땅"];
let bgColorList = ['#FFDAE177','#AFEEEE55','#E6E6FAAA'];

export default {

    data() { 
        return {
            slide: slideList[0],
            slideText:upperTextContent[0],
            progress: 0,
            interval: 0,
            upperText1Size: 30,
            i: 0,
            max: 3,
            toggleOn: true,
            goLeft: false,
            goRight: false,
            bgColor: '#FFDAE188',
            imgWidth:100,
            upperColorPL:100,
            upperColorPB: 100,
            upperBarPR: 100,
            toggleIcon: "pause_circle_outline",
            upperParentPB: 100,
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
                return;
            }
            if (this.goRight) { 
                this.progress = -0.1;
                this.i = (this.i+1) % this.max;
                this.slide = slideList[this.i];
                this.slideText = upperTextContent[this.i];
                this.bgColor = bgColorList[this.i];
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
    padding-left:15%;
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
    margin-top: 10px;
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

</style>