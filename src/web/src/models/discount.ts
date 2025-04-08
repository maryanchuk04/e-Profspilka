export enum DiscountType {
    AvailableForAll = 'availableForAll',
    AvailableForMembers = 'availableForMembers',
    OneTimeForAll = 'oneTimeForAll',
    OneTimeForMembers = 'oneTimeForMembers',
    OneTimeForFirstCourse = 'oneTimeForFirstCourse',
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

export interface DiscountCode {
    id: string;
    discount: Discount;
    isActive: boolean;
    code: string;
    activateTimeUtc: string;
    deactivateTimeUtc: string;
}

export interface VerifyDiscountResult {
    fullName: string;
    email: string;
    image: string;
    discount: Discount;
    isSuccess: boolean;
}

export const buildVerifyUri = (dicountCode: DiscountCode): string | null => {
    if (window === undefined) return null;

    return `${window.location.origin}/discount/verify?discount=${dicountCode.discount.id}&discountCode=${dicountCode.code}`;
};
