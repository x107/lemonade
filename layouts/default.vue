<script setup lang="ts">
import { useCheckLoggedIn } from '~/composables/useCheckLoggedIn';
const { isLoggedIn, isPending } = useCheckLoggedIn();

</script>
<template>
    <div class="overflow-hidden h-screen">
        <Header :isLoggedIn="isLoggedIn" :isLoginPending="isPending" />

        <div class="h-full overflow-auto bg-zinc-50">
            <slot />
        </div>
    </div>

</template>