<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">返回博客</el-breadcrumb-item>
            <el-breadcrumb-item>总览</el-breadcrumb-item>
        </el-breadcrumb>
        <div id="total-content">
            <div id="content">
                <div class="total-content-tag">
                <el-tag type="success">总文章数：<span>{{postTotal.allPost}}</span></el-tag>
            </div>
            <div class="total-content-tag">
                <el-tag type="warning">草稿：<span>{{postTotal.draft}}</span></el-tag>
            </div>
             <div class="total-content-tag">
                <el-tag type="danger">访问数：{{this.total.caicaitotal}}</el-tag>
            </div>

            <div class="total-content-tag">
                <el-tag>留言数：<span>{{this.total.liuyantotal}}</span></el-tag>
            </div>
            </div>
            <div id="main" style="width: 300px;height:300px;"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "total",
        data() {
            return {
                total: {},
                postTotal:{},
                option: {
                    title: {
                        text: '站点用户访问来源',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: [],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                },
            }
        },
        created() {
            this.findLogcaicaiCity();
            this.findAllLogCaicai();
            this.getTotal();
        },
        methods: {
            async getTotal() {
                let result = await this.$http({
                    url: '/admin/getTotal',
                    method: 'GET'
                })
                console.log(result)
                if (result.data.code === 200) {
                    this.postTotal = result.data.data;
                }
            },
            async findAllLogCaicai() {
                let result = await this.$http({
                    url: '/home/findAllLogCaicai',
                    method: 'GET'
                })
                console.log(result)
                if (result.data.code === 200) {
                    this.total = result.data.data;
                }
            },
            async findLogcaicaiCity() {
                let result = await this.$http({
                    url: '/admin/findLogcaicaiCity',
                    method: 'GET',
                });
                console.log(result)
                if (result.data.code === 200) {
                    for (var i = 0; i < result.data.data.length; i++) {
                        let tem = {value: 0, name: ''};
                        tem.value = parseInt(result.data.data[i].total);
                        tem.name = result.data.data[i].logcaicai_city;
                        this.option.series[0].data.push(tem);
                    }
                    this.draw();
                }
            },
            draw() {
                var myChart = this.$echarts.init(document.getElementById('main'))
                myChart.setOption(this.option);
            },
        },
    }
</script>

<style scoped lang="less">
    #total-content {
        height: 200px;
        width: 500px;
        box-sizing: border-box;
        padding: 5px;
        font-size: 16px;
        margin-top: 5px;

        #content{
            display: flex;
            flex-direction: row;

            .total-content-tag {
                margin: 10px 10px;
                display: flex;
            }
        }

    }


</style>
