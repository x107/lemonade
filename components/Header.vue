<script setup lang="ts">
defineProps({
    isLoggedIn: Boolean,
    isLoginPending: Boolean,
})

</script>
<template>
    <header class="h-16 px-10 border-b border-b-4">
        <div class="flex items-center justify-between gap-10 max-w-4xl mx-auto h-full">
            <NuxtLink to="/">
                <span class="text-3xl" :class="isLoginPending ? 'animate-spin' : ''">
                    🍋
                </span>
            </NuxtLink>

            <NuxtLink to="/login">Service Request</NuxtLink>
        </div>
    </header>
</template>