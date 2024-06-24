<template>
    <div class="max-w-3xl lg:max-w-4xl mx-auto pt-10 pb-52">
        <div class="pt-10">
            <div class="flex flex-col md:flex-row items-center gap-y-10 justify-between mb-10">
                <span class="page-heading">
                    List of Service Requests
                </span>
                <NuxtLink to="/requests/create">
                    <button class="btn-primary btn-compact">New Request</button>
                </NuxtLink>
            </div>

            <TableListServiceRequest />
        </div>
    </div>
</template>