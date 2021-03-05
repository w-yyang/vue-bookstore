<template>
    <div class="login">
        <div class="login-wrapper">
            <div class="login-inp" v-show="showLogin">
                <div class="title">
                    <span class="active" @click="changeLogin(true)">登录</span>
                    <span @click="changeLogin(false)">注册</span>
                </div>
                <div class="inp-container">
                    <label for="">用户名</label>
                    <el-input
                        class="input"
                        placeholder="请输入内容"
                        v-model="username">
                    </el-input>
                </div>
                <div class="inp-container">
                    <label for="">密码</label>
                    <el-input 
                        class="input"
                        placeholder="请输入密码" 
                        v-model="password" 
                        show-password></el-input>
                </div>
                <div class="btn">
                    <el-button type="primary" class="button" @click="login">用户登录</el-button>
                    <el-button class="button" @click="clearlogin">信息清空</el-button>
                </div>
            </div>
            <div class="register-inp" v-show="!showLogin">
                <div class="title">
                    <span @click="changeLogin(true)">登录</span>
                    <span @click="changeLogin(false)" class="active">注册</span>
                </div>
                <div class="inp-container">
                    <label for="">用户名</label>
                    <el-input
                        class="input"
                        placeholder="请输入内容"
                        v-model="regname">
                    </el-input>
                </div>
                <div class="inp-container">
                    <label for="">密码</label>
                    <el-input 
                        class="input"
                        placeholder="请输入密码" 
                        v-model="regpass" 
                        show-password></el-input>
                </div>
                <div class="inp-container">
                    <label for="">确认密码</label>
                    <el-input 
                        class="input"
                        placeholder="请输入密码" 
                        v-model="passwordagain" 
                        show-password></el-input>
                </div>
                <div class="btn">
                    <el-button type="primary" class="button" @click="register">用户注册</el-button>
                    <el-button class="button" @click="clearreg">信息清空</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                username: '',
                password: '',
                passwordagain: '',
                showLogin: true,
                regname: '',
                regpass: ''
            }
        },
        methods: {
            async login(){
                const username = this.username.trim()
                const password = this.password.trim()
                if(username && password){
                    let result = await this.$http('/api/admin/user/login', {
                                                    username: username,
                                                    password: password
                                                 }, 'post')
                    // console.log(result)
                    result = result.data
                    this.$message({
                        dangerouslyUseHTMLString: true,
                        message: `${result.msg}`,
                        duration: 2000
                    })
                    // console.log(this)
                    if(result.state == 0){
                        this.$router.push('/user')
                        this.$store.commit('userLogin', username)
                    }
                }else{
                    this.$message({
                        message: '用户名或密码不能为空'
                    })
                }
            },
            async register(){
                const username = this.regname.trim()
                let same = this.regpass === this.passwordagain
                if(!same){
                    this.$message({
                        message: '两次密码输入不一致'
                    })
                    this.clearreg()
                }
                const password = this.regpass.trim()
                if(username && password){
                    let result = await this.$http('/api/admin/user/adduser', {
                                                    username: username,
                                                    password: password
                                                 }, 'post')
                    result = result.data
                    this.$message({
                        dangerouslyUseHTMLString: true,
                        message: `${result.msg}`,
                        duration: 2000
                    })
                }else{
                    this.$message({
                        message: '用户名或密码不能为空'
                    })
                }    
            },
            changeLogin(judge){
                if(this.showLogin != judge){
                    this.showLogin = judge
                }
            },
            clearlogin(){
                this.username = ''
                this.password = ''
            },
            clearreg(){
                this.regname = ''
                this.regpass = ''
                this.passwordagain = ''
            }
        }
    }
</script>

<style lang="scss" scoped>
    .content {
        margin: 0 200px;
    }

    .login {
        width: 100%;
        min-width: 1000px;
        height: 100%;

        .login-wrapper {
            margin-top: -14px;
            position: relative;
            width: 100%;
            height: 670px;
            background-image: url('../assets/book.jpg');
            background-size: 100% 670px;
            background-repeat: no-repeat;

            .login-inp {
                margin-top: 40px;
                position: absolute;
                right: 200px;
                width: 360px;
                height: 400px;
                background-color: rgba(188, 188, 188, 0.1);
                display: grid;
                grid-template-rows: 60px 80px 80px 40px;
                grid-row-gap: 10px;

                .title {
                    line-height: 60px;
                    font-size: 1.2em;
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    align-items: center;
                    justify-items: center;

                    span {
                        display: block;
                        width: 100%;
                        height: 100%;
                    }

                    .active {
                        background-color: azure;
                    }
                }

                .inp-container {
                    display: grid;
                    align-items: center;
                    grid-template-rows: 30px 50px;
                    grid-template-columns: repeat(3, 33.3%);

                    label {
                        grid-column-start: 1;
                        grid-column-end: 2;
                    }

                    .input {
                        grid-row: 2;
                        grid-column-start: 1;
                        grid-column-end: 4;
                    }
                }

                .btn {
                    display: grid;
                    align-items: center;
                    grid-template-columns: repeat(2, 1fr);
                    justify-items: center;

                    .button {
                        width: 100px;
                    }
                }
            }

            .login-inp > div {
                margin: 0 30px;
            }

            .register-inp {
                margin-top: 40px;
                position: absolute;
                right: 200px;
                width: 360px;
                height: 400px;
                background-color: rgba(188, 188, 188, 0.1);
                display: grid;
                grid-template-rows: 60px 70px 70px 70px 50px;
                grid-row-gap: 10px;

                .title {
                    line-height: 60px;
                    font-size: 1.2em;
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    align-items: center;
                    justify-items: center;

                    span {
                        display: block;
                        width: 100%;
                        height: 100%;
                    }

                    .active {
                        background-color: azure;
                    }
                }

                .inp-container {
                    display: grid;
                    align-items: center;
                    grid-template-rows: 20px 40px;
                    grid-template-columns: repeat(3, 33.3%);
                    grid-row-gap: 10px;

                    label {
                        grid-column-start: 1;
                        grid-column-end: 2;
                    }

                    .input {
                        grid-row: 2;
                        grid-column-start: 1;
                        grid-column-end: 4;
                    }
                }

                .btn {
                    display: grid;
                    align-items: center;
                    grid-template-columns: repeat(2, 1fr);
                    justify-items: center;

                    .button {
                        width: 100px;
                    }
                }
            }

            .register-inp > div {
                margin: 0 30px;
            }
        }
    }
</style>