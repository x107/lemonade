import type { AsyncDataRequestStatus } from '#app';
import type { CreateServiceRequestInput } from '~/models/ServiceRequest';
import { toDate, format } from "date-fns";

export const useCreateServiceRequest = () => {

    const client = useNuxtApp().$Amplify.GraphQL.client;
    const status = ref<AsyncDataRequestStatus>();

    async function createRequest(input: CreateServiceRequestInput) {
        try {
            status.value = 'pending';
            await client.models.Request.create({
                ...input,
                creationDate: format(toDate(input.creationDate), "yyyy-MM-dd"),// input.creationDate.toISOString().split('T')[0],
                resolutionDate: format(toDate(input.resolutionDate!), "yyyy-MM-dd")
            });

            status.value = 'success';
        } catch (error) {
            console.error(error);
            status.value = 'error';
        }

        return status.value === 'success'
    };

    return {
        status,
        createRequest
    }
}