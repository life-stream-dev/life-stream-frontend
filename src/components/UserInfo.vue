<script setup lang="ts">
import {useAuthStore} from "@/store/auth.js";
import {CircleCloseFilled, HomeFilled} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
</script>

<template>
    <div class="container">
        <el-avatar shape="circle" :size="50">
            {{ authStore.username }}
        </el-avatar>
        <div class="right">
            <el-row>
                <el-col :span="24">
                    <span>{{ authStore.username }}</span>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-button @click.prevent.stop="router.push('/')" :icon="HomeFilled" type="primary"></el-button>
                </el-col>
                <el-col :span="12">
                    <el-button @click.prevent.stop="authStore.logout(); router.push('/')" :icon="CircleCloseFilled"
                               type="danger"></el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<style scoped lang="scss">

.container {
    display: flex;
    margin: 5px;
}

.right {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
}

</style>