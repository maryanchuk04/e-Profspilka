import React from 'react';

class ExternalRedirect extends React.Component {
    componentDidMount() {
        window.location = import.meta.env.VITE_APP_ADMIN_PATH;
    }
    render() {
        return null;
    }
}

export default ExternalRedirect;
