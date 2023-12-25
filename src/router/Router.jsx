import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/LoginPage";
import Layout from "../utilities/Layout";
import ErrorPage from "../utilities/ErrorPage";
import MembersPage from "../pages/membersList/MembersPage";
import AddMember from "../components/members_crud/AddMember";
import EditMember from "../components/members_crud/EditMember";
import Show from "../pages/show/Show";

const routes = [
    {
        path: '/',
        element: <Login />,
        errorElement: <ErrorPage />,
       
    },
    {
        path: '/home',
        element: <Layout/>,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <MembersPage /> },
            { path: "new-member", element: <AddMember /> },
            { path: "edit-member/:id", element: <EditMember /> },
            { path: "show-member/:id", element: <Show /> }
        ]
      
    }



]
const Router = createBrowserRouter(routes);

export default Router;