import { Component } from 'react';

class ExternalRedirect extends Component {
    componentDidMount() {
        window.location = import.meta.env.VITE_APP_ADMIN_PATH;
    }
    render() {
        return null;
    }
}

export default ExternalRedirect;
