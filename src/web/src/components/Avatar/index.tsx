interface AvatarProps {
    src: string;
    className?: string;
}

const Avatar = ({ src, className = '' }: AvatarProps) => {
    return (
        <div className={`h-16 w-16 rounded-standard ${className}`}>
            <img src={src} alt='Avatar' className='h-full w-full rounded-standard object-cover' />
        </div>
    );
};

export default Avatar;
