<template>
    <div>
        <div>
            <div><!--                        <div class="article"></div>-->
                <div v-for="post in posts" @click="toDetail(post.post_id)" class="article-detail"
                     index="post.post_id">
                    <div v-text="post.post_title" class="article-title"></div>
                    <div v-text="post.post_description" class="article-content">
                    </div>
                    <div class="article-date">Posted by <span v-text="post.user_name"></span> on <span
                    >{{post.post_public_time | ToFormatDate}}</span></div>
                </div>
            </div>

        </div>

        <div style="text-align: center;">
            <!--            <el-pagination-->
            <!--                :hide-on-single-page="true"-->
            <!--                :page-size="5"-->
            <!--                :page-count="3"-->
            <!--                :current-page="1"-->
            <!--                layout="prev, pager, next"-->
            <!--                :total="posts.length">-->
            <!--            </el-pagination>-->
        </div>
    </div>
</template>

<script>
    import { formatDate } from '../../plugins/formatDate'

    export default {
        name: 'posts',
        filters: {
            ToFormatDate (time) {
                let date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd')
            }

        },
        data () {
            return {
                posts: []
            }
        },
        async created () {
            let categoryId = this.$route.params.categoryId
            if (categoryId !== null && categoryId !== undefined) {
                let result = await this.$http({
                    url: '/home/findAllPublicPostByCategoryId?id=' + categoryId,
                    method: 'GET'
                })
                console.log(result)
                if (result.data.code === 200) {
                    this.posts = result.data.data
                    console.log(this.posts)
                } else {
                    this.$notify.error('文章加载失败!')
                }
            }
            if (categoryId === null || categoryId === undefined) {
                let result = await this.$http({
                    url: '/home/findAllPosts',
                    method: 'get'
                })
                console.log(result)
                if (result.data.code === 200) {
                    this.posts = result.data.data
                    console.log(this.posts)
                } else {
                    this.$notify.error('文章加载失败!')
                }
            }
        },
        watch: {
            async $route (to, from) {
                let categoryId = this.$route.params.categoryId
                if (categoryId !== null && categoryId !== undefined) {
                    let result = await this.$http({
                        url: '/home/findAllPublicPostByCategoryId?id=' + categoryId,
                        method: 'GET'
                    })
                    console.log(result)
                    if (result.data.code === 200) {
                        this.posts = result.data.data
                        console.log(this.posts)
                    } else {
                        this.$notify.error('文章加载失败!')
                    }
                } else {
                    let result = await this.$http({
                        url: '/home/findAllPosts',
                        method: 'get'
                    })
                    console.log(result)
                    if (result.data.code === 200) {
                        this.posts = result.data.data
                        console.log(this.posts)
                    } else {
                        this.$notify.error('文章加载失败!')
                    }
                }
            }
        },
        methods: {
            toDetail (index) {
                console.log('hello')
                // this.$router.push({path:'/home/detail/'+1})
                this.$router.push({
                    name: 'detail',
                    params: { index: index }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .article-detail {
        box-sizing: border-box;
        width: 100%;


        .article-title {
            text-indent: 2em;
            font-weight: bold;
            margin-top: 30px;
            font-size: 25px;
            margin-bottom: 7px;
        }

        .article-content {
            text-indent: 2em;
            font-size: 14px;
            line-height: 1.7em;

        }

        .article-date {
            text-indent: 0;
            font-style: oblique;
            padding-top: 4px;
        }
    }

    .article-detail:hover {
        cursor: pointer;
    }

    @media screen and (max-width: 800px) {
        .article-detail {


        }
    }
</style>
