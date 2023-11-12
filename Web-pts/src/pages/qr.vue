<template>
    <div id="qr" class="page">
        <el-row>
            <el-col :span="24">
                {{valueMap}}
                <el-card class="card">
                    <div slot="header" class="title" >动物基本信息表单</div>
                    <el-form :model="an" label-width="80px">
                        <el-form-item v-for="(value, key) in an" :label="key" :key="key">
                            <el-input v-model="an[key]">
                            </el-input>
                        </el-form-item>
                    </el-form>
<!--                    <el-form :model="an" label-width="80px">

                        <el-form-item
                            v-for="(value, key) in an"
                            :label="valueMap[key]"
                            :key="key"
                        >
                            <el-input v-model="an[key]"></el-input>
                        </el-form-item>
                    </el-form>-->
                        <div slot="default" class="end"  style="color: #2d2f33;font-size: 25px;text-align: center">严谨质检信息页面！</div>
                </el-card>
            </el-col>
        </el-row>
    </div>

</template>

<script setup>


import axios from "axios";
export default {
    name: "qr",
    data(){
        return{
            an: {},
            valueMap: {
                key: {
                    key1: '属性',
                    key2: '金',
                    key3: '木',
                    key4: '水',
                    key5: '火',
                    key6: '土',
                    key7: '1',
                    key8: 'm',
                    key9: '9'
                },
                value: {

                }
            }
        }
    },
    created() {
    //     animalId 路由跳转可以获取页面的携带参数
        var aId=this.$route.query.animalId;
        // alert(aId);
        // axios.get("http://172.16.14.91:9999/animal/findById?animalId="+aId)
        axios.get("http://192.168.1.7:9999/animal/findById?animalId="+aId)
            .then(resp =>{
               this.an=resp.data.data;
            })

        this.dynamicFormLabels();

    },
    methods: {
        getMappedLabel(key) {
            if (this.valueMap.hasOwnProperty(key)) {
                return this.valueMap[key];
            } else {
                return key;
            }
        },
        dynamicFormLabels() {
            console.log("Hello world")
            const labels = {};
            for (const key in this.an) {
                labels[key] = this.getMappedLabel(key);
            }
            return labels;

        }
    }
};
</script>


<style >
.page {
    background-color: #607797;
    padding: 20px;
}

.card {
    background-color: #83c1ba;
}

.title {
    background-color: #409EFF;
    color: #fff;
    padding: 10px;
    font-size: 30px;
    text-align: center;
}
</style>
