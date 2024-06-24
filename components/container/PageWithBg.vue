<script setup lang="ts">
const { getUrl } = useStorage();

const bgUrl = ref<URL | null>(null);

onMounted(async () => {
    bgUrl.value = await getUrl('public/bg.jpg');
});
</script>
<template>
    <div class="relative h-full">
        <div class="relative z-10">
            <slot />
        </div>
        <img v-if="bgUrl" :src="bgUrl.href" class="z-0 absolute inset-0 w-full h-full object-cover blur-lg" />
    </div>
</template>