<script setup lang="ts">
import { useAuth } from '#imports'
const { isLoggedIn, isPending } = useAuth();

</script>
<template>
    <div class="max-w-4xl mx-auto pt-10 pb-52">
        <div class="pt-10 text-center">
            <AmplifyAuthenticator v-if="!isLoggedIn" />
            <NuxtLink v-if="!isPending && isLoggedIn" to="/requests">
                <button class="btn-primary">See Requests</button>
            </NuxtLink>
        </div>
    </div>
</template>