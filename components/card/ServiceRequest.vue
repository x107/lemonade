<script setup lang="ts">
import { format, toDate, formatDistanceToNow } from 'date-fns';
import type { QuickViewServiceRequest, quickViewServiceRequestKeys } from '~/models/ServiceRequest';
import { severityLabels } from '~/models/ServiceRequest';
defineProps<{
    request: QuickViewServiceRequest;
}>();

function getParsedDate(date: string | Date) {
    return format(toDate(date), "dd/MM/yyyy")
}

function getHumanDateDistance(date: string | Date) {
    return formatDistanceToNow(toDate(date), { addSuffix: true });
}
</script>
<template>
    <div class="grid grid-cols-3 items-center gap-y-2 bg-gray-10 border border-4 rounded px-6 py-4">
        <div class="col-span-3">
            <span class="font-medium text-sm md:text-md text-gray-500">#{{ request.id }}</span>
        </div>
        <div class="col-span-3">
            <span class="text-3xl font-medium line-clamp-1">"{{ request.name }}"</span>
        </div>
        <div class="col-span-3 md:col-span-1">
            <span class="text-sm md:text-lg font-medium text-gray-500">Created on {{ getParsedDate(request.creationDate)
                }}</span>
        </div>
        <div class="col-span-3 md:col-span-2">
            <span class="text-sm md:text-lg md:text-right w-full block font-medium text-gray-900">Resolved by <u>{{
                getParsedDate(request.resolutionDate!)
                    }}</u> <span class="hidden lg:block">{{
                        getHumanDateDistance(request.resolutionDate!) }}</span> </span>
        </div>
        <div class="col-span-3" />
        <div class="col-span-1 md:order-1">
            <span class="text-sm md:text-md lg:text-lg font-semibold py-2 px-2 rounded-md uppercase w-32 w-full block"
                :class="{
                    'bg-red-500': request.severity === 'high',
                    'bg-yellow-500': request.severity === 'medium',
                    'bg-green-500': request.severity === 'low',
                }">{{
                    severityLabels[request.severity] }}</span>
        </div>
        <div class="col-span-2">
            <span class="text-right md:text-left block w-full">{{ request.reporterLocation }}</span>
        </div>
    </div>
</template>