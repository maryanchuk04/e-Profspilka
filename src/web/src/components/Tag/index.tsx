export const Tag = ({ label, icon = null }: { icon?: string | null; label: string }) => {
    return (
        <span className='bg-primary text-white border border-1 text-xs border-gray-400 shadow-xl rounded-xl px-2 py-1'>
            {icon && <i className={`fa-solid ${icon} mr-1`}></i>}
            {label}
        </span>
    );
};
