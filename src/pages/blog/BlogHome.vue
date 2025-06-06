<script setup lang="ts">

import BlogArticles from "@/pages/blog/BlogArticles.vue";
import UserInfoCard from "@/components/UserInfoCard.vue";
</script>

<template>
    <div class="bottom">
        <div class="left">
            <UserInfoCard></UserInfoCard>
        </div>
        <div class="center">
            <BlogArticles></BlogArticles>
        </div>
    </div>
</template>

<style scoped lang="scss">
.bottom {
    display: flex;
    flex-grow: 1;

    div {
        margin: 0 10px;
    }
}

.left {
    max-width: 500px;
}

.center {
    flex-grow: 1;
}
</style>