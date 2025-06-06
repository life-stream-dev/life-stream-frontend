<script setup lang="ts">
import {onMounted, Ref, ref} from "vue";
import request from "@/utils/request.js";
import {showError, showSuccess} from "@/utils/message.js";
import {RefreshRight} from "@element-plus/icons-vue";

const articleData = ref<Article[]>([])
const loading = ref<boolean>(false);

const loadData = async () => {
    if (loading.value) {
        return;
    }
    loading.value = true;
    const data = await request.get("/blog/articles") as ApiResponse<Article[]>
    articleData.value = data.data
    loading.value = false;
}

onMounted(loadData)

const deleteItem = async (data: Article) => {
    const res = await request.delete(`/blog/articles/${data.id}`) as ApiResponse<boolean>
    if (res.status) {
        showSuccess(res.message)
    } else {
        showError(res.message)
    }
    await loadData();
}
</script>

<template>
    <div class="container">
        <el-button type="primary" @click.prevent.stop="loadData" class="flush" :loading="loading" :icon="RefreshRight">
            刷新数据
        </el-button>
        <el-table :data="articleData">
            <el-table-column prop="id" label="文章ID"></el-table-column>
            <el-table-column prop="title" label="文章标题"></el-table-column>
            <el-table-column label="创建时间">
                <template #default="scope">
                    {{ new Date(scope.row.createTime).toLocaleString() }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="danger" @click.prevent.stop="deleteItem(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<style scoped lang="scss">
.container {
    margin: 20px;
    min-width: 900px;
    display: flex;
    flex-direction: column;
}

.flush {
    max-width: 100px;
    margin-bottom: 20px;
}

.el-table {
    --el-table-text-color: white;
    --el-table-header-text-color: white;
    --el-table-header-bg-color: var(--front-bg-color);
    --el-table-bg-color: var(--front-bg-color);
    --el-table-fixed-box-shadow: var(--front-bg-color);
    --el-table-tr-bg-color: var(--front-bg-color);
    --el-table-border-color: var(--front-bg-color);
    --el-table-row-hover-bg-color: var(--front-bg-color-hover);
    border-radius: 20px;
}
</style>