import React from 'react';

class ExternalRedirect extends React.Component {
    componentDidMount() {
        window.location = process.env.REACT_APP_ADMIN_PATH;
    }
    render() {
        return null;
    }
}

export default ExternalRedirect;
