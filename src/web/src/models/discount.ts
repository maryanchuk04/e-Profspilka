export enum DiscountType {
    AvailableForAll = "availableForAll",
    AvailableForMembers = "availableForMembers",
    OneTimeForAll = "oneTimeForAll",
    OneTimeForMembers = "oneTimeForMembers",
    OneTimeForFirstCourse = "oneTimeForFirstCourse"
}

export interface Discount {
    id: string;
    name: string;
    withBarCode?: boolean;
    withQrCode?: boolean;
    withPromoCode?: boolean;
    barCodeImage: string;
    description: string;
    promoCode?: string;
    discountType: DiscountType;
    createdAtUtc: string;
}