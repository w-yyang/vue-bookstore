<template>
    <div class="collection">
        <ul v-loading="loading">
            <li v-for="item in collist" :key="item.col_id">
                <img :src="'/images/' + item.imgurl" alt="">
                <div class="bottom">
                    <p>{{item.shopname}}</p>
                    <button class="buybtn" @click="toBuy(item.shopid)">购买</button>
                    <button @click="cancelCol(item.col_id)">取消收藏</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                collist: {},
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
                    this.$router.push('/login')
                }
            },
            async cancelCol(colId){
                let msg = await this.$http('/api/admin/collection/cancelcol/' + colId)
                this.getColList()
                this.$message({
                    message: msg.data.msg
                })
            },
            async getColList(){
                this.loading = true
                let result = await this.$http('/api/admin/collection/')
                this.collist = result.data.allcol.collist
                this.loading = false
            }
        },
        created(){
            this.getColList()
        }
        // beforeRouteEnter(to, from, next){
        //     if(from.name == "Buy"){
        //         next("/buy")
        //     }else{
        //         next()
        //     }
        // }
    }
</script>

<style lang="scss" scoped>
    .collection {
        
        ul {
            position: absolute;
            left: 0px;
            top: 0px;
            width: 100%;
            height: 590px;
            display: flex;
            flex-wrap: wrap;
            overflow: auto;
            background-color:#FFFFF0;

            li {
                width: 180px;
                height: 270px;
                background-color:#FCFCFC;
                margin-left: 20px;
                margin-top: 10px;

                img {
                    width: 100%;
                    height: 200px;
                }

                .bottom {
                    width: 100%;
                    height: 70px;

                    p {
                        width: 100%;
                        height: 24px;
                        font-size: 1.2em;
                        line-height: 20px;
                    }

                    button {
                        width: 70px;
                        height: 30px;
                        margin-top: 4px;
                        margin-left: 4px;
                        border-radius: 6px;
                        color: #fff;
                        background-color: #FFF68F;
                    }

                    .buybtn {
                        margin-right: 4px;
                        margin-left: 0px;
                        color: #fff;
                        background-color: #FF4500;
                    }
                }
            }
        }
    }
</style>