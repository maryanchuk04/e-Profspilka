import svgs from '../../assets/svgs';

const Svg = ({ name, className = '' }) => {
    return <img src={svgs[name]} className={className} />;
};

export default Svg;
