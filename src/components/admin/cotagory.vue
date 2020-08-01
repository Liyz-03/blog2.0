<template>
    <div>
        <div id="category-title">所有分类</div>
        <el-button @click="addCotegoryEvent" id="addCategory" type="success" round>添加分类</el-button>
        <div id="modify-list">
            <el-table
                :data="cotagoryData"
                style="width: 100%;margin-left: 50px">
                <el-table-column
                    prop="category_id"
                    label="#"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="category_name"
                    label="内容"
                    width="180">
                </el-table-column>
                <el-table-column
                    label="创建时间"
                    width="200">
                    <template slot-scope="props">
                        {{props.row.category_create_time.split('T')[0]}}
                        {{parseInt(props.row.category_create_time.split('T')[1].split(':')[0],10)+8}}:{{props.row.category_create_time.split('T')[1].split(':')[1]}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="editorCategory">
                        <el-button @click="openEditorCategory(editorCategory.row)" type="primary" icon="el-icon-edit"
                                   circle></el-button>
                        <el-button @click="deleteCategoryById(editorCategory.row.category_id)" type="danger"
                                   icon="el-icon-delete" circle></el-button>
                    </template>
                </el-table-column>
                <el-dialog
                    style="border-radius: 15px"
                    center
                    title="修改分类"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :append-to-body="true"
                    :before-close="handleClose">
                    <div>
                        <div id="cid">
                            <div class="write-title">id</div>
                            <el-input :disabled="true" v-model="editCotegory.category_id"
                                      placeholder="请输入内容"></el-input>
                        </div>
                        <div id="cname">
                            <div class="write-title">分类名</div>
                            <el-input v-model="editCotegory.category_name" placeholder="请输入内容"></el-input>
                        </div>


                        <div id="ok">
                            <el-button @click="saveACategory" type="success" round>发布</el-button>
                        </div>
                    </div>
                </el-dialog>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "cotagory",
        data() {
            return {
                dialogVisible: false,
                editCotegory: {},
                cotagoryData: []
            }
        },
        created() {
            this.findAllCategory()
        },
        methods: {
            async saveACategory() {
                if (this.editCotegory.category_id !== null && this.editCotegory.category_id !== undefined) {
                    let result = await this.$http({
                        url: '/admin/modifyCategory',
                        method: 'POST',
                        data: this.editCotegory
                    });
                    console.log(result)
                    if (result.data.code === 200) {
                        this.$notify.info("分类修改成功！")
                        this.findAllCategory()
                        this.dialogVisible = false;
                        this.editCotegory = {}
                    } else {
                        this.$notify.error("分类修改失败！")
                    }
                }else{
                    console.log(this.editCotegory);
                    let result = await this.$http({
                        url: '/admin/saveACategory',
                        method: 'POST',
                        data: this.editCotegory
                    });
                    console.log(result)
                    if (result.data.code === 200) {
                        this.$notify.info("分类添加成功！")
                        this.findAllCategory()
                        this.dialogVisible = false;
                        this.editCotegory = {}
                    } else {
                        this.$notify.error("分类添加失败！")
                    }
                }
            },
            async deleteCategoryById(id) {
                let result = await this.$http({
                    url: '/admin/deleteCategoryById?id=' + id,
                    method: 'GET'
                });
                console.log(result)
                if (result.data.code === 200) {
                    this.findAllCategory()
                    this.$notify.info("分类删除成功！")
                } else {
                    this.$notify.error("分类删除失败！可能此分类有文章！")
                }
            },
            async findAllCategory() {
                let result = await this.$http({
                    url: '/home/findAllCategorys',
                    method: 'GET'
                });
                if (result.data.code === 200) {
                    this.cotagoryData = result.data.data
                } else {
                    this.$notify.error("文章删除失败！")
                }
            },
            addCotegoryEvent() {
                this.dialogVisible = true;
                //发送保存分类请求
            },
            openEditorCategory(editorCategory) {
                this.dialogVisible = true
                console.log(editorCategory)
                this.editCotegory = editorCategory
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                        this.editCotegory = {};
                    })
                    .catch(_ => {
                    });
            },
        }
    }
</script>

<style scoped>
    #category-title {
        font-size: 20px;
        font-weight: bold;
    }

    #addCategory {
        margin: 10px 0;
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
