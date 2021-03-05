<template>
    <div class="usermsg">
        <div class="mainmsg">
            <tr>
                <td>用户名：</td>
                <td><p>{{usermsg.username}}</p></td>
            </tr>
            <tr>
                <td>邮寄地址：</td>
                <td><p>{{usermsg.address}}</p></td>
            </tr>
            <tr>
                <td>联系方式：</td>
                <td><p>{{usermsg.phone}}</p></td>
            </tr>
        </div>
        <div class="userimg">
            <img :src="require(`../../assets/book.jpg`)" alt="">
        </div>
        <el-button type="primary" class="alter" @click="dialogVisible=true">信息修改</el-button>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="40%">
            <label for="">邮寄地址</label>
            <el-input v-model="alterAddress"/>
            <label for="">电话号码</label>
            <el-input v-model="alterPhone"/>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible=false">取 消</el-button>
            <el-button type="primary" @click="alterHandler">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                usermsg: {},
                alterPhone: '',
                alterAddress: '',
                dialogVisible: false
            }
        },
        methods: {
            async getUserMsg(){
                let username = this.$store.state.username
                var backData = await this.$http('/api/admin/user/usermsg', {
                                                    params: {
                                                        username: username
                                                    }
                                                })
                this.usermsg = backData.data.usermsg
            },
            async alterHandler(){
                let alterObj = {
                    address: this.alterAddress,
                    phone: this.alterPhone,
                    username: this.usermsg.username
                }
                let result = await this.$http('/api/admin/user/altermsg', alterObj, 'post')
                this.dialogVisible = false
                this.getUserMsg()
            }
        },
        created(){
            this.getUserMsg()
        }
    }
</script>

<style lang="scss" scoped>
    .usermsg {
        position: relative;

        .mainmsg {
            margin-top: 40px;

            tr {

                td {
                    width: 140px;
                    height: 130px;
                    font-size: 1.4em;
                }

                td:nth-child(2){
                    width: 300px;
                    text-align: left;

                    p {
                        margin-left: 20px;
                        border-bottom: 1px solid green;
                    }
                }
            }
        }

        .userimg {
            position: absolute;
            right: 120px;
            top: 0px;
            width: 300px;
            height: 300px;

            img {
                width: 300px;
                height: 300px;
                border-radius: 50%;
            }
        }

        .alter {
            position: absolute;
            left: 20px;
            bottom: 0px;
        }

        .el-dialog {

            label {
                display: block;
                width: 100%;
                height: 50px;
                text-align: left;
                line-height: 50px;
                font-size: 1.2em;
            }
        }
    }
</style>