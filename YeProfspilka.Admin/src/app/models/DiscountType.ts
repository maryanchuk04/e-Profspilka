import { Option } from './ui-models/Option';

export enum DiscountType {
	AvailableForAll = 0,
	AvailableForMemberOfProf = 1,
	OneTimeForAll = 2,
	OneTimeForMemberOfProf = 3,
	OneTimeForFirstCourse = 4,
}

export const DiscountTypeOptions: Option[] = [
	{ label: 'Доступна для всіх', value: DiscountType.AvailableForAll },
	{ label: 'Доступна для членів профспілки', value: DiscountType.AvailableForMemberOfProf },
	// { label: 'Одноразова для всіх', value: DiscountType.OneTimeForAll },
	// { label: 'Одноразова для членів профспілки', value: DiscountType.OneTimeForMemberOfProf },
	// { label: 'Доступна для першого курсу', value: DiscountType.OneTimeForFirstCourse },
];
