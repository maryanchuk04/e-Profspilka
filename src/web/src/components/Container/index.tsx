const Container = ({ children, className = '' }) => {
    return <div className={`container xxs:w-11/12 mx-auto ${className} `}>{children}</div>;
};

export default Container;
