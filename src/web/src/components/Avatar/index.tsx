interface AvatarProps {
    src: string;
    className?: string;
    alt?: string | null;
}

const Avatar = ({ src, className = '', alt = null }: AvatarProps) => {
    return (
        <div className={`h-16 w-16 rounded-standard ${className}`}>
            <img src={src} alt={alt ?? 'picture'} className='h-full w-full rounded-standard object-cover' />
        </div>
    );
};

export default Avatar;
