<template>
    <div class="header">
        <h1><i class="iconfont icon-shuji"></i>线上书店</h1>
        <ul class="navlist">
            <li :class="nowIndex == item.id ? 'active' : ''" v-for="item in navList" :key="item.id" @click="handleClick(item.id, item.path)">
                {{item.title}}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                navList: [
                    {
                        title: '首页',
                        id: 1,
                        path: '/'
                    },
                    {
                        title: '商品',
                        id: 2,
                        path: '/shop'
                    },
                    {
                        title: '个人',
                        id: 3,
                        path: '/user'
                    },
                    {
                        title: '登录',
                        id: 4,
                        path: '/login'
                    }
                ],
                nowIndex: 1
            }
        },
        methods: {
            handleClick(index, path){
                this.nowIndex = index
                this.$router.push(path)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header {
        width: 100%;
        min-width: 1000px;
        height: 80px;
        margin-bottom: 14px;
        background-color: #C1FFC1;

        h1 {
            line-height: 80px;
            float: left;
            margin-left: 140px;
            position: relative;
            color: #FFFFE0;

            i {
                position: absolute;
                display: block;
                left: -40px;
                top: 0px;
            }
        }

        .navlist {
            float: right;
            width: 700px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-items: center;

            li {
                flex: 1;
                font-size: 1.4em;
                text-align: center;
                line-height: 80px;
            }
        }
    }

    .active {
        background-color: chartreuse;
        color: #FFFFE0;
    }
</style>