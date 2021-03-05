<template>
    <div class="buy">
        <div class="usermsg">
            <table>
                <tr>
                    <td>用户名</td>
                    <td class="content">{{usermsg.username}}</td>
                </tr>
                <tr>
                    <td>联系方式</td>
                    <td class="content">{{usermsg.phone}}</td>
                </tr>
                <tr>
                    <td>邮寄地址</td>
                    <td class="content">{{usermsg.address}}</td>
                </tr>
            </table>
        </div>
        <div class="shopmsg">
            <p>商品名</p><span>{{shopMsg.name}}</span>
            <img :src="'/images/' + shopMsg.imgurl" alt="">
            <div class="score">
                <span>评分</span>{{shopMsg.score}}
            </div>
            <div class="price">
                <span>价格</span>{{shopMsg.price}}
            </div>
        </div>
        <div class="submit">
            <button class="subbtn" @click="confirmBuy">支付订单</button>
            <button class="cancel">取消</button>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                shopMsg: {},
                usermsg: {}
            }
        },
        methods: {
            async confirmBuy(){
                let user = this.$store.state.username
                let buymsg = {
                    shopname: this.shopMsg.name,
                    price: this.shopMsg.price,
                    shopid: this.shopMsg.shopid,
                    username: user,
                    imgurl: this.shopMsg.imgurl
                }
                var backMsg = await this.$http('/api/admin/buy/confirmbuy', buymsg, 'post')
                var msg = backMsg.data.msg
                this.$message({
                    message: msg
                })
                this.$router.push('/collection')
            },
            async getShop(){
                let shopid = this.$route.params.shopid || this.$router.query
                let backData = await this.$http('/api/shop/searchshop/' + shopid)
                this.shopMsg = backData.data.shopmsg
            },
            async getUserMsg(){
                let username = this.$store.state.username
                var backData = await this.$http('/api/admin/user/usermsg', {
                                                    params: {
                                                        username: username
                                                    }
                                                })
                this.usermsg = backData.data.usermsg
            }
        },
        created(){
            this.getShop()
            this.getUserMsg()
        }
    }
</script>

<style lang="scss" scoped>
    .buy {
        margin-top: -20px;
        width: 800px;
        height: 600px;
        margin-left: 100px;
        background-color: #FFEBCD;
        border-radius: 20px;

        .usermsg {
            padding-left: 150px;

            table {

                tr {
                    height: 80px;

                    td {
                        font-size: 1.2em;
                        text-align: left;
                        padding-left: 40px;
                    }
                }
            }
        }

        .shopmsg {
            margin-top: 20px;
            box-sizing: border-box;
            padding-left: 170px;
            width: 80%;
            height: 200px;
            display: grid;
            grid-template-columns: 50% 50%;
            grid-template-rows: 20% 40% 40%;
            align-items: center;
            grid-row-gap: 10px;

            p, span {
                margin-left: 22px;
                text-align: left;
                font-size: 1.2em;
            }

            img {
                margin-left: 20px;
                width: 80%;
                height: 100%;
                grid-row-start: 2;
                grid-row-end: 4;
            }
        }

        .submit {
            margin-top: 40px;

            button {
                width: 80px;
                height: 40px;
                border-radius: 6px;
                margin: 0 6px;
            }

            .subbtn {
                margin-left: 270px;
                background-color:#FF4500;
            }
        }
    }
</style>