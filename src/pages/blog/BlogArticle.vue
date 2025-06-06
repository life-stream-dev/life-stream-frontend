<script setup lang="ts">
import {onMounted, ref} from "vue";
import request from "@/utils/request.js";
import {useRoute} from "vue-router";
import MarkDown from "@/components/MarkDown.vue";

const articleData = ref<Article>({
    content: "",
    id: 0,
    createTime: "",
    title: ""
})

const route = useRoute()

onMounted(async () => {
    const data = await request.get(`/blog/articles/${route.params.id}`) as ApiResponse<Article>
    articleData.value = data.data
})
</script>

<template>
    <MarkDown :content="articleData.content"></MarkDown>
</template>

<style scoped lang="scss">

</style>