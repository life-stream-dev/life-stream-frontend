<script setup lang="ts">
import {Cpu, Edit, Reading, User} from "@element-plus/icons-vue";
import UserInfo from "@/components/UserInfo.vue";
</script>

<template>
    <div class="sidebar">
        <span>LifeStream</span>
        <el-menu class="sidebar-menu">
            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <reading></reading>
                    </el-icon>
                    <span>博客管理</span>
                </template>
                <el-sub-menu index="1-1">
                    <template #title>
                        <el-icon>
                            <edit></edit>
                        </el-icon>
                        <span>文章管理</span>
                    </template>
                    <el-menu-item-group>
                        <router-link to="/admin">文章列表</router-link>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <router-link to="/admin/addArticle">添加文章</router-link>
                    </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="1-2">
                    <template #title>
                        <el-icon>
                            <user></user>
                        </el-icon>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item-group>
                        <router-link to="/admin/users">用户列表</router-link>
                    </el-menu-item-group>
                </el-sub-menu>
            </el-sub-menu>
            <el-sub-menu index="2">
                <template #title>
                    <el-icon>
                        <cpu></cpu>
                    </el-icon>
                    <span>家具管理</span>
                </template>
                    <el-menu-item-group>
                        <router-link to="/admin/devices">家具管理</router-link>
                    </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
        <div class="user-info">
            <UserInfo></UserInfo>
        </div>
    </div>
</template>

<style scoped lang="scss">
.sidebar {
    display: flex;
    flex-direction: column;
    height: 100%;
    --el-menu-text-color: white;
    --el-menu-hover-bg-color: var(--front-bg-color-hover);
    --el-menu-bg-color: var(--front-bg-color);
    background-color: var(--front-bg-color);
    min-width: 170px;

    > span:first-child {
        font-size: 1.5rem;
    }

    a {
        color: white;
        text-decoration: none;
    }
}

.sidebar-menu {
    color: #fff;
    border: none;
    flex-grow: 1;
}

.left {
    display: flex;
    align-items: center;
}
</style>