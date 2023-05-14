<template>
    
    <div class="bg-primary gt-xs" id="upperParent">
        <!-- 배경 색깔 + 텍스트-->
        <div class="bg-positive" id="upperColor">
            <p class="upperText1" :style="{fontSize:upperText1Size+'px'}">밤 나들이</p>
            <p class="upperText1" :style="{fontSize:upperText1Size+'px'}">야간 개장으로 만나는</p>
            <p class="upperText1" :style="{fontSize:upperText1Size+'px'}">고즈넉~</p>
            
        </div>
        <!-- 하단 숫자 01/05 & 재생, 앞으로 가기, 뒤로 가기-->
        <div class="row" id="upperBar">
            <div class="col-6">
                <q-linear-progress :value="progress" color="secondary" class="q-mt-sm" instant-feedback="true" animation-speed="500"/>
            </div>
        </div>
        <img src="../../../public/icons/mainIcon.png" id="img">

    </div>

    <div class="bg-primary lt-sm" id="upperParent">
        <div id="imgArea">
            <img src="../../../public/icons/mainIcon.png" id="img2">
            <p class="upperText2">밤 나들이</p>
            <p class="upperText2">야간 개장으로 만나는</p>
            <p class="upperText2">고즈넉~</p>
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
            progress: 0,
            interval: 0,
            upperText1Size: 30
        };
    },
    
    mounted() {

        this.interval = setInterval(() => {
            if (this.progress >= 1) {
                this.progress = -0.1;
                //여기서 사진 옆으로 돌리기
                return;
            }
            this.progress = this.progress + 0.01;
        }, 100);

        window.addEventListener('resize', this.onResize);

    },

    methods: {
        onResize: function(event){ 
            const screenWidth = window.innerWidth
            this.upperText1Size = screenWidth;
            this.upperText1Size = this.upperText1Size / 40 + 10;
    }
    },
  
    onBeforeUnmount() {
      clearInterval(interval)
    }

    
    
    
    
    
    
    
}
</script>

<style scoped>
#upperParent{
    height:60% !important;
    padding-bottom:50px;
}
#upperColor{
    padding-top: 16%;
    padding-bottom:4%;
    padding-left:15%;
}
#upperBar{
    padding-top: 2%;
    padding-left:5%;
}
#img{
    right: 0;
    top:0;
    margin-top:150px;
    z-index: 2;
    position: absolute;
    height:auto;
    width:35%;

}
#img2{
    height:auto;
    width:100%;
}
#imgArea{
    margin-left:2%;
    margin-right:2%;
    margin-top:2%;
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


</style>