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


const Dashboard = React.lazy(() => import("../pages/dashboard"));
const ChangePassword = React.lazy(() => import("../pages/change-password"));
const ProvidersList = React.lazy(() => import("../pages/providers/list"));
const ProvidersAdd = React.lazy(() => import("../pages/providers/add"));
const PatientsList = React.lazy(() => import("../pages/patients/list"));
const PatientsAdd = React.lazy(() => import("../pages/patients/add"));

const ServicesList = React.lazy(() => import("../pages/services/list"));
const ServicesAdd = React.lazy(() => import("../pages/services/add"));

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
								<Route path="/" element={<Dashboard />} />
								<Route path="/dashboard" element={<Dashboard />} />
								<Route path="/change-password" element={<ChangePassword />} />
								<Route path="/doctor/list/:page" element={<ProvidersList />} />
								<Route path="/doctor/add" element={<ProvidersAdd />} />
								<Route path="/doctor/edit/:id" element={<ProvidersAdd />} />

								<Route path="/patients/list/:page" element={<PatientsList />} />
								<Route path="/patients/add" element={<PatientsAdd />} />
								<Route path="/patients/edit/:id" element={<PatientsAdd />} />

								<Route path="/services/list/:page" element={<ServicesList />} />
								<Route path="/services/add" element={<ServicesAdd />} />
								<Route path="/services/edit/:id" element={<ServicesAdd />} />

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
