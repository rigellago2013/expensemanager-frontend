<template>
    <div class="c-box" :style="{width:(size*2)+10+'px', height:(size*2)+10+'px'}">
        <div class="c-percent" :style="{width:(size*2)+10+'px', height:(size*2)+10+'px'}">
            <svg :style="{width:(size*2)+10+'px', height:(size*2)+10+'px'}">
                <circle :style="{width:(size*2)+'px', height:(size*2)+10+'px', strokeWidth: strokeWidth+'px'}" :cx="size" :cy="size" :r="size"></circle>
                <circle :cx="size" :cy="size" :r="size"
                        :style="{width:(size*2)+'px', height:(size*2)+10+'px', stroke:strokeColor, strokeDasharray: actualSize, strokeDashoffset: 'calc('+actualSize+' - ('+actualSize+' * '+progress+') / 100)', strokeWidth: strokeWidth+'px'}"
                        ></circle>
            </svg>
            <div class="c-number">
                <h2 :style="{fontSize: fontSize+'px'}">{{progress}}<span :style="{fontSize: fontSize / 1.8+'px'}">%</span></h2>
            </div>
        </div>
<!--        <h2 class="c-text">Progress</h2>-->
    </div>
</template>

<script>
    export default {
        name: "CircleProgress",
        props: {
            strokeColor: {
                type: String,
                default: '#6DB97C'
            },
            progress:{
                type: Number,
                default: 0
            },
            size:{
                type: Number,
                default: 30
            },
            fontSize:{
                type: Number,
                default: 48
            },
            strokeWidth:{
                type: Number,
                default: 10
            }
        },
        data(){
            return{
                actualSize:0
            }
        },
        watch:{
            size:{
                handler(val){
                    this.actualSize =  Math.PI * (val*2);
                },
                immediate:true,
                deep:true
            }
        },
        created(){

        }
    }
</script>

<style scoped>
    .c-box {
        position: relative;
        /*width: 110px;*/
        /*height: 110px;*/
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        /*background: #fff;*/
        /*box-shadow: 0 30px 60px rgba(0.0 .0, 0.2);*/
    }

    .c-box .c-percent {
        position: relative;
        /*width: 110px;*/
        /*height: 110px;*/
    }

    .c-box .c-percent svg {
        position: relative;
        /*width: 110px;*/
        /*height: 110px;*/
        transform: rotate(-90deg);
    }

    .c-box .c-percent svg circle {
        /*width: 110px;*/
        /*height: 110px;*/
        fill: none;
        stroke-width: 10;
        stroke: #000;
        transform: translate(5px, 5px);
        /*stroke-dasharray: 440;*/
        /*stroke-dashoffset: 440;*/
        /*stroke-linecap: round;*/
    }

    .c-box .c-percent svg circle:nth-child(1) {
        stroke-dashoffset: 0;
        stroke: #f3f3f3;
    }

    .c-box .c-percent svg circle:nth-child(2) {

    }

    .c-box .c-percent .c-number {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #999
    }

    .c-box .c-percent .c-number h2 {
        font-size: 48px;
    }

    .c-box .c-percent .c-number h2 span {
        font-size: 24px;
    }

    .c-box .c-text {
        padding: 10px 0 0;
        color: #999;
        font-weight: 700;
        letter-spacing: 1px;
    }
</style>