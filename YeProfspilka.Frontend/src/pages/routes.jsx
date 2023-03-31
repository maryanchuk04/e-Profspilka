import React from "react"
import PageWrapper from "../components/PageWrapper";
import ProtectedRoute from "../components/ProtectedRoute";
import Main from "./Main";
import NotFound from "./NotFound";
import Profile from "./Profile";
import { authorizeProtection } from "./routesProtection";

const routes = [
	{
		path: "/",
		element: <PageWrapper element={<Main />} />
	},
	{
		path: "/profile",
		element: <PageWrapper element={
			<ProtectedRoute protectWhen={authorizeProtection}>
				<Profile />
			</ProtectedRoute>
		} />
	},
	{
		path: "*",
		element: <PageWrapper element={<NotFound />} withFooter={false} />
	},
]

export default routes;