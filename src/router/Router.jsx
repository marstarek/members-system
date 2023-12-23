import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/Login";
import Layout from "../utilities/Layout";
import ErrorBoundary from "../utilities/ErrorBoundary";
import List from "../pages/list/List";
import AddMember from "../components/forms/members_crud/AddMember";
import EditMember from "../components/forms/members_crud/EditMember";
import Show from "../pages/show/Show";

const routes = [
    {
        path: '/',
        element: <Login />,
        errorElement: <ErrorBoundary />,
        children: [
            { index: true, element: <Login /> }
        ]
    },
    {
        path: '/home',
        element: <Layout/>,
        errorElement: <ErrorBoundary />,
        children: [
            { index: true, element: <List /> },
            { path: "new-member", element: <AddMember /> },
            { path: "edit-member/:id", element: <EditMember /> },
            { path: "show-member/:id", element: <Show /> }
        ]
      
    }



]
const Router = createBrowserRouter(routes);

export default Router;