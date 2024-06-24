<script setup lang="ts">
defineProps<{
    isLoggedIn: boolean,
    logout: () => void,
}>()
</script>
<template>
    <header class="h-16 px-10 border-b border-b-4">
        <div class="flex items-center justify-between gap-10 max-w-4xl mx-auto h-full ">
            <NuxtLink to="/">
                <span class="text-3xl">
                    🍋
                </span>
            </NuxtLink>

            <div class="flex gap-4">

                <NuxtLink to="/requests">
                    <button class="btn-primary btn-compact">See Requests</button>
                </NuxtLink>

                <button v-if="isLoggedIn" @click="logout" class="btn-secondary btn-compact">Logout</button>
                <NuxtLink v-else to="/login">
                    <button class="btn-secondary btn-compact">Login</button>
                </NuxtLink>
            </div>
        </div>
    </header>
</template>