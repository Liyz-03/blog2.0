<template>
    <div id="admin-index">
        <el-container id="admin-container">
            <el-container id="admin-content-con">
                <el-aside id="admin-content-sider" width="200px">
                    <el-row style="width: 200px;height: 100%;" class="tac">
                        <el-col :span="12">
                            <el-menu
                                :router="true"
                                style="width: 200px;border-radius: 8px;padding: 10px 0"
                                default-active="/admin/index/total"
                                class="el-menu-vertical-demo">

                                <el-menu-item index="/admin/index/total">
                                    <i class="el-icon-menu"></i>
                                    <span slot="title">总览</span>
                                </el-menu-item>

                                <el-submenu index="/admin/index/write">
                                    <template slot="title">
                                        <i class="el-icon-location"></i>
                                        <span>管理</span>
                                    </template>
                                    <el-menu-item-group>
                                        <el-menu-item index="/admin/index/write">写点东西</el-menu-item>
                                        <el-menu-item index="/admin/index/modify">改改文章</el-menu-item>

                                        <el-menu-item index="/admin/index/category">改改分类</el-menu-item>
                                        <el-menu-item index="/admin/index/mywords">我要改名言</el-menu-item>
                                        <el-menu-item index="/admin/index/liuyan">看看留言</el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>
                                <el-menu-item index="/admin/index/timeline">
                                    <i class="el-icon-document"></i>
                                    <span slot="title">博客日志</span>
                                </el-menu-item>
                                <el-menu-item index="/admin/index/total">
                                    <i class="el-icon-setting"></i>
                                    <span slot="title">待开发</span>
                                </el-menu-item>
                            </el-menu>
                        </el-col>
                    </el-row>
                </el-aside>
                <el-main id="admin-content-main">
                    <el-card class="box-card" style="width: 100%;height: 100%">
                        <router-view/>
                    </el-card>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped lang="less">
    #admin-index {
        box-sizing: border-box;
        width: 100vw;
        height: 100vh;
        padding: 5px 60px;
        background-color: rgb(0, 139, 139);

        #admin-container {
            height: 100%;
            min-width: 1200px;
            margin: 0 auto;
            box-sizing: border-box;
            border-radius: 8px;
            overflow: hidden;


            #admin-content-con {
                height: 100%;
                width: 100%;
                border-radius: 8px;
                overflow: hidden;

                #admin-content-sider {
                    position: relative;
                    top: 20px;
                    box-sizing: border-box;
                    border-radius: 8px;
                    overflow: hidden;


                }

                #admin-content-main {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;

                    .box-card {
                        overflow-y: scroll;
                    }
                }

            }
        }
    }


</style>
