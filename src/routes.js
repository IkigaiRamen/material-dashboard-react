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
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
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
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "collapse",
    name: "Market",
    key: "Market",
    icon: <Icon fontSize="small">Marketplace</Icon>,
    route: "/Market",
    component: <Categories />,
  },
  {
    type: "collapse",
    name: "MarketByCategory",
    key: "MarketByCategory",
    icon: <Icon fontSize="small">Marketplace by category</Icon>,
    route: "/categories/:category",
    component: <Categories />,
  },
  {
    type: "collapse",
    name: "CategoryDetail",
    key: "CategoryDetail",
    icon: <Icon fontSize="small">Categories detail</Icon>,
    route: "/categories/:category/:id/details",
    component: <Details />,
  },
  {
    type: "collapse",
    name: "EditCategory",
    key: "EditCategory",
    icon: <Icon fontSize="small">Edit category</Icon>,
    route: "/categories/:category/:id/edit",
    component: <Edit />,
  },{
    type: "collapse",
    name: "Createsell",
    key: "Createsell",
    icon: <Icon fontSize="small">Add product</Icon>,
    route: "/add-product",
    component: <Createsell />,
  }, {
    type: "collapse",
    name: "Profile",
    key: "Profile",
    icon: <Icon fontSize="small">Profile</Icon>,
    route: "/profile/:id",
    component: <Profile />,
  }, {
    type: "collapse",
    name: "EditProfile",
    key: "EditProfile",
    icon: <Icon fontSize="small">Edit Profile</Icon>,
    route: "/profile/:id/edit",
    component: <EditProfile />,
  }, {
    type: "collapse",
    name: "Messages",
    key: "Messages",
    icon: <Icon fontSize="small">Messages</Icon>,
    route: "/messages",
    component: <Messages />,
  }, {
    type: "collapse",
    name: "MessagesId",
    key: "MessagesId",
    icon: <Icon fontSize="small">Messages</Icon>,
    route: "/messages/:id",
    component: <Messages />,
  },

];

export default routes;
