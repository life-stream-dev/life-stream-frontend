<script setup lang="ts">
import {computed} from 'vue'
import {marked} from 'marked'

const props = defineProps<{
    content: string
}>()

const processedContent = computed(() => {
    return marked.parse(props.content);
})
</script>

<template>
    <div class="container" v-html="processedContent"></div>
</template>

<style scoped>

.container {
    text-align: left;
    font-size: 1rem;
    line-height: 1.5;
}

</style>