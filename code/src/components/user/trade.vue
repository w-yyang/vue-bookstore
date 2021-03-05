<template>
    <div class="trade">
        <el-table
                v-loading="false"
                :data="nowPageShow[nowPage]"
                style="width: 100%"
                :row-class-name="tableRowClassName">
                <el-table-column
                    prop="time"
                    label="日期"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="shopname"
                    label="商品名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="price"
                    label="价格">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="paging">
                <el-pagination
                    background
                    @prev-click="beforePage"
                    @next-click="afterPage"
                    layout="prev, pager, next"
                    :total="1000">
                </el-pagination>
            </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                // tableData: [],
                nowPageShow: [],
                nowPage: 0
            }
        },
        methods: {
            async getBillList(){
                let username = this.$store.state.username
                let backData = await this.$http('/api/admin/bill/', {
                                    params: {
                                        username: username
                                    }
                                })
                var tableData = backData.data.billlist
                for(let i = 0;i < tableData.length;i += 5){
                    if(i + 5 < tableData.length)
                        this.nowPageShow.push(tableData.slice(i, i + 5))
                    else
                        this.nowPageShow.push(tableData.slice(i, tableData.length))
                }
            },
            async handleDelete(index, row){
                console.log(row, index)
                //row为当前行对象
                let delId = row.bill_id
                this.nowPageShow[this.nowPage].splice(index, 1)
                let backMsg = await this.$http('/api/admin/bill/removeone/' + delId)
                this.getBillList()
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                return 'warning-row'
                } else if (rowIndex === 3) {
                return 'success-row'
                }
                return ''
            },
            beforePage(){
                this.nowPage -= 1
            },
            afterPage(){
                console.log(this.nowPage)
                this.nowPage += 1
            }
        },
        created(){
            this.getBillList()
        }
    }
</script>

<style lang="scss" scoped>
    .paging {
        position: absolute;
        left: 50px;
        bottom: 40px;
    }
</style>