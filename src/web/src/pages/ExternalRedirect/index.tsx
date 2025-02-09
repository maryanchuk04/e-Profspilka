import { Component } from 'react';

class ExternalRedirect extends Component {
    componentDidMount() {
        window.location = process.env.NEXT_PUBLIC_ADMIN_PATH;
    }
    render() {
        return null;
    }
}

export default ExternalRedirect;
