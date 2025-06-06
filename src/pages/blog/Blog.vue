<script setup lang="ts">
import BlogHeader from "@/pages/blog/BlogHeader.vue";
</script>

<template>
    <div class="container">
        <BlogHeader></BlogHeader>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
}

.content {
    margin: 20px 250px;
}
</style>