<script setup lang="ts">

import {ref} from "vue";
import {Check} from "@element-plus/icons-vue";
import request from "@/utils/request.js";
import {showSuccess} from "@/utils/message.js";

const title = ref("");
const content = ref("");

const saveArticle = async () => {
    const res = await request.post("/blog/articles", {
        title: title.value,
        content: content.value
    }) as ApiResponse<number>;
    if (res.status) {
        showSuccess("文章创建成功");
    }
}

</script>

<template>
    <div class="add-container">
        <el-row>
            <span>新建博客</span>
        </el-row>
        <el-row>
            <el-input v-model="title" placeholder="请输入文章标题"></el-input>
        </el-row>
        <el-row>
            <el-input v-model="content" type="textarea" placeholder="请输入内容" :rows="10" autosize></el-input>
        </el-row>
        <el-row>
            <el-button :icon="Check" type="primary" @click.stop.prevent="saveArticle">保存</el-button>
        </el-row>
    </div>
</template>

<style scoped lang="scss">
span {
    font-size: 1.5rem;
    text-align: left;
}

.add-container {
    margin: 20px;
    display: flex;
    flex-direction: column;
}

.el-input {
    max-width: 500px;
    max-height: 75px;
}

.el-row {
    margin-bottom: 20px;
}
</style>