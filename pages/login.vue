<script setup lang="ts">
const { isLoggedIn, isPending } = useCheckLoggedIn();

</script>
<template>
    <div class="max-w-4xl mx-auto pt-10 pb-52">
        <div class="pt-10">
            <AmplifyAuthenticator v-if="!isLoggedIn" />
            <span v-if="!isPending && isLoggedIn">You are logged in</span>
        </div>
    </div>
</template>