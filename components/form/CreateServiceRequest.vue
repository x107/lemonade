<script setup lang="ts">
import { Severity } from '~/amplify/data/enums/severity';
import type { CreateServiceRequestInput } from '~/models/ServiceRequest';
import { serviceRequestInputValidationSchema, serviceRequestDescriptionMaxLength, serviceRequestNameMaxLength, severityLabels } from '~/models/ServiceRequest';
import { useForm } from 'vee-validate';
import { format, toDate } from 'date-fns';
const emit = defineEmits(['submitted'])

import { useCreateServiceRequest } from '~/composables/useCreateServiceRequest';

// Form fields
const { defineField, handleSubmit, errors, resetForm } = useForm<CreateServiceRequestInput>({
    validationSchema: serviceRequestInputValidationSchema,
    initialValues: {
        severity: 'low',
    }
});
const [name] = defineField('name');
const [description] = defineField('description');
const [severity] = defineField('severity');
const [creationDate] = defineField('creationDate');
const [resolutionDate] = defineField('resolutionDate');
const [reporterName] = defineField('reporterName');
const [reporterEmail] = defineField('reporterEmail');
const [reporterLocation] = defineField('reporterLocation');

// Form submission
const { createRequest, status } = useCreateServiceRequest();
async function onValidForm(values: CreateServiceRequestInput) {
    if (await createRequest(values)) {
        emit('submitted');
        resetForm();
    }
}
function onInvalidForm() {
    alert('Invalid form');
}
const onSubmit = handleSubmit(onValidForm, onInvalidForm);

function updateResolutionDate(fromDate: Date, severity: Severity) {
    const addDays = severity === 'low' ? 5 : severity === 'medium' ? 3 : 1;
    resolutionDate.value = new Date(fromDate);
    resolutionDate.value.setDate(resolutionDate.value.getDate() + addDays);
};

watch(() => [creationDate, severity], ([creationDate, severity]) => {
    if (!creationDate.value || !severity.value) return;
    updateResolutionDate(creationDate.value as Date, severity.value as Severity);
}, { deep: true });

</script>

<template>
    <form @submit.prevent="onSubmit" class="px-4 md:px-0 flex flex-col gap-6">
        <div class="input-group">
            <label for="name">Name of the Service Request</label>
            <input v-model="name" id="name" type="text" placeholder="Unable to upload data" />
            <span class="self-end">{{ name?.length ?? 0 }} / {{ serviceRequestNameMaxLength }}</span>
            <span class="input-error">{{ errors.name }}</span>
        </div>
        <div class="input-group">
            <label for="description">Description</label>
            <textarea v-model="description" id="description"
                placeholder="When user tries to upload specific files, they are getting a timeout error" />
            <span class="self-end">{{ description?.length ?? 0 }} / {{ serviceRequestDescriptionMaxLength }}</span>
            <span class="input-error">{{ errors.description }}</span>
        </div>

        <div class="border rounded-md pt-7 pb-6 px-10 flex flex-col gap-6 bg-white">
            <h1 class="text-xl font-medium tracking-wide">Resolution Date is calculated based on the <u>Creation
                    Date</u> and <u>Severity</u> of the service request.</h1>
            <div class="flex flex-col md:flex-row gap-6">
                <div class="input-group">
                    <label for="creationDate">Creation Date</label>
                    <input v-model="creationDate" id="creationDate" type="date" />
                    <span class="input-error">{{ errors.creationDate }} </span>
                </div>
                <div class="input-group">
                    <label for="severity">Severity</label>
                    <select v-model="severity" id="severity">
                        <option v-for="severity in Object.values(Severity)" :key="severity" :value="severity">
                            {{ severityLabels[severity] }}
                        </option>
                    </select>
                </div>
            </div>
            <span>
                <strong>Resolution Date:</strong> {{ resolutionDate ? format(toDate(resolutionDate), "dd/MM/yyyy") :
                    'Please Select Creation Date' }}
            </span>
        </div>

        <div class="border rounded-md pt-7 pb-6 px-10 flex flex-col gap-6 bg-white">
            <h1 class="text-xl font-medium tracking-wide">Reporter Information</h1>
            <div class="input-group">
                <label for="reporterName">Reporter Name</label>
                <input v-model="reporterName" id="reporterName" type="text" />
                <span class="input-error">{{ errors.reporterName }}</span>
            </div>

            <div class="input-group">
                <label for="reporterEmail">Reporter Email</label>
                <input v-model="reporterEmail" id="reporterEmail" type="email" />
                <span class="input-error">{{ errors.reporterEmail }}</span>
            </div>

            <div class="input-group">
                <label for="reporterLocation">Reporter Location</label>
                <input v-model="reporterLocation" id="reporterLocation" type="text" />
                <span class="input-error">{{ errors.reporterLocation }}</span>
            </div>
        </div>

        <button type="submit" class="btn btn-primary mt-10" :disabled="status == 'pending'">Submit</button>

    </form>
</template>
