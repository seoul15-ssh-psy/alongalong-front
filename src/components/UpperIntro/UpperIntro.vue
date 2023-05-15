<template>
    
    <div class=" gt-xs" id="upperParent1">
        <!-- 배경 색깔 + 텍스트-->
        <div class="moveArea1" :style="[{backgroundColor:bgColor },{paddingLeft:upperColorPL+'px'},{paddingBottom:upperColorPB+'px'}]" id="upperColor">
            <p class="upperText1 moveArea2" :style="{fontSize:upperText1Size+'px'}" v-html="slideText" ></p>
        </div>
        <!-- 하단 숫자 01/05 & 재생, 앞으로 가기, 뒤로 가기-->
        <div class="row" id="upperBar" :style="{paddingLeft:upperColorPL+'px'}">
            <div class="col-3 row ">
                <q-linear-progress :value="progress" size="5px" color="secondary" class="q-mt-sm" instant-feedback="true" animation-speed="500"/>
            </div>
            <div class="row">
                <p v-text:="(i+1) +' / '+max"/>
                <button v-on:click="imgListLeft">왼</button>
                <button v-on:click="imgListToggle">재</button>
                <button v-on:click="imgListRight">오</button>
            </div>
        </div>
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
            <q-carousel-slide name="imgList1" class="transparent padding-0 ">
                <img src="../../../public/attraction/upperIntro/skyrim(1).jpg" class="img rounded-borders">
            </q-carousel-slide>
            <q-carousel-slide name="imgList2" class="transparent  padding-0">
                <img src="../../../public/attraction/upperIntro/skyrim(2).jpg" class="img rounded-borders">
            </q-carousel-slide>
            <q-carousel-slide name="imgList3" class="transparent  padding-0">
                <img src="../../../public/attraction/upperIntro/skyrim(3).jpg" class="img rounded-borders">
            </q-carousel-slide>
        </q-carousel>
        
    </div>

    <div class="lt-sm" :style="{backgroundColor:bgColor}"  id="upperParent2">
        <div id="imgArea">
            <q-carousel
            v-model="slide"
            transition-prev="slide-right"
            transition-next="slide-left"
            animated
            id = "upperImgList2"
            class="transparent"
            >
                <q-carousel-slide name="imgList1" class="transparent padding-0">
                    <img src="../../../public/attraction/upperIntro/skyrim(1).jpg" class="img rounded-borders">
                </q-carousel-slide>
                <q-carousel-slide name="imgList2" class="transparent padding-0">
                    <img src="../../../public/attraction/upperIntro/skyrim(2).jpg" class="img rounded-borders">
                </q-carousel-slide>
                <q-carousel-slide name="imgList3" class="transparent padding-0">
                    <img src="../../../public/attraction/upperIntro/skyrim(3).jpg" class="img rounded-borders">
                </q-carousel-slide>
            </q-carousel>
            <q-linear-progress :value="progress" size="5px" color="secondary" class="q-mt-sm" instant-feedback="true" animation-speed="500"/>
            <p class="upperText2" v-html="slideText"></p>
        </div>
    </div>

</template>
<script>
import { useQuasar } from 'quasar'
import { computed } from 'vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {

    
    data() { 
        return {
            slide: ref('imgList1'),
            slideText:"밤 나들이 <br> 야간 개장으로 만나는<br> 고즈넉~",
            progress: 0,
            interval: 0,
            upperText1Size: 30,
            i: 0,
            max: 3,
            toggleOn: true,
            goLeft: false,
            goRight: false,
            bgColor: '#FDC4F8',
            imgWidth:100,
            upperColorPL:100,
            upperColorPB:100,
        };
    },
    created(){ 
        const screenWidth = window.innerWidth
        this.upperText1Size = screenWidth;
        this.upperText1Size = this.upperText1Size / 60 + 10;
            this.imgWidth = screenWidth / 3 + 100;
        this.upperColorPL = screenWidth * screenWidth / 10000;
        this.upperColorPB = (screenWidth / 10) - 50;
    },
   
    mounted() {
        let slideList = [ref('imgList1'), ref('imgList2'), ref('imgList3')];
        let upperTextContent = ["밤 나들이 <br>야간 개장으로 만나는 <br>고즈넉~","여기는<br> 또 어떤 느낌의 <br>여행지일까요 ㅎㅎ","여기는<br> 스카이림 <br>노드의 땅"];
        let bgColorList = ['#FDC4F8','#CB9FFD','#BAE7AF'];
        
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
            this.imgWidth = screenWidth / 3 + 100;
            this.upperColorPL = screenWidth * screenWidth / 10000;
            this.upperColorPB = (screenWidth / 10) - 50;
        },
        imgListLeft: function (event) { 
            this.goLeft = true;
        },
        imgListToggle: function(event){ 
            this.toggleOn = !this.toggleOn;
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
    padding-bottom:50px;
}
#upperParent2{
    height:60% !important;
    padding-bottom:10px;
}
#upperColor{
    padding-top: 180px;
    padding-left:5%;
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
#imgArea{
    margin-left:2%;
    margin-right:2%;
    padding-top:2%;
}
#upperImgList{
    right: 0;
    top:0;
    margin-top:110px;
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
.padding-0{
    padding: 0;
}

</style>