interface FieldProps {
    label: string;
    text: string;
    isValueCorrect?: boolean;
}

const Field = ({ label, text, isValueCorrect = true }: FieldProps) => {
    return (
        <div className='flex flex-col w-full my-6 first:my-1'>
            <p className='text-black/30 mb-2'>{label}</p>
            <h2 className={isValueCorrect ? 'max-md: text-xl' : 'max-md: text-xl text-red-500'}>{text}</h2>
        </div>
    );
};

export default Field;
