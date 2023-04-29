import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Categories from "market/Pages/Categories";
import Createsell from "market/Pages/CreateSell";
import Details from "market/Pages/Details";
import Edit from "market/Pages/Edit";
import EditProfile from "market/Pages/EditProfile";
import Messages from "market/Pages/Messages";
import Profile from "market/Pages/Profile";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type:"collapse",
    name:"Market",
    icon: <Icon fontSize="small">Store</Icon>,
    key: "Market",
    route: "/Market",
    component: <Categories />,
  },
  {
    key: "MarketByCategory",
    route: "/categories/:category",
    component: <Categories />,
  },
  {
    key: "CategoryDetail",
    route: "/categories/:category/:id/details",
    component: <Details />,
  },
  {
    key: "EditCategory",
    route: "/categories/:category/:id/edit",
    component: <Edit />,
  },{
    key: "Createsell",
    route: "/add-product",
    component: <Createsell />,
  }, {
    key: "Profile",
    route: "/profile/:id",
    component: <Profile />,
  }, {
    key: "EditProfile",
    route: "/profile/:id/edit",
    component: <EditProfile />,
  }, {
    key: "Messages",
    route: "/messages",
    component: <Messages />,
  }, {
    key: "MessagesId",
    route: "/messages/:id",
    component: <Messages />,
  },

];

export default routes;
