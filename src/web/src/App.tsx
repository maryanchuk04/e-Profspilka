import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { GoogleOAuthProvider } from '@react-oauth/google';

import Layout from './components/Layout';
import routes from './pages/routes';

const router = createBrowserRouter(routes);
const googleClientId = import.meta.env.VITE_APP_GOOGLE_API_KEY;

function App() {
    useEffect(() => {
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
