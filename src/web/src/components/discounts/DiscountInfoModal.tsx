import { Discount } from '@/models/discount';
import LinkButton from '@/ui/Buttons/LinkButton';

import SimpleModal from '../SimpleModal';

interface DiscountInfoModalProps {
    discount: Discount;
    closeHref?: string;
}

export const DiscountInfoModal = ({ discount, closeHref = '/' }: DiscountInfoModalProps) => (
    <SimpleModal className='w-[320px] !h-fit max-h-[80vh] '>
        <div className='editor'>
            <h2>{discount.name}</h2>
            <hr className='my-4' />
            <div className='my-4' dangerouslySetInnerHTML={{ __html: discount?.description }}></div>
            <LinkButton className='bg-primary' href={closeHref}>
                Закрити
            </LinkButton>
        </div>
    </SimpleModal>
);
