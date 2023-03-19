import React from "react"
import PageWrapper from "../components/PageWrapper";
import Main from "./Main";

const routes = [
	{
		path: "/",
		element: <PageWrapper element={<Main />} />
	}
]

export default routes;