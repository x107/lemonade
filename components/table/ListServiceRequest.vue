<script setup lang="ts">
import { useListServiceRequest } from '~/composables/useListServiceRequest';
const { listRequests, items, status, hasMore } = useListServiceRequest();

onBeforeMount(() => {
    listRequests();
});

</script>
<template>
    <div class="max-w-3xl mx-auto grid grid-cols-1 gap-10 h-full">
        <CardServiceRequest v-for="item in items" :key="item.id" :request="item" />

    </div>

    <div class="max-w-3xl mx-auto pt-10 px-4 md:px-0 ">
        <button v-if="hasMore" :disabled="status === 'pending'" @click="listRequests" class="btn btn-primary w-full">{{
            status
                ===
                'pending' ?
                'Loading...' : 'Load More' }}</button>

        <NuxtLink v-else to="/requests/create">
            No more items <u>Create New Request</u>
        </NuxtLink>
    </div>
</template>