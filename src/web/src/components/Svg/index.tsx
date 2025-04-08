import svgs from '../../assets/svgs';

export interface SvgProps {
    name: string;
    className?: string;
}

const Svg = ({ name, className = '' }: SvgProps) => {
    const svgsCollection = svgs as Record<string, { src: string }>;

    if (!svgsCollection[name]) {
        console.error(`SVG with "${name}" not found`);
        return null;
    }

    return <img src={svgsCollection[name].src} className={className} alt={name} />;
};

export default Svg;
