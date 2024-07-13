import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Policy from "./pages/Policy";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";
import Contact from "./pages/Contact";
import Categories from "./pages/Categories";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import ProductDetail from "./pages/ProductDetail";
import DashBoard from "./pages/user/DashBoard";
import PrivateRoute from "./routes/Private";
import FrogotPassword from "./pages/auth/FrogotPassword";
import AdminRoute from "./routes/Admin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategories from "./pages/admin/CreateCategories";
import CreateProducts from "./pages/admin/CreateProducts";
import Users from "./pages/admin/Users";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";
import Search from "./pages/Search";
import AdminOrders from "./pages/admin/AdminOrders";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="user" element={<DashBoard />}></Route>
        <Route path="user/profile" element={<Profile />}></Route>
        <Route path="user/orders" element={<Orders />}></Route>
      </Route>
      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboard />}></Route>
        <Route
          path="admin/create-categories"
          element={<CreateCategories />}
        ></Route>
        <Route path="admin/create-product" element={<CreateProducts />}></Route>
        <Route path="admin/product/:slug" element={<UpdateProduct />}></Route>
        <Route path="admin/products" element={<Products />}></Route>
        <Route path="admin/users" element={<Users />}></Route>
        <Route path="admin/orders" element={<AdminOrders />}></Route>
      </Route>
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<FrogotPassword />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<CheckOut />} />
      <Route path="/product/:slug" element={<ProductDetail />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
