<script setup lang="ts">
import {onMounted, ref} from "vue";
import request from "@/utils/request.js";
import {RefreshRight} from "@element-plus/icons-vue";

const articleData = ref<UserInfo[]>([])
const loading = ref<boolean>(false);

const loadData = async () => {
    if (loading.value) {
        return;
    }
    loading.value = true;
    const data = await request.get("/auth/users") as ApiResponse<UserInfo[]>
    articleData.value = data.data
    loading.value = false;
}

onMounted(loadData)
</script>

<template>
    <div class="container">
        <el-button type="primary" @click.prevent.stop="loadData" class="flush" :loading="loading" :icon="RefreshRight">
            刷新数据
        </el-button>
        <el-table :data="articleData">
            <el-table-column prop="id" label="用户ID"></el-table-column>
            <el-table-column prop="username" label="用户名"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column label="注册日期">
                <template #default="scope">
                    {{ new Date(scope.row.registerTime).toLocaleString() }}
                </template>
            </el-table-column>
            <el-table-column label="最后登录日期">
                <template #default="scope">
                    {{ new Date(scope.row.lastLoginTime).toLocaleString() }}
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