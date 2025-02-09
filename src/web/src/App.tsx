import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import routes from './pages/routes';

const router = createBrowserRouter(routes);

function App() {
    useEffect(() => {
        document.body.style.height = `${window.innerHeight}px`;
    }, []);

    return <RouterProvider router={router} />;
}

export default App;
