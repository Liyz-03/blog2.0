<template>
    <div>
        <div>博客日志</div>
        <div>
            <el-button @click="addCotegoryEvent" id="addCategory" type="success" round>添加日志</el-button>
            <div id="modify-list">
                <el-table
                    :data="lineData"
                    style="width: 100%;margin-left: 30px">
                    <el-table-column
                        prop="log_id"
                        label="#"
                        width="50">
                    </el-table-column>
                    <el-table-column
                        label="时间"
                        width="180">
                        <template slot-scope="props">
                            {{props.row.log_time.split('T')[0]}}
                            {{parseInt(props.row.log_time.split('T')[1].split(':')[0],10)+8}}:{{props.row.log_time.split('T')[1].split(':')[1]}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="log_content"
                        label="内容"
                        width="250">
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template slot-scope="editorTimeline">
                            <el-button @click="openEditorTimeline(editorTimeline.row)" type="primary"
                                       icon="el-icon-edit"
                                       circle></el-button>
                            <el-button @click="deleteLog(editorTimeline.row.log_id)" type="danger" icon="el-icon-delete" circle></el-button>
                        </template>
                    </el-table-column>
                    <el-dialog
                        style="border-radius: 15px"
                        center
                        title="修改日志"
                        :visible.sync="dialogVisible"
                        width="30%"
                        :append-to-body="true"
                        :before-close="handleClose">
                        <div>
                            <div id="cid">
                                <div class="write-title">id</div>
                                <el-input :disabled="true" v-model="editTimelineData.log_id" placeholder="请输入内容"></el-input>
                            </div>
                            <div id="cname">
                                <div class="write-title">日志内容</div>
                                <el-input v-model="editTimelineData.log_content" placeholder="请输入内容"></el-input>
                            </div>


                            <div id="ok">
                                <el-button @click="changeLogContent" type="success" round>发布</el-button>
                            </div>
                        </div>
                    </el-dialog>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "timeline",
        created() {
            this.findAllLog()
        },
        data() {
            return {
                lineData: [],
                dialogVisible: false,
                editTimelineData: {},
            }
        },
        methods: {
            async saveLog(){
                let result = await this.$http({
                    url:'/admin/saveLog',
                    method:'POST',
                    data:this.editTimelineData
                });
                 if(result.data.code === 200){
                    this.$notify.success("提交成功！")
                     this.dialogVisible = false
                     this.editTimelineData={}
                     this.findAllLog()
                }else {
                    this.$notify.error("提交失败!")
                }
            },
            async changeLogContent(){
                if(this.editTimelineData.log_id ===null || this.editTimelineData.log_id===undefined){
                    this.saveLog()
                }else{
                    let result = await this.$http({
                    url:'/admin/changeLogContent',
                    method:'POST',
                    data:this.editTimelineData
                });
                 if(result.data.code === 200){
                    this.$notify.success("修改成功！")
                     this.dialogVisible = false
                     this.editTimelineData={}
                     this.findAllLog()
                }else {
                    this.$notify.error("修改失败!")
                }
                }
            },
            async deleteLog(id){
                let result = await this.$http({
                    url:'/admin/deleteLogById?id='+id,
                    method:'GET'
                });
                if(result.data.code === 200){
                    this.$notify.success("删除成功！")
                     this.findAllLog()
                }else {
                    this.$notify.error("删除失败!")
                }
            },
            async findAllLog() {
                let result = await this.$http({
                    url: '/home/findAllLog',
                    method: 'GET'
                });
                console.log(result.data)
                if (result.data.code == 200) {
                    this.lineData = result.data.logs;
                } else {
                    this.$notify.error("获取失败");
                }
            },
            addCotegoryEvent() {
                this.dialogVisible = true
            },
            openEditorTimeline(editorTimeline) {
                this.editTimelineData = editorTimeline
                this.dialogVisible = true
            },
            handleClose() {
                this.dialogVisible = false
                this.editTimelineData = {};
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
