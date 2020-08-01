<template>
    <!--        <div>{{this.$route.params.index}}</div>-->
    <div>
        <div id="detail-title">{{post.post_title}}</div>
        <div id="detail-description">{{post.post_description}}</div>
        <div id="detail-author">{{post.user_name}}--<span>{{post.post_public_time.split('T')[0]}}</span></div>
        <div id="detail-all">
            <markdown-it-vue class="md-body" :content="post.post_content"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'detail',
        async created() {
            let result = await this.$http({
                url: '/home/findPostById?id=' + this.$route.params.index,
                method: 'get',
            });
            console.log(result)
            if (result.data.code == 200) {
                this.post = result.data.post;
            } else {
                this.$message.error("加载失败,请刷新。。。")
            }

        },
        data() {
            return {
                post: {},
            }
        }

    }
</script>

<style scoped lang="less">
    #detail-title {
        border-left: 4px solid #3498db;
        font-weight: bold;
        font-size: 25px;
        padding-left: 10px;
        margin: 5px 0 15px 5px;
    }

    #detail-description {
        padding: 10px;
        font-style: oblique;
    }


</style>
