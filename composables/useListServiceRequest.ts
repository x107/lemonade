import type { AsyncDataRequestStatus } from '#app';
import type { QuickViewServiceRequest } from '~/models/ServiceRequest';

export const useListServiceRequest = () => {

    const client = useNuxtApp().$Amplify.GraphQL?.client;

    const status = ref<AsyncDataRequestStatus>();
    const items = ref<QuickViewServiceRequest[]>([]);

    const nextPage = ref<string | null | undefined>();
    const hasMore = computed(() => nextPage.value !== null);

    const unsubscribe = client?.models.Request.onCreate().subscribe({
        next: (item) => {
            items.value = [mapItem(item), ...items.value];
        }
    });

    onUnmounted(() => {
        unsubscribe?.unsubscribe();
    });

    async function listRequests() {
        try {
            status.value = 'pending';
            const { data, nextToken } = await client.models.Request.list({
                selectionSet: ['id', 'name', 'severity', 'creationDate', 'resolutionDate', 'reporterLocation'],
                limit: 10,
                nextToken: nextPage.value
            });

            items.value = [...items.value, ...data.map(mapItem)];

            nextPage.value = nextToken;

            status.value = 'success';
        } catch (error) {
            console.error(error);
            status.value = 'error';
        }
    }

    function mapItem(item: any): QuickViewServiceRequest {
        return {
            ...item,
            creationDate: new Date(item.creationDate),
            resolutionDate: new Date(item.resolutionDate),
        };
    }

    return {
        status,
        items,
        listRequests,
        hasMore,
    }
}