

import { getUserDiscounts } from '@/apis/discount';

const fetchDiscounts = async () => {
    const discounts = await getUserDiscounts();

    return discounts;
}

export default async function UserProfileDiscounts() {
    const discounts = await fetchDiscounts();

    return (<></>);
}