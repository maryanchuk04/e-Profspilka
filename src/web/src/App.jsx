import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import routes from './pages/routes';
import { GoogleOAuthProvider } from '@react-oauth/google';

const router = createBrowserRouter(routes);
const googleClientId = import.meta.env.VITE_APP_GOOGLE_API_KEY;

function App() {
    React.useEffect(() => {
        document.body.style.height = `${window.innerHeight}px`;
    }, []);

    return (
        <GoogleOAuthProvider clientId={googleClientId}>
            <Layout>
                <RouterProvider router={router} />
            </Layout>
        </GoogleOAuthProvider>
    );
}

export default App;
