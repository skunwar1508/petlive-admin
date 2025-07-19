import React, { Suspense, useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../components/notFound/notFound";
import { ToastContainer } from "react-toastify";
import Loader, { PageLoader } from "../components/loader/loader";
import TopNavbar from "./topNavbar";
import { UserContext } from "../context/theme";
import Header from "./header";
import Footer from "./footer";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";



const routes = [
	{ path: "/", element: React.lazy(() => import("../pages/dashboard")) },
	{ path: "/dashboard", element: React.lazy(() => import("../pages/dashboard")) },
	{ path: "/change-password", element: React.lazy(() => import("../pages/change-password")) },
	{ path: "/providers/list/:page", element: React.lazy(() => import("../pages/providers/list")) },
]
function Layout() {
	const context = useContext(UserContext);


	return (
		<div
			className={`page-wrapper 
				${context.Theme} 
				${context.ThemeColor} 
				${context.MiniSidebar ? "mini-sidebar" : ""}      
				`}
		>
			<ToastContainer />
			<Header />
			<div className="all-content-wrapper">
				<TopNavbar />
				<Loader />

				<div className="mainContent px-3 mt-4">
					<div className="container-fluid">
						<Suspense fallback={<PageLoader />}>
							<Routes>
								{routes.map((route, index) => (
									<Route key={index} path={route.path} element={<route.element />} />
								))}

								<Route path="*" element={<NotFound />} />
							</Routes>
						</Suspense>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Layout;
