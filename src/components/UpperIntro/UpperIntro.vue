<template>
    
    <div class="bg-primary gt-xs" id="upperParent1">
        <!-- 배경 색깔 + 텍스트-->
        <div class="bg-positive" id="upperColor">
            <p class="upperText1" :style="{fontSize:upperText1Size+'px'}" v-html="slideText" ></p>

        </div>
        <!-- 하단 숫자 01/05 & 재생, 앞으로 가기, 뒤로 가기-->
        <div class="row" id="upperBar">
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
            class=" rounded-borders"
            id = "upperImgList"
            >
            <q-carousel-slide name="imgList1">
                <img src="../../../public/icons/mainIcon1.png" id="img">
            </q-carousel-slide>
            <q-carousel-slide name="imgList2">
                <img src="../../../public/icons/mainIcon2.png" id="img">
            </q-carousel-slide>
        </q-carousel>
        
    </div>

    <div class="bg-primary lt-sm" id="upperParent2">
        <div id="imgArea">
            <q-carousel
            v-model="slide"
            transition-prev="slide-right"
            transition-next="slide-left"
            animated
            class="rounded-borders"
            id = "upperImgList2"
            >
                <q-carousel-slide name="imgList1">
                    <img src="../../../public/icons/mainIcon1.png" id="img2">
                </q-carousel-slide>
                <q-carousel-slide name="imgList2">
                    <img src="../../../public/icons/mainIcon2.png" id="img2">
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
            max: 2,
            toggleOn: true,
            goLeft: false,
            goRIght: false,
        };
    },
   
    mounted() {
        let slideList = [ref('imgList1'), ref('imgList2')];
        let upperTextContent = ["밤 나들이 <br>야간 개장으로 만나는 <br>고즈넉~","여기는<br> 또 어떤 느낌의 <br>여행지일까요 ㅎㅎ"];
        
        
        this.interval = setInterval(() => {
            if (this.toggleOn) { 
                this.progress = this.progress + 0.01;
            }
            if (this.goLeft) { 
                this.progress = -0.1;
                this.i = this.i == 0 ? this.i = this.max-1 : this.i - 1;
                this.slide = slideList[this.i];
                this.slideText = upperTextContent[this.i];
                this.goLeft = false;
                return;
            }
            if (this.goRight) { 
                this.progress = -0.1;
                this.i = (this.i+1) % 2;
                this.slide = slideList[this.i];
                this.slideText = upperTextContent[this.i];
                this.goRight = false;
                return;
            }
            if (this.progress >= 1) {
                this.progress = -0.1;
                //여기서 사진 옆으로 돌리기
                this.i = (this.i+1) % 2;
                this.slide = slideList[this.i];
                this.slideText = upperTextContent[this.i];
                return;
            }
        }, 100);

        window.addEventListener('resize', this.onResize);

    },

    methods: {
        onResize: function(event){ 
            const screenWidth = window.innerWidth
            this.upperText1Size = screenWidth;
            this.upperText1Size = this.upperText1Size / 40 + 10;
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
    padding-top: 16%;
    padding-bottom:4%;
    padding-left:15%;
}
#upperBar{
    padding-top: 4%;
    padding-left:15%;
    height: 10px;
}
#img{
    height:auto;
    width:100%;
}
#img2{
    height:auto;
    width:100%;
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
    width: 40%;
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


</style>