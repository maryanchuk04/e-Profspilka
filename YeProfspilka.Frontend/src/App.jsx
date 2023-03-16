import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import routes from './pages/routes';

const router = createBrowserRouter(routes);

function App() {
	return (
		<Layout>
			<RouterProvider router={router} />
		</Layout>
	)
}

export default App;
