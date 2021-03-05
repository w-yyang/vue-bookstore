<template>
    <el-col :span="12" style="width: 260px;">
        <h5>功能选项</h5>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @select="clickItem">
          <el-submenu index="collection">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>收藏的商品</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="allcol">商品列表</el-menu-item>
              </el-menu-item-group>
          </el-submenu>
          <el-submenu index="order">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">订单列表</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="buyhis">购买订单</el-menu-item>
              </el-menu-item-group>
          </el-submenu>
          <el-submenu index="trade">
              <template slot="title"> 
                <i class="el-icon-document"></i>
                <span slot="title">交易历史</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="allbill">历史记录</el-menu-item>
              </el-menu-item-group>
          </el-submenu>
          <el-submenu index="usermsg">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">个人信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="usermsg">用户信息</el-menu-item>
              </el-menu-item-group>
          </el-submenu>
        </el-menu>
    </el-col>
</template>

<script>

export default {
    data() {
      return {
        isCollapse: true
      };
    },
    methods: {
      clickItem(index, indexPath){
        let path = '/' + indexPath[0]
        this.$emit("getPath", path)
      }
    }
}
</script>

<style lang="scss" scoped>

</style>