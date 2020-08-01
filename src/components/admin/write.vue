<template>
    <div>
        <div id="title">
            <div class="write-title">文章标题</div>
            <el-input v-model="article.title" placeholder="请输入内容"></el-input>
        </div>
        <div id="description">
            <div class="write-title">文章描述</div>
            <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="article.description">
            </el-input>
        </div>
        <div id="content">
            <div class="write-title">奋笔疾书</div>
            <mavon-editor
                style="height: 600px"
                :autofocus="true"
                :boxShadow="true"
                :ishljs="true"
                :editable="true"
                :subfield="true"
                defaultOpen="edit"
                placeholder="随便写写。。。"
                :toolbarsFlag="true"
                :navigation="false"
                v-model="article.content"/>
        </div>
        <div id="time">
            <div class="write-title">发布时间</div>
            <el-date-picker
                style="width: 250px"
                v-model="article.create_time"
                align="left"
                type="datetime"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日 HH:mm:ss"
                value-format="timestamp"
                :picker-options="pickerOptions">
            </el-date-picker>
        </div>
        <div id="category">
            <div class="write-title">所属分类</div>
            <el-tag
                :key="tag.category_id"
                v-for="tag in dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
                {{tag.category_name}}
            </el-tag>

            <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            <el-button @click="getAllCategory" type="primary" icon="el-icon-refresh" circle></el-button>
        </div>
        <div class="write-title">保存草稿？</div>
        <el-switch
            v-model="article.isDraft"
            active-color="#13ce66"
            inactive-color="#ff4949">
        </el-switch>
        <div id="ok">
            <el-button @click="savePost" type="success" round>发布</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "write",
        async created() {
            //1.查询所有分类信息
            this.getAllCategory();
        },
        data() {
            return {
                article: {
                    title: null,
                    description: null,
                    content: null,
                    isDraft: true,
                    create_time: null,
                    author_id: null,
                    author_name: null,
                    category_id: null,
                    category_name: null,

                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                dynamicTags: [],
                inputVisible: false,
                inputValue: ''
            }
        },
        methods: {
            async savePost() {
                let user_info = JSON.parse(window.sessionStorage.getItem("user_info"));
                console.log(user_info)
                if (user_info.user_role !== 'admin') {
                    this.$notify.error("你不够权限写文章");
                    return false;
                }
                this.article.category_id = this.dynamicTags[0].category_id;
                this.article.category_name = this.dynamicTags[0].category_name;
                this.article.author_id = user_info.user_id;
                this.article.author_name = user_info.user_name;
                for (let key in this.article) {
                    if (this.article[key] === null || this.article[key] === undefined) {
                        this.$notify.info("文章的" + key + "为空");
                        return false;
                    }
                }
                console.log(this.article)
                let result = await this.$http({
                    url: '/admin/savePost',
                    method: 'POST',
                    data: this.article
                });
                console.log(result)
                if (result.data.code === 200) {
                    if (this.article.isDraft === true) {
                        this.$notify.info("保存草稿成功")
                    } else {
                        this.$notify.success("发布成功!");
                    }
                }
            },
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            async handleInputConfirm() {
                let inputValue = this.inputValue;
                //发送请求保存分类
                if (inputValue) {
                    let savedCategory = await this.$http({
                        'url': '/admin/saveACategory',
                        method: 'POST',
                        data: {'category_name': inputValue}
                    });
                    console.log(savedCategory);
                    if (savedCategory.data.code === 200) {
                        this.dynamicTags.push(savedCategory.data.data);
                    } else {
                        this.$notify.error("保存分类失败！")
                    }
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            async getAllCategory() {
                let AllCategory = await this.$http({
                    url: '/home/findAllCategorys',
                    method: 'GET'
                });
                console.log(AllCategory)
                if (AllCategory.data.code === 200) {
                    this.dynamicTags = AllCategory.data.data;
                } else {
                    this.$notify.error("获取分类信息失败！")
                }
            }
        }
    }
</script>

<style scoped lang="less">

    .el-tag + .el-tag {
        margin-left: 10px;
    }

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }

    /*-----------------------*/
    .write-title {
        padding: 15px 0;
        font-weight: bold;
    }

    #ok {
        width: 100px;
        height: 75px;
        margin-top: 15px;
        /*margin: 10px auto 0 auto;*/
    }

</style>
