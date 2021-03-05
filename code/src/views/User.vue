<template>
    <div class="user">
        <aside-menu @getPath="changeContent($event)"/>
        <div class="userhead">
            <div class="userstate">
                <span>用户名：{{this.$store.state.username ? this.$store.state.username : "未登录"}}</span>
                <el-button type="primary" @click="logout">退出登录</el-button>
            </div>
        </div>
        <div class="context">
            <router-view />
        </div>
    </div>
</template>

<script>
    import AsideMenu from '../components/user/asidemenu.vue'

    export default {
        data() {
            return {
                
            }
        },
        methods: {
            changeContent(path){
                this.$router.push(path)
            },
            async logout(){
                let result = await this.$http('/api/admin/user/logout')
                // console.log('退出结果', result)
                this.$store.commit('userLogout')
                this.$router.push('/login')
            }
        },
        created(){
            // console.log('路由位置', this.$router)
            if(!this.$store.state.loginState){
                this.$router.push('/login')
            }else{
                this.$router.push('/collection')
            }
        },
        components: {
            "aside-menu": AsideMenu
        }
    }
</script>

<style lang="scss" scoped>
    .user {

        .userhead {
            position: relative;
            margin-left: 320px;
            height: 60px;

            .userstate {
                width: 280px;
                height: 60px;
                margin-right: 70px;
                display: flex;
                align-items: center;
                position: absolute;
                right: 0px;

                span {
                    display: block;
                    width: 230px;
                }
            }
        }

        .context {
            position: relative;
            margin-left: 320px;
            margin-right: 40px;
            margin-top: 20px;
            height: 450px;
            width: 1040px;
            padding: 40px 40px 20px 50px;
            background-color:#FFFFF0;
            overflow: auto;
            overflow-x: hidden;
        }
    }
</style>