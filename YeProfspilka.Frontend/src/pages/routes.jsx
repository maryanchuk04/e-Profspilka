import React from "react"
import PageWrapper from "../components/PageWrapper";
import Main from "./Main";
import NotFound from "./NotFound";
import Profile from "./Profile";

const routes = [
	{
		path: "/",
		element: <PageWrapper element={<Main />} />
	},
	{
		path: "/profile",
		element: <PageWrapper element={<Profile />} />
	},
	{
		path: "*",
		element: <PageWrapper element={<NotFound />} withFooter={false} />
	},
]

export default routes;