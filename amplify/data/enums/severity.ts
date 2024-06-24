export const Severity = ['low', 'medium', 'high'] as const;
export type Severity = typeof Severity[number];