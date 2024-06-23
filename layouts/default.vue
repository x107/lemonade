<script setup lang="ts">
import { useCheckLoggedIn } from '~/composables/useCheckLoggedIn';
const { isLoggedIn, isPending } = useCheckLoggedIn();

</script>
<template>

    <div class="overflow-hidden h-screen">
        <Header :isLoggedIn="isLoggedIn" :isLoginPending="isPending" />

        <div class="h-full overflow-scroll">
            <div class="max-w-4xl mx-auto">
                <slot />
            </div>

        </div>
    </div>

</template>