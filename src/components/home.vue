<template>
    <div id="home">
        <div id="letf-nav">
            <el-drawer
                id="drawer"
                :modal="true"
                :visible.sync="drawer"
                :with-header="false"
                direction="ltr"
                size="55%">
                <!--选择-->

                <div id="sider-select">
                    <!--                    <GeminiScrollbar-->
                    <!--                        class="my-scroll-bar" :autoshow="true">-->
                    <router-link to="/admin/login" style="color: inherit">
                        <div id="header-log-2">
                        </div>
                    </router-link>
                    <router-link to="/home/index" style="color: inherit">
                        <div class="sider-title">首页</div>
                    </router-link>
                    <!--                        <div class="sider-title" style="margin-bottom: 0">分类</div>-->
                    <div class="sider-content" style="font-size: 20px">
                        <span v-for="category in categorys"><router-link :to="getDetailAddress(category)"
                                                                         style="color: inherit">{{category.category_name}}</router-link></span>
                    </div>
                    <router-link to="/home/timeline" style="color: inherit">
                        <div class="sider-title">节点</div>
                    </router-link>
                    <router-link to="/home/liuyan" style="color: inherit">
                        <div class="sider-title">留言</div>
                    </router-link>
                    <div>
                        <!--                            <div class="sider-title">累计</div>-->
                        <div class="sider-content">
                            <span>被踩: <span v-text="this.caicai"></span></span>
                            <span>留言: {{liuyanTotal}}</span>
                        </div>
                    </div>
                    <div>
                        <div class="sider-title">|关于|</div>
                        <div class="sider-content">
                            <span>{{words}}</span>
                            <span id="sider-icon-1">
                                <span><a href="tencent://message/?uin=1970782037&Site=&Menu=yes"><i style="margin-left: 18px" class="fa fa-qq" aria-hidden="true"></i></a></span>
                                    <span><i class="fa fa-envelope" aria-hidden="true"></i></span>
                                    <span><i style="font-size: 24px" class="fa fa-github" aria-hidden="true"></i></span>
                                </span>
                        </div>
                    </div>
                    <!--                    </GeminiScrollbar>-->
                    <div class="ph-blog-footer">
                        <div class="ph-ending">
                            <div><span>Copyright </span>
                                <i class="fa fa-copyright" aria-hidden="true"></i>
                                <span>2020 Liyz </span>
                            </div>
                        </div>
                        <div><span> <a href="http://beian.miit.gov.cn/">蜀ICP备20005340号</a></span></div>
                    </div>
                </div>

            </el-drawer>
        </div>
        <div id="blog-header">
            <div id="header-log">
                <router-link style="display: block;width:100%;height:100%;font-size: 18px;color: inherit"
                             to="/admin/login">
                    <!--                <img src="../assets/QQ头像.gif" alt="">-->
                </router-link>
            </div>
            <div id="header-right">
                <div id="header-nav-bar-phone">
                    <i @click="drawer = true" class="fa fa-bars" aria-hidden="true"></i>
                </div>
                <div id="header-input-search">
                    <input placeholder="search..." id="header-input-search-content" type="text">
                    <i id="search" class="el-icon-search"></i>
                </div>
                <div id="header-nav-bar">
                    <ul id="bars">
                        <li>
                            <router-link style="font-size: 18px;color: inherit" to="/home/index">首页</router-link>
                        </li>
                        <li>
                            <router-link style="font-size: 18px;color: inherit" to="/home/timeline">节点</router-link>
                        </li>
                        <li>
                            <router-link style="font-size: 18px;color: inherit" to="/home/liuyan">留言</router-link>
                        </li>

                    </ul>
                </div>

                <div @click="switchColor" id="header-switch">
                    <i id="sun" class="el-icon-moon"></i>
                    <!--                    <i id="moon" class="el-icon-moon"></i>-->
                </div>
            </div>
        </div>

        <div id="blog-bottom">
            <div id="blog-sider">
                <GeminiScrollbar
                    class="my-scroll-bar" :autoshow="true">
                    <div class="blog-sider">
                        <div class="sider-title">分类</div>
                        <div class="sider-content">
                            <span v-for="category in categorys"><router-link :to="getDetailAddress(category)"
                                                                             style="color: inherit">{{category.category_name}}</router-link></span>
                        </div>
                        <div>
                            <div class="sider-title">累计</div>
                            <div class="sider-content">
                                <span>被踩: <span v-text="this.caicai"></span></span>
                                <span>留言: {{liuyanTotal}}</span>
                            </div>
                        </div>
                        <div>
                            <div class="sider-title">关于</div>
                            <div class="sider-content">
                                <span>{{words}}</span>
                                <div id="sider-icon">
                                    <span><a href="tencent://message/?uin=1970782037&Site=&Menu=yes"><i class="fa fa-qq" aria-hidden="true"></i></a></span>
                                    <span><i class="fa fa-envelope" aria-hidden="true"></i></span>
                                    <span><i style="font-size: 20px" class="fa fa-github" aria-hidden="true"></i></span>
                                </div>
                            </div>
                        </div>
                        <div class="blog-footer">
                            <div class="ending">
                                <div><span>Copyright </span>
                                    <i class="fa fa-copyright" aria-hidden="true"></i>
                                    <span>2020 Liyz </span>
                                </div>
                            </div>
                            <div><span><a href="http://beian.miit.gov.cn/">蜀ICP备20005340号</a></span></div>
                        </div>
                    </div>
                </GeminiScrollbar>
            </div>
            <GeminiScrollbar
                class="my-scroll-bar" :autoshow="true">
                <div id="blog-content">
                    <router-view/>
                </div>
            </GeminiScrollbar>
        </div>

    </div>
</template>

<script>


    export default {
        // watch: {
        //     async $route(to, from) {
        //         let categoryId = this.$route.params.categoryId;
        //         //发送分类id获取对应分类的所有文章
        //         if (categoryId !== null) {
        //             let result = await this.$http({
        //                 url: '/home/findAllPostsByCategoryId?id=' + categoryId,
        //                 method: 'GET'
        //             });
        //             console.log(result)
        //             if(result.data.code === 200){
        //                 this.
        //             }
        //         }
        //
        //     }
        // },
        created: async function () {


            let wordsResult = await this.$http({
                url:'/home/findMywords',
                method:'GET'
            });
            console.log(wordsResult);
            if(wordsResult.data.code === 200){
                this.words = wordsResult.data.data.mywords_content;
            }

            //访问记录
            let isVisiting = window.sessionStorage.getItem("ISVISITING");
            if (isVisiting === null) {
                let result = await this.$http({
                    url: '/home/setALogCaicai',
                    method: 'post',
                    data: {
                        'ip': returnCitySN["cip"],
                        'city': returnCitySN["cname"],
                        'browser': navigator.userAgent
                    }
                });
                console.log(result)
                if (result.data.code === 200) {
                    window.sessionStorage.setItem("ISVISITING", "YES")
                }
            }
            //获得统计人数
            let ResultCaicai = await this.$http({
                url: '/home/findAllLogCaicai',
                method: 'get'
            });
            console.log(ResultCaicai)
            if (ResultCaicai.data.code === 200) {
                this.caicai = ResultCaicai.data.data.caicaitotal;
                this.liuyanTotal = ResultCaicai.data.data.liuyantotal
            } else {
                this.$notify.error('获得统计人数失败！');
            }
            //获取分类
            let ResultCatagory = await this.$http({
                url: '/home/findAllCategorys',
                method: 'get'
            })
            console.log(ResultCatagory)
            if (ResultCatagory.data.code === 200) {
                this.categorys = ResultCatagory.data.data;
            } else {
                this.$notify.error("获取分类失败");
            }

        },
        mounted() {

        },
        name: 'home',
        data() {
            return {
                caicai: 0,
                visible: false,
                value: true,
                drawer: false,
                activeName: 'first',
                liuyanTotal: 0,
                categorys: [],
                words:'',
            }
        }
        ,
        methods: {
            //获取分类跳转地址
            getDetailAddress(category) {
                return "/home/index/" + category.category_id;
            },
            ///home/index/{category.category_id}

            switchColor() {
                //#sider-select
                let ESun = document.querySelector("#sun");
                let ESunClass = ESun.getAttribute("class");
                let EHome = document.querySelector("#home");
                let body = document.querySelector("#app");
                let ESelect = document.querySelector("#sider-select");
                console.log(body);
                if (ESunClass == "el-icon-sunny") {
                    //现在时夜晚
                    ESun.setAttribute("class", "el-icon-moon");
                    body.style.backgroundColor = 'white';
                    EHome.style.backgroundColor = 'white';
                    EHome.style.color = 'black';
                    ESelect.style.color = 'black';
                } else {
                    //现在时白天
                    ESun.setAttribute("class", "el-icon-sunny");

                    body.style.backgroundColor = 'rgb(79,79,79)';
                    EHome.style.backgroundColor = 'rgb(79,79,79)';
                    ESelect.style.backgroundColor = 'rgb(79,79,79)';
                    EHome.style.color = 'white';
                    ESelect.style.color = 'white';
                }
            }
            ,
        }
    }
    ;
</script>

<style scoped lang="less">
    #home {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        width: 70%;
        height: 100vh;
        overflow: hidden;
        transition: .5s;


        /*主题颜色*/
        background-color: rgb(255, 255, 255);
        color: black;

        /*星空*/

        #night {
            width: 100%;
        }

        /*左侧抽屉*/


        /*移动端左侧导航栏*/

        #letf-nav {

            #drawer {
                height: 100%;
                text-align: center;

            }

            #sider-select {
                box-sizing: border-box;
                padding-top: 50px;
                width: 100%;
                height: 98vh;
                text-align: center;
                overflow-y: scroll;

                #header-log-2 {
                    display: block;
                    width: 50px;
                    height: 50px;
                    margin: 0 auto 20px auto;
                    border-radius: 50%;
                    background-image: url("../assets/QQ头像.gif");
                    background-repeat: round;

                }

                .sider-title {
                    box-sizing: border-box;
                    font-size: 20px;
                    margin: 15px 0;
                }

                .sider-content {
                    font-size: 16px;
                    display: flex;
                    flex-wrap: wrap;
                    flex-direction: column;

                    #sider-icon-1 {
                        letter-spacing: 1em;
                        margin-top: 5px;
                        text-align: center;
                        font-size: 20px;
                    }

                    #sider-icon span:hover {
                        cursor: pointer;
                    }

                    span {
                        padding: 5px 0;
                    }

                    .fl-link:hover {
                        cursor: pointer;
                    }
                }

                .ph-blog-footer {
                    margin: 5px 0;
                    font-size: 14px;

                    .ph-ending {
                        padding-bottom: 5px;
                    }
                }
            }


        }

        /*头部*/

        #blog-header {
            box-sizing: border-box;
            width: 100%;
            height: 60px;
            display: flex;
            flex-direction: row;

            #header-log {
                display: block;
                width: 68px;
                height: 100%;
                background-image: url("../assets/QQ头像.gif");
                background-repeat: round;

            }

            #header-log:hover {

            }

            /*头部右边*/

            #header-right {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;

                /*导航栏*/

                #header-nav-bar {
                    height: 25px;

                    #bar {
                        font-size: 15px;
                    }
                }

                #header-nav-bar-phone {
                    width: 75px;
                    display: none;
                    box-sizing: border-box;
                    text-align: center;
                    line-height: 100%;

                    #header-nav-phone-bun {
                        width: 50px;
                        text-align: center;
                    }


                }

                /*头部搜索框*/

                #header-input-search {
                    position: relative;
                    top: 2px;
                    box-sizing: border-box;
                    padding-left: 10%;
                    flex: 20%;
                    text-align: center;
                    display: flex;
                    flex-direction: row;

                    input {
                        flex: 70%;
                        border: 0px solid;
                        transition: .5s;
                        background-color: transparent;
                    }

                    input:focus {
                        outline: none;
                    }

                    #search {
                        box-sizing: border-box;
                        flex: 20%;
                        display: block;
                        font-size: 20px;
                        position: relative;
                        top: -1px;
                        border: 5px solid transparent;
                    }

                    #search:hover {
                        cursor: pointer;
                    }
                }

                /*头部导航栏*/

                #header-nav-bar {
                    flex: 60%;


                    ul {
                        width: 100%;
                        display: flex;
                        flex-direction: row;

                        li {
                            flex: 10%;
                            text-align: center;
                        }
                    }
                }

                /*移动端的导航栏*/

                #header-nav-bar-phone {
                    font-size: 24px;
                    border: 5px solid transparent;

                    i {
                        display: block;
                    }
                }

                #header-nav-bar-phone:hover {
                    cursor: pointer;
                }

                /*白天夜晚切换*/

                #header-switch {
                    flex: 10%;
                    text-align: center;
                    transition: .5s;
                    font-size: 21px;

                    i {
                        position: relative;
                        top: 1px;
                    }

                }

                #header-switch:hover {
                    cursor: pointer;
                }

            }
        }


        /*首页左边导航*/

        #blog-bottom {
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            overflow: hidden;


            #blog-sider {
                box-sizing: border-box;
                flex: 25%;
                width: 25%;
                height: 95%;
                border-right: none;


                .blog-sider {


                    .sider-title {
                        overflow: hidden;
                        width: 100%;
                        text-align: left;
                        border-left: 3px solid #3498db;
                        margin: 20px 0px 20px 0px;
                        padding-left: 10px;
                        font-size: 20px;
                        transition: .5s;
                    }

                    .sider-content {
                        margin-left: 15px;
                        font-size: 16px;
                        display: flex;
                        flex-direction: column;

                        span {
                            margin: 5px 0;
                        }

                        .fl-link:hover {
                            cursor: pointer;
                        }

                        #sider-icon {
                            letter-spacing: 1em;
                            margin-top: 5px;
                        }

                        #sider-icon span:hover {
                            cursor: pointer;
                            transform: scale(2);
                        }
                    }

                    .blog-footer {
                        margin: 5px 0;
                        font-size: 12px;

                        .ending {
                            margin-bottom: 5px;
                        }
                    }
                }


            }

            #blog-content {
                flex: 75%;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                /*padding-bottom: 90px;*/
            }
        }

    }

    @media screen and (max-width: 600px) {
        #home {
            width: 90% !important;

            #blog-bottom {
                #blog-content {
                    padding-bottom: 10px;
                }

            }

            #blog-sider {
                display: none;
            }

            /*隐藏log*/

            #blog-header #header-log {
                display: none;
            }

            /*改变搜索栏宽度*/

            #blog-header #header-right #header-input-search {
                flex: 40%;
                box-sizing: border-box;
                padding: 0 10px;
            }

            /*响应式的导航栏*/

            #blog-header #header-right #header-nav-bar {
                display: none;
            }

            /*响应式的导航栏*/

            #blog-header #header-right #header-nav-bar-phone {
                text-align: left;
                display: block;
            }
        }

    }


</style>
