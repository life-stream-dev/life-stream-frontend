<script setup lang="ts">

import AdminSidebar from "@/pages/admin/AdminSidebar.vue";
</script>

<template>
    <el-container class="container">
        <el-aside width="170px">
            <AdminSidebar></AdminSidebar>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<style scoped lang="scss">
.container {
    height: 100%;
}
</style>