<script setup lang="ts">

</script>

<template>
    <div class="header">
        <div class="left">
            <span>LifeStream</span>
            <div class="nav-bar">
                <router-link to="/">首页</router-link>
                <router-link to="/article">文章</router-link>
            </div>
        </div>
        <div class="right"></div>
    </div>
</template>

<style scoped lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    background-color: var(--front-bg-color);
    padding: 0 250px;
    flex-grow: 1;
    min-height: 50px;
}

span {
    font-size: 1.5rem;
}

.left {
    display: flex;
    align-items: center;
}

.left * {
    margin: 0 10px;
    color: var(--text-color);
    text-decoration: none;
}

.nav-bar {
    display: flex;
    margin: 0 10px;
    height: 100%;
}

.nav-bar * {
    height: 100%;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.nav-bar *:hover {
    background-color: var(--front-bg-color-hover);
}

</style>