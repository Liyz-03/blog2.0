<template>
    <div>
        <div class="liyanye-title">留言贴</div>
        <div id="liuyan-div">
            <div id="liuyan-editor">
                <div id="editor-bar">
                    <div>
                        <mavon-editor
                            id="editing"
                            :autofocus="false"
                            :boxShadow="false"
                            :ishljs="true"
                            defaultOpen="edit"
                            placeholder="支持Markdown编写留言。。。"
                            :toolbarsFlag="false"
                            :navigation="false"
                            v-model="editLiuYan.UserContent"/>
                    </div>
                    <div id="edited">
                        <markdown-it-vue class="md-body" :content="editLiuYan.UserContent"/>
                    </div>
                </div>
            </div>
            <div id="liuyan-bar-login">
                <div ref="UserQQTX" id="liuyan-tx"><img :src="editLiuYan.UserTX" alt=""></div>
                <form>
                    <div id="liuyan-right">
                        <div id="liuyan-nickname">
                            <input v-on:blur="getQQtx" v-model:value="editLiuYan.UserQQ" type="text" placeholder="你的qq">
                        </div>
                        <div>
                            <input v-model:value="editLiuYan.UserNickName" type="text" :disabled="isreturn"
                                   placeholder="昵称">
                        </div>
                        <div id="liuyan-email">
                            <input v-model:value="editLiuYan.UserEmail" type="email" :disabled="isreturn"
                                   placeholder="你的邮箱(必填)">
                        </div>
                        <div id="liuyan-blog">
                            <input v-model:value="editLiuYan.UserBlog" type="text" placeholder="你的博客站点">
                        </div>
                        <div @click="sendLY" id="liuyan-submit">
                            <div> 发布</div>
                        </div>
                    </div>
                </form>
            </div>
            <!--            <div>-->
            <!--                <markdown-it-vue class="md-body" :content="editLiuYan.UserContent"/>-->
            <!--            </div>-->


        </div>
        <div class="liyanye-title">全部留言</div>
        <div id="liuyan-ed-all">
            <div class="ly" v-for="liuyan in liuyans">
                <div class="ly-tx">
                    <img :src="liuyan.user_headimg" alt="">

                    <span class="ly-name" :key="liuyan.liuyan_user_id">
                        <a :href="getBlogAddress(liuyan.user_blog)">{{liuyan.user_name}}<i style="color: #00A000"
                                                                                           v-if="liuyan.user_role=='admin'"
                                                                                           class="el-icon-user-solid"></i></a>
                        <span class="ly-time">{{liuyan.liuyan_time.split('T')[0]}} {{parseInt(liuyan.liuyan_time.split('T')[1].split(':')[0],10)+8}}:{{liuyan.liuyan_time.split('T')[1].split(':')[1]}}</span>
                    </span>
                </div>


                <markdown-it-vue class="md-body" :content="liuyan.liuyan_content"/>


            </div>


        </div>
    </div>
</template>

<script>


    export default {
        name: "liuyan",
        async created() {
            let result = await this.$http.get("/home/findAllLiuyans");
            console.log(result)
            if (result.data.code == 200) {
                this.liuyans = result.data.data;
            } else {
                this.$notify.error(result.data.msg);
            }
        },
        data() {
            return {
                editLiuYan: {
                    UserQQ: '',
                    UserEmail: '',
                    UserBlog: '',
                    UserContent: '',
                    UserNickName: '',
                    UserTX: ''
                },
                incontent: '#ddd',
                liuyans: [],//所有留言
                isreturn: false,//设置获取qq邮箱和网名时的相应
                options: {
                    markdownIt: {
                        linkify: true
                    },
                    linkAttributes: {
                        attrs: {
                            target: '_blank',
                            rel: 'noopener'
                        }
                    }
                }
            }
        },
        methods: {
            getBlogAddress(liuyan) {
                return "http://" + liuyan;
            },

            //发送留言
            async sendLY() {
                if (this.editLiuYan.UserContent === "") {
                    //留言内容为空
                    this.$notify.error("留言内容为空")
                    return false;
                }
                let emailRule = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
                if (!emailRule.test(this.editLiuYan.UserEmail)) {
                    //邮箱格式错误
                    this.$notify.error("邮箱输入错误")
                    return false;

                }

                console.log(this.editLiuYan)
                let result = await this.$http({
                    url: "/home/saveLiuYan",
                    method: 'POST',
                    data: this.editLiuYan,
                });
                console.log(result);
                if (result.data.code === 200) {
                    this.$notify.success("留言成功");
                    this.liuyans = result.data.data;
                    this.editLiuYan = {}
                } else {
                    this.$notify.error(result.data.msg);
                }

            },

            //根据输入qq号获取相关信息
            async getQQtx() {
                if (this.editLiuYan.UserQQ === '') {
                    //https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png
                    this.$refs.UserQQTX.style.backgroundImage = "url(https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png)"
                } else {
                    this.isreturn = true;
                    let result = await this.$http({
                            url: '/home/findQQInfor?qq=' + this.editLiuYan.UserQQ,
                            method: 'get',
                        })
                    ;
                    console.log(result)
                    if (result.data.success === true && result.data !== null) {
                        this.editLiuYan.UserTX = "http://q2.qlogo.cn/headimg_dl?dst_uin=" + this.editLiuYan.UserQQ + "&spec=100";
                        this.editLiuYan.UserNickName = result.data.name;
                        this.editLiuYan.UserEmail = result.data.qemail;
                        this.$refs.UserQQTX.style.backgroundImage = "url(http://q2.qlogo.cn/headimg_dl?dst_uin=" + this.editLiuYan.UserQQ + "&spec=100)"
                        this.isreturn = false;
                    } else {
                        this.$notify.error("获取信息失败");
                        this.isreturn = false;
                    }
                }
            },
        },
    }
</script>

<style scoped lang="less">
    .liyanye-title {
        margin: 20px 0;
        font-size: 25px;
    }

    #liuyan-div {
        width: 100%;

        #liuyan-bar-login {
            width: 100%;
            padding: 15px 0;
            display: flex;
            flex-direction: row;

            #liuyan-tx {
                background-image: url("https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png");
                background-size: cover;
                min-width: 35px;
                height: 35px;
                border-radius: 50%;
                overflow: hidden;

                img {
                    min-width: 35px;
                    height: 35px;
                }

            }

            #liuyan-right {
                box-sizing: border-box;
                overflow: hidden;
                width: 100%;
                padding-left: 15px;
                text-align: center;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;

                input {
                    width: 100px;
                    height: 15px;
                    outline: none;
                    border: none;
                    margin: 5px 20px;
                }

                div {
                    box-sizing: border-box;
                    margin: 5px 5px;
                }

                #liuyan-nickname {

                }

                #liuyan-submit {
                    font-weight: bold;
                }

                #liuyan-submit:hover {
                    cursor: pointer;
                }

            }
        }

        #liuyan-bar-logined {

        }

        #liuyan-editor {


            #editor-bar {

                #editing {
                    min-height: 100px;
                }

                #edited {
                    display: none;
                }


            }
        }
    }

    #liuyan-ed-all {
        box-sizing: border-box;
        width: 100%;

        .ly {
            box-sizing: border-box;
            width: 100%;
            padding: 30px;
            border-top: 1px solid rgb(238, 238, 238);


            .ly-tx {
                margin-bottom: 5px;
                width: 100%;
                height: 35px;
                line-height: 35px;

                img {
                    width: 35px;
                    height: 35px;
                    position: absolute;
                }

                .ly-name {
                    margin-left: 40px;

                    .ly-time {
                        font-size: 14px;
                        margin-left: 20px;
                    }
                }
            }

        }
    }


</style>
