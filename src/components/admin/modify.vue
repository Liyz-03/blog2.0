<template>
    <div>
        <div id="modify-title">所有文章</div>

        <div id="modify-list">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <div>
                                <el-form-item label="描述">
                                    <span>{{ props.row.post_description }}</span>
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item label="内容">
                                    <markdown-it-vue class="md-body" :content="props.row.post_content"/>
                                </el-form-item>
                            </div>
                        </el-form>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="post_id"
                    label="#"
                    width="60">
                </el-table-column>
                <el-table-column
                    prop="post_title"
                    label="标题"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="user_name"
                    label="作者"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="category_name"
                    label="分类"
                    width="120">
                </el-table-column>
                <el-table-column
                    label="创建时间"
                    width="150">
                    <template slot-scope="props">
                        {{props.row.post_create_time.split('T')[0]}}
                        {{parseInt(props.row.post_create_time.split('T')[1].split(':')[0],10)+8}}:{{props.row.post_create_time.split('T')[1].split(':')[1]}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="最后发表时间"
                    width="150">
                    <template slot-scope="props">

                        <span
                            v-if="props.row.post_public_time === null || props.row.post_public_time===undefined">暂未发布</span>
                        <span v-if="props.row.post_public_time !== null && props.row.post_public_time!==undefined">
                            {{props.row.post_public_time.split('T')[0]}}
                        {{parseInt(props.row.post_public_time.split('T')[1].split(':')[0],10)+8}}:{{props.row.post_public_time.split('T')[1].split(':')[1]}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="状态"
                    width="180">
                    <template slot-scope="props">
                        <el-switch
                            @change="changedIsDraft(props.row)"
                            active-text="已发表"
                            inactive-text="草稿"
                            :value="!props.row.post_is_draft"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="editorArticle">
                        <el-button @click="openEditorArticle(editorArticle.row)" type="primary" icon="el-icon-edit"
                                   circle></el-button>
                        <el-button @click="deletePost(editorArticle.row)" type="danger" icon="el-icon-delete"
                                   circle></el-button>
                    </template>
                </el-table-column>
                <el-dialog
                    center
                    title="修改文章"
                    :visible.sync="dialogVisible"
                    width="80%"
                    :append-to-body="true"
                    :before-close="handleClose">
                    <div>
                        <div id="title">
                            <div class="write-title">文章标题</div>
                            <el-input v-model="editArticle.post_title" placeholder="请输入内容"></el-input>
                        </div>
                        <div id="description">
                            <div class="write-title">文章描述</div>
                            <el-input
                                type="textarea"
                                :rows="3"
                                placeholder="请输入内容"
                                v-model="editArticle.post_description">
                            </el-input>
                        </div>
                        <div id="content">
                            <div class="write-title">奋笔疾书</div>
                            <mavon-editor
                                style="height: 400px"
                                :autofocus="true"
                                :boxShadow="true"
                                :ishljs="true"
                                :editable="true"
                                :subfield="true"
                                defaultOpen="edit"
                                placeholder="随便写写。。。"
                                :toolbarsFlag="true"
                                :navigation="false"
                                v-model="editArticle.post_content"/>
                        </div>
                        <div id="ok">
                            <el-button @click="changePost(editArticle.post_id)" type="success" round>发布</el-button>
                        </div>
                    </div>
                </el-dialog>

            </el-table>
        </div>


    </div>
</template>

<script>
    export default {
        name: "modify",
        created() {
            //查询所有文章，包括草稿
            this.findAllPosts();
        },

        data() {
            return {
                editArticle: {},
                dialogVisible: false,
                tableData: []
            }
        },
        methods: {
            openEditorArticle(editorArticle) {
                this.editArticle = editorArticle
                this.dialogVisible = true
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            //查询所有文章
            async findAllPosts() {
                let result = await this.$http({
                    url: '/admin/findAllPostsIncludeDraft',
                    method: 'GET'
                });
                console.log(result)
                if (result.data.code === 200) {
                    this.tableData = result.data.data;
                } else {
                    this.$notify.error("获取文章失败！")
                }
            },
            //根据id修改文章的发表状态
            changedIsDraft: async function (post) {
                post.post_is_draft = !post.post_is_draft
                let result = await this.$http({
                    url: '/admin/changePostIsDraft',
                    method: 'POST',
                    data: post
                });
                console.log(result);
                if (result.data.code === 200) {
                    this.$notify.info("文章状态修改成功！");
                    this.findAllPosts();
                } else {
                    this.$notify.error("文章状态修改失败！")
                }
            },
            //根据id修改文章内容
            async changePost(post_id) {
                console.log(this.editArticle)
                let result = await this.$http({
                    url: '/admin/changePostContent',
                    method: 'POST',
                    data: this.editArticle
                });
                console.log(result);
                if (result.data.code === 200) {
                    this.$notify.success("文章内容修改成功！");
                    this.dialogVisible = false
                } else {
                    this.$notify.error("文章内容修改失败！")
                }
            },
            //删除文章
            async deletePost(post) {
                let result = await this.$http({
                    url: '/admin/deletePost?id=' + post.post_id,
                    method: 'GET'
                });
                console.log(result)
                if (result.data.code === 200) {
                    this.findAllPosts();
                } else {
                    this.$notify.error("文章删除失败！")
                }
            }

        }
    }
</script>

<style scoped>
    #modify-title {
        font-size: 20px;
        font-weight: bold;
    }

    .write-title {
        padding: 5px 0;
        font-weight: bold;
    }

    #ok {
        width: 100px;
        height: 75px;
        margin: 10px auto 0 auto;
    }

</style>
