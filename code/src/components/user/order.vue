<template>
    <div class="order">
        <div class="title">
            <p class="shopt">商品名</p>
            <p class="timet">交易日期</p>
            <p class="pricet">价格</p>
            <p class="operatet">操作</p>
        </div>
        <ul v-loading="loading">
            <li v-for="item in orderList" :key="item.id">
                <img :src="'/images/' + item.imgurl" alt="">
                <div class="msg">
                    <p class="name">{{item.shopname}}</p>
                    <p class="time">日期</p>
                    <p class="price">{{item.price}}</p>
                    <div class="operate">
                        <button @click="delRecord(item.id)">删除</button>
                        <button>退货</button>
                        <button>再次购买</button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                orderList: [],
                loading: false
            }
        },
        methods: {
            async getAllOrder(){
                this.loading = true
                let username = this.$store.state.username
                var backData = await this.$http('/api/admin/order/', {
                                                    params: {
                                                        username: username
                                                    }
                                                })
                this.orderList = backData.data.allorder
                this.loading = false
            },
            async delRecord(orderId){
                let backData = await this.$http('/api/admin/order/delorder/' + orderId)
                let msg = backData.data.msg
                this.$message({
                    message: msg
                })
                this.getAllOrder()
            }
        },
        created(){
            this.getAllOrder()
        }
    }
</script>

<style lang="scss" scoped>
    .order {
        height: 450px;
        width: 1020px;

        .title {
            position: absolute;
            width: 1020px;
            height: 40px;
            background-color: #fff;
            display: flex;
            border: 1px solid #F0F0F0;

            p {
                text-align: center;
                font-size: 1.2em;
                line-height: 40px;
                color: #000;
            }

            .shopt {
                margin-left: 180px;
                width: 240px;
            }

            .timet {
                width: 240px;
            }

            .pricet {
                width: 140px;
            }

            .operatet {
                width: 160px;
            }
        }

        ul {
            width: 1020px;
            height: 420px;
            overflow: auto;
            padding-top: 40px;

            li {
                width: 100%;
                height: 220px;
                display: flex;
                background-color: #fff;
                border-top: 1px solid #F0F0F0;

                img {
                    margin-top: 20px;
                    margin-left: 10px;
                    width: 160px;
                    height: 180px;
                }

                .msg {
                    display: flex;
                    width: 1000px;

                    .name {
                        width: 30%;
                        padding-top: 80px;
                    }

                    .price {
                        width: 14%;
                        padding-top: 80px;
                    }

                    .time {
                        width: 30%;
                        padding-top: 80px;
                    }

                    .operate {
                        width: 26%;
                        padding-top: 90px;
                        display: flex;

                        button {
                            width: 60px;
                            height: 30px;
                            margin-left: 10px;
                            border-radius: 4px;
                        }

                        button:nth-child(1) {
                            background-color:#FF4500;
                        }

                        button:nth-child(2) {
                            background-color:#FFFFE0;
                        }

                         button:nth-child(3) {
                            background-color:#C1FFC1;
                        }                        
                    }
                }
            }
        }
    }
</style>