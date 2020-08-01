<template>
    <div>
        <div id="category-title">word</div>
        <div id="modify-list">
            <el-table
                :data="cotagoryData"
                style="width: 100%">
                <el-table-column
                    prop="mywords_content"
                    label="描述"
                    width="380">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="props">
                        <el-button @click="openEditorCategory(props.row)" type="primary" icon="el-icon-edit"
                                   circle></el-button>
                    </template>
                </el-table-column>
                <el-dialog
                    style="border-radius: 15px"
                    center
                    :visible.sync="dialogVisible"
                    width="40%"
                    :append-to-body="true"
                    :before-close="handleClose">
                    <div>
                        <div id="cname">
                            <el-input v-model="editCotegory.mywords_content" placeholder="请输入内容"></el-input>
                        </div>
                        <div id="ok">
                            <el-button @click="changeMywords" type="success" round>发布</el-button>
                        </div>
                    </div>
                </el-dialog>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mywords",
        created() {
            this.findMywords()
        },
        data() {
            return {
                dialogVisible: false,
                editCotegory: {},
                cotagoryData: [],
            }
        }, methods: {
            async changeMywords(){
                let result = await this.$http({
                    url: '/admin/changeMywords',
                    method: 'post',
                    data:this.editCotegory
                });
                console.log(result)
                if (result.data.code === 200) {
                    this.findMywords()
                    this.editCotegory={}
                    this.dialogVisible = false
                } else {
                    this.$notify.error("获取失败！");
                }
            },
            async findMywords() {
                let result = await this.$http({
                    url: '/home/findMywords',
                    method: 'GET'
                });
                console.log(result)
                if (result.data.code === 200) {
                    this.cotagoryData=[];
                    this.cotagoryData.push(result.data.data)
                    console.log(this.cotagoryData);
                } else {
                    this.$notify.error("获取失败！");
                }
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
            }
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
