import type { Severity } from "~/amplify/data/enums/severity";
import { object, Schema, string, date } from 'yup';

export interface CreateServiceRequestInput {
    name: string;
    description: string;
    severity: Severity;
    creationDate: Date;
    resolutionDate?: Date;
    reporterName: string;
    reporterEmail: string;
    reporterLocation: string;
}

export interface ServiceRequest extends CreateServiceRequestInput {
    id: string;
}

export const quickViewServiceRequestKeys = ['id', 'name', 'severity', 'creationDate', 'resolutionDate', 'reporterLocation'] as const;

export type QuickViewServiceRequest = Pick<ServiceRequest, typeof quickViewServiceRequestKeys[number]>;

export const serviceRequestNameMaxLength = 100;

export const serviceRequestDescriptionMaxLength = 500;

export const serviceRequestInputValidationSchema: Schema = object({
    name: string().required().max(serviceRequestNameMaxLength),
    description: string().required().max(serviceRequestDescriptionMaxLength),
    severity: string().required().default('low'),
    creationDate: date().required(),
    resolutionDate: date().required(),
    reporterName: string().required(),
    reporterEmail: string().required().email(),
    reporterLocation: string().required(),
})

export const severityLabels: Record<Severity, string> = {
    low: '🍋 Low',
    medium: '🍋🍋 Medium',
    high: '🍋🍋🍋 High'
}

