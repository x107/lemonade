<script setup lang="ts">
import { useAuth } from '#imports';
const { isLoggedIn, logout } = useAuth();

</script>
<template>
    <div class="overflow-hidden h-screen">
        <Header :isLoggedIn="isLoggedIn" :logout="logout" />
        <div class="h-full overflow-auto bg-zinc-50">
            <slot />
        </div>
    </div>
</template>