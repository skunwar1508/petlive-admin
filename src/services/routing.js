import React from "react";
const Dashboard = React.lazy(() => import("../pages/dashboard"));

const CategoryAdd = React.lazy(() => import("../pages/category/add"));
const CategoryEdit = React.lazy(() => import("../pages/category/edit"));
const CategoryList = React.lazy(() => import("../pages/category/list"));

const Route = [
    {
        route:'/dashboard',
        component:Dashboard,
    },
    {
        route:'/category',
        children:[
            {
                route:'/add',
                component:CategoryAdd,
            },
            {
                route:'/list',
                component:CategoryList,
            },
            {
                route:'/edit/:id',
                component:CategoryEdit,
            }
        ]
    }
]


export default Route;