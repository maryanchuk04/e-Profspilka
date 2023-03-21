import React from "react"
import PageWrapper from "../components/PageWrapper";
import Main from "./Main";
import NotFound from "./NotFound";

const routes = [
	{
		path: "/",
		element: <PageWrapper element={<Main />} />
	},
	{
		path: "*",
		element: <PageWrapper element={<NotFound />} withFooter={false} />
	},
]

export default routes;