<template>
    <div>
        <div>
            全部留言
        </div>
        <div>
            <el-table
                :data="ly"
                style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="内容">
                                <markdown-it-vue class="md-body" :content="props.row.liuyan_content"/>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="liuyan_id"
                    label="#"
                    width="50">
                </el-table-column>
                <el-table-column
                    prop="user_name"
                    label="昵称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="user_email"
                    label="邮箱"
                    width="180">
                </el-table-column>
                <el-table-column
                    label="时间"
                    width="180">
                    <template slot-scope="props">
                        {{props.row.liuyan_time.split('T')[0]}}
                        {{parseInt(props.row.liuyan_time.split('T')[1].split(':')[0],10)+8}}:{{props.row.liuyan_time.split('T')[1].split(':')[1]}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="user_blog"
                    label="博客"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="user_role"
                    label="角色"
                    width="180">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="editorArticle">
                        <el-button @click="deleteLiuyanById(editorArticle.row.liuyan_id)" type="danger" icon="el-icon-delete" circle></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "liuyan",
        created() {
            this.findAllLiuyanForAdmin();
        },
        methods: {
            async deleteLiuyanById(id){
                let result = await this.$http({
                    url:'/admin/deleteLiuyanById?id='+id,
                    method:'GET'
                });
                if(result.data.code === 200){
                    this.$message("删除成功！")
                     this.findAllLiuyanForAdmin();
                }else {
                    this.$notify.error("删除失败!")
                }
            },
            async findAllLiuyanForAdmin() {
                let result = await this.$http({
                    url: '/admin/findAllLiuyanForAdmin',
                    method: 'GET'
                });
                console.log(result);
                if (result.data.code === 200) {
                    this.ly = result.data.data
                } else {
                    this.$notify.error("获取失败!")
                }
            }
        },
        data() {
            return {
                ly: []
            }
        },
    }
</script>

<style scoped>

</style>
