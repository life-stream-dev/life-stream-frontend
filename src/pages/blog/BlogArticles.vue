<script setup lang="ts">
import {onMounted, ref} from "vue";
import request from "@/utils/request.js";

const articleData = ref<Article[]>([])

onMounted(async () => {
    const data = await request.get("/blog/articles") as ApiResponse<Article[]>
    articleData.value = data.data
})
</script>

<template>
    <div class="container">
        <div class="item" v-for="item in articleData">
            <img src="" alt="">
            <div class="info">
                <span class="title"><router-link :to="'article/' + item.id">{{ item.title }}</router-link></span>
                <span class="content">{{ item.content.split("\n")[0] }}</span>
                <span class="time">{{ new Date(item.createTime).toLocaleDateString() }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

.container {
    display: flex;
    flex-direction: column;
}

.info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 25px;
    text-align: left;

    .title {
        font-weight: bold;
        line-height: 1.125;
        font-size: 1.5rem;
        margin-bottom: 10px;

        a {
            color: white;
            text-decoration: none;
        }
    }

    .content {
        font-size: 0.9rem;
        line-height: 1.5;
        margin-bottom: 10px;
    }

    .time {
        font-weight: bold;
        font-size: 0.8rem;
    }
}

.item {
    background-color: var(--front-bg-color);
    margin-bottom: 20px;
    border-radius: 20px;
}

.item img {
    min-height: 200px;
    user-select: none;
}

</style>