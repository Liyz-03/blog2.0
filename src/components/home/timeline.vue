<template>
    <div>
        <div id="time-title">博客日志</div>
        <el-timeline>
            <el-timeline-item v-for="item in lineData" :timestamp="item.log_time.split('T')[0]" placement="top">
                <el-card>
                    <h4>{{item.log_content}}</h4>
                </el-card>
            </el-timeline-item>

        </el-timeline>
    </div>
</template>

<script>
    export default {
        name: 'timeline',
        async created () {
            let result = await this.$http({
                url: '/home/findAllLog',
                method: 'GET'
            })
            console.log(result.data)
            if (result.data.code == 200) {
                this.lineData = result.data.data
            } else {
                this.$notify.error('获取失败')
            }
        },
        data () {
            return {
                lineData: []
            }
        }
    }
</script>

<style scoped>
    #time-title {
        margin: 20px 0;
        font-size: 25px;

    }

</style>
