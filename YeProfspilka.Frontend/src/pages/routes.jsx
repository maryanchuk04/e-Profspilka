import React from "react"
import PageWrapper from "../components/PageWrapper";
import ProtectedRoute from "../components/ProtectedRoute";
import Main from "./Main";
import NotFound from "./NotFound";
import Profile from "./Profile";
import { authorizeProtection } from "./routesProtection";
import ExternalRedirect from "./ExternalRedirect";
import Events from "./Events";
import Event from "./Event";

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
		path: "/events",
		element: <PageWrapper element={<Events />} withFooter={true} />
	},
	{
		path: "*",
		element: <PageWrapper element={<NotFound />} withFooter={false} />
	},
	{
		path: "/admin",
		element: <ExternalRedirect />
	},
	{
		path: "/events/:id",
		element: <PageWrapper element={<Event />} />
	}
]

export default routes;