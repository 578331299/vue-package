<template>
    <div class='position-container'>
        <div class="div-round"></div>
        <div style="margin-right:10px">位置:</div>
        <div>{{positionName.title}}</div>
    </div>
</template>
<script>
export default {
    name:"PositionBar",
    data(){
        return{
            positionName:{}
        }
    },
    mounted(){
        this.positionName=this.$route.meta;
    }
}
</script>
<style scoped>
    .position-container{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #a8a8a8;
        font-family: "微软雅黑";
        margin-bottom: 5px;
    }
    .div-round{
        width:16px;
        height: 16px;
        border-radius: 50%;
        background-color: #a8a8a8;
        margin-right: 10px;
    }

</style>


