<template>
  <div class="home">
    <div class="lunbo-container">
      <lunbo />
    </div>
    <h3 class="title">
        <a href="#more">欣赏更多</a>
    </h3>
    <div class="shoplist" v-loading="loading">
      <ul id="more">
        <li v-for="item in shoplist" :key="item.shopid">
          <img :src="'/images/' + item.imgurl" alt="">
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Lunbo from '../components/home/lunbo.vue'

  export default {
    name: 'Home',
    data(){
      return {
        shoplist: {},
        loading: false
      }
    },
    methods: {
      async getShowList(){
        this.loading = true
        const back = await this.$http('/api/shop/display')
        this.shoplist = back.data.shops.shoplist
        this.loading = false
      }
    },
    created(){
      this.getShowList()
    },
    components: {
      'lunbo': Lunbo
    }
  }
</script>

<style lang="scss" scoped>
    .home {
      margin-top: 50px;

      .lunbo-container {      
        height: 520px;
        width: 1200px;
        margin: 0 auto;
      }

      .title {
        font-size: 1.8em;
        font-weight: 400;
      }

      .title:after {
        content: '';
        display: block;
        width: 140px;
        height: 4px;
        border-radius: 1px;
        position: relative;
        left: 50%;
        top: 4px;
        transform: translateX(-50%);
      }

      .shoplist {
        margin: 30px auto 20px;
        width: 1200px;

        ul {
          width: 1200px;
          height: 800px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;

          li {
            width: 240px;
            height: 340px;
            border-radius: 6px;
            margin: 10px 20px;

            img {
              width: 100%;
              height: 90%;
            }
          }
        }
      }
    }
</style>
