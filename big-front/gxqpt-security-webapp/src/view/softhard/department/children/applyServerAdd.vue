<template>
    <div class="ivu-layout serviceDetail">
        <h2>资源需求配置</h2>
        <specificInfo style="margin-top:30px;"></specificInfo>
        <!-- <Card :bordered="false">
            <p slot="title">审批意见：</p>
            <div class="comment" style="text-align:center">
                <ul>
                    <li><span>2018.07.03 15：33：21</span>管理员已同意求。同意意见：资源申请合理</li>
                    <li><span>2018.07.03 15：33：21</span>高新翼云提交资源需求</li>
                </ul>
            </div>
        </Card> -->
    </div>
</template>

<script>
import specificInfo from './../../common/specificInfo'
export default {
    data(){
        return{
        }
    },
    components: {
        specificInfo
    },
}
</script>

<style lang='less' scoped>
.serviceDetail{
    background:#eee;
    padding: 20px;
    width:80%;
    height:auto;
}
.comment{
    ul{
        list-style: none;
        li{
            text-align: left;
        }
    }
}
</style>
