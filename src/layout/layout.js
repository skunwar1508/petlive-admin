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

const PettypeList = React.lazy(() => import("../pages/pettype/list"));
const PettypeAdd = React.lazy(() => import("../pages/pettype/add"));

const BreedList = React.lazy(() => import("../pages/breed/list"));
const BreedAdd = React.lazy(() => import("../pages/breed/add"));

const PetcolorList = React.lazy(() => import("../pages/petcolor/list"));
const PetcolorAdd = React.lazy(() => import("../pages/petcolor/add"));

const CommunityList = React.lazy(() => import("../pages/community/list"));
const CommunityAdd = React.lazy(() => import("../pages/community/add"));

const BlogList = React.lazy(() => import("../pages/blog/list"));
const BlogAdd = React.lazy(() => import("../pages/blog/add"));

const BlogCategoryList = React.lazy(() => import("../pages/blog-category/list"));
const BlogCategoryAdd = React.lazy(() => import("../pages/blog-category/add"));

const ContactList = React.lazy(() => import("../pages/contact-us/list"));
const InquiryList = React.lazy(() => import("../pages/inquiry/list"));

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

								<Route path="/pettype/list/:page" element={<PettypeList />} />
								<Route path="/pettype/add" element={<PettypeAdd />} />
								<Route path="/pettype/edit/:id" element={<PettypeAdd />} />

								<Route path="/breed/list/:page" element={<BreedList />} />
								<Route path="/breed/add" element={<BreedAdd />} />
								<Route path="/breed/edit/:id" element={<BreedAdd />} />

								<Route path="/petcolor/list/:page" element={<PetcolorList />} />
								<Route path="/petcolor/add" element={<PetcolorAdd />} />
								<Route path="/petcolor/edit/:id" element={<PetcolorAdd />} />
								<Route path="/breed/edit/:id" element={<BreedAdd />} />

								<Route path="/community/list/:page" element={<CommunityList />} />
								<Route path="/community/add" element={<CommunityAdd />} />
								<Route path="/community/edit/:id" element={<CommunityAdd />} />

								<Route path="/blog/list/:page" element={<BlogList />} />
								<Route path="/blog/add" element={<BlogAdd />} />
								<Route path="/blog/edit/:id" element={<BlogAdd />} />

								<Route path="/blog/category/list/:page" element={<BlogCategoryList />} />
								<Route path="/blog/category/add" element={<BlogCategoryAdd />} />
								<Route path="/blog/category/edit/:id" element={<BlogCategoryAdd />} />
								
								<Route path="/contacts/list/:page" element={<ContactList />} />
								<Route path="/inquiry/list/:page" element={<InquiryList />} />

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
