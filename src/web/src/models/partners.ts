import { Discount } from './discount';

export interface Partner {
    id: string;
    name: string;
    description: string;
    webSiteUrl: string;
    image: string;
    discounts: Discount[];
}
