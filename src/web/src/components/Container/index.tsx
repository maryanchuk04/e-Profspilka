interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

const Container = ({ children, className = '' }: ContainerProps) => {
    return <div className={`container xxs:w-11/12 mx-auto ${className} `}>{children}</div>;
};

export default Container;
