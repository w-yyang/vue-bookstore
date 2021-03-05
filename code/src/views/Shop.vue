<template>
    <div class="shop">
        <div class="classify-container">
            <classify @changeClassify="getClassify($event)"/>
        </div>
        <div class="showshop">
            <div class="shoplist content">
                <ul class="shopwrapper" v-loading="loading">
                    <li v-for="item in shoplist" :key="item.shopid">
                        <img :src="'/images/' + item.imgurl" alt="">
                        <div class="msg">
                            <h5 class="name">{{item.name}}</h5>
                            <span class="price">￥{{item.price}}</span>
                            <p class="grade">{{item.score}}分</p>
                            <button class="buybtn" @click="toBuy(item.shopid)">购买</button>
                            <button @click="addCol(item.shopid, item.name, item.imgurl)">收藏</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Classify from '../components/shop/classify.vue'

    export default {
        data() {
            return {
                classify: 1,
                value: 4,
                shoplist: {},
                loading: false
            }
        },
        methods: {
            toBuy(shopid){
                //是否已登录  
                if(this.$store.getters.getLoginState){
                    this.$router.push({
                        name: 'Buy',
                        params: {
                            shopid: shopid
                        }
                    })
                }else{
                    this.$message({
                        message: '请先登录'
                    })
                }
            },
            async addCol(shopid, shopname, imgurl){
                if(this.$store.getters.getLoginState){
                    let username = this.$store.state.username
                    let result = await this.$http('/api/admin/collection/addtocol', {
                                                    params: {
                                                        shopid: shopid,
                                                        user: username,
                                                        shopname: shopname,
                                                        imgurl: imgurl
                                                    }
                                                })
                    this.$message({
                        message: result.data.msg
                    })
                }else{
                    this.$message({
                        message: '请先登录'
                    })
                }
            },
            async getClassify(category){
                this.loading = true
                this.classify = category
                let back = await this.$http('/api/shop/shopclassify/' + category)
                back = back.data
                // console.log(back.shops)
                this.shoplist = back.shops.shoplist
                this.loading = false
            }
        },
        created(){
            this.getClassify(1)
        },
        components: {
            'classify': Classify
        }
    }
</script>

<style lang="scss" scoped>
    .shop {

        .classify-container {
            width: 800px;
            margin: 30px auto 0px;
        }

        .showshop {

            .content {
                margin: 20px auto;
            }

            .shoplist {
                width: 1200px;
                
                .shopwrapper {
                    width: 1200px;
                    display: flex;
                    justify-content: center;
                    justify-items: start;
                    flex-wrap: wrap;

                    li {
                        width: 200px;
                        height: 300px;
                        background-color: #FFFFE0;
                        margin: 10px 14px;
                        box-shadow: 6px 5px 4px #D4D4D4;
                        border-radius: 3px;

                        img {
                            width: 100%;
                            height: 230px;
                        }

                        .msg {
                            display: grid;
                            position: relative;
                            grid-template-columns: 40% 30% 30%;
                            justify-content: center;

                            .name {
                                grid-column-start: 1;
                                grid-column-end: 3;
                                font-size: 26px;
                                font-weight: normal;
                                white-space:nowrap; //断行处理：无断行
                                text-overflow:ellipsis; //文字溢出处理：省略号
                                overflow:hidden;	//溢出处理：隐藏
                                height: 30px;
                            }

                            span {
                                font-size: 1.6em;
                                color: red;
                            }

                            button {
                                width: 80%;
                                margin-left: 5%;
                                color: #fff;
                                background-color:#FFF68F;
                            }

                            .buybtn {
                                color: #fff;
                                background-color:#FF4500;
                            }
                        }
                    }

                    li:hover {
                        box-shadow: none;
                        transform: scale(1.1);
                    }
                }
            }
        }
    }
</style>