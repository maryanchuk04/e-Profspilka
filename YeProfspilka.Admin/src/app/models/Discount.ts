import { DiscountType, } from './DiscountType';

export interface Discount {
	id: string;
	name: string;
	description: string;
	discountType: DiscountType;
	withQrCode: boolean;
	withBarCode: boolean;
	barCodeImage: string;
}
