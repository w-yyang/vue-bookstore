<template>
    <div class="lunbo">
        <el-carousel :interval="4000" type="card" height="480px">
            <el-carousel-item v-for="item in 5" :key="item">
                <img :src="require(`../../assets/book${item}.jpg`)" alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
  .lunbo {
    width: 1200px;

    .el-carousel__item{

        img {
            width: 100%;
            height: 100%;
        }
    } 
    
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
  }
</style>