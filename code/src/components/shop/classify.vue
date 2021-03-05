<template>
    <div class="classify">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">经典书籍</el-menu-item>
            <el-menu-item index="2">古典名著</el-menu-item>
            <el-menu-item index="3">外国名著</el-menu-item>
            <el-menu-item index="4">历史书籍</el-menu-item>
            <el-menu-item index="5">儿童教材</el-menu-item>
            <el-menu-item index="6">科学教育</el-menu-item>
        </el-menu>
        <div class="line"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: '1'
            }
        },
        methods: {
            handleSelect(key) {
                this.$emit('changeClassify', key)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .classify {
        width: 800px;
        margin: 0 auto;

        .el-menu-demo {
            width: 800px;

            .el-menu-item {
                font-size: 1.4em;
            } 
        }
    }
</style>