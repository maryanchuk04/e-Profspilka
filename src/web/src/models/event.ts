export enum EventStatus {
    Draft = 'draft',
    Published = 'published',
}

export interface Event {
    id: string;
    title: string;
    description: string;
    date: string | null;
    isPassed: boolean;
    shortDescription: string;
    images: string[];
    status: EventStatus;
}