<script setup lang="ts">
import {useAuthStore} from "@/store/auth.js";

const authStore = useAuthStore();
</script>

<template>
    <div v-if="authStore.isLogin">
        <div class="container">
            <el-avatar shape="circle" :size="60">
                {{ authStore.username }}
            </el-avatar>
            <span>{{ authStore.username }}</span>
            <router-link to="/admin">
                <el-button>
                    管理中心
                </el-button>
            </router-link>
            <router-link to="">
                <el-button @click.prevent.stop="authStore.logout">退出登录</el-button>
            </router-link>
        </div>
    </div>
    <div v-else>
        <div class="container">
            <el-avatar shape="circle" :size="60">未登录</el-avatar>
            <router-link to="/login">
                <el-button>登录</el-button>
            </router-link>
            <router-link to="/register">
                <el-button>注册</el-button>
            </router-link>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    background-color: var(--front-bg-color);
    max-height: 250px;
    width: 250px;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 20px 0;
}

.container a {
    width: 100%;
    height: 30px;
    margin: 5px 0 !important;
    color: black;
    text-decoration: none;

    .el-button {
        width: 80%;
        height: 30px;
        margin: 5px 0 !important;
    }
}
</style>