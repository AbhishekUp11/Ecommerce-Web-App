import {Routes, Route} from 'react-router-dom';
import Page404 from './pages/Page404';
import Policy from './pages/Policy';
import About from './pages/About';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/routes/Private'; 
import AdminRoute from './components/routes/Admin';
import Forgot from './pages/auth/Forgot';
import AdminDashboard from './pages/admin/adminDashboard';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import User from './pages/admin/User';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from './pages/admin/Products';
import UpdateProduct from './pages/admin/UpdateProduct';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import ProductDetails from './pages/ProductDetails';


function App() {
  return (
    <>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path ='/dashboard' element={<PrivateRoute />}>
          <Route path = 'user' element={<Dashboard />} />
          <Route path = 'user/orders' element = {<Orders/>}/>
          <Route path = 'user/profile' element = {<Profile/>}/>
        </Route>
        <Route path = '/dashboard' element={<AdminRoute/>}>
          <Route path = 'admin' element={<AdminDashboard/>} />
          <Route path = 'admin/create-category' element={<CreateCategory/>} />
          <Route path = 'admin/create-product' element={<CreateProduct/>} />
          <Route path = 'admin/product' element={<Products/>} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path='admin/users' element={<User/>} />
        </Route>
        <Route path = '/about' element = {<About/>}/>
        <Route path = '/contact' element = {<Contact/>}/>
        <Route path = '/policy' element = {<Policy/>}/>
        <Route path = '/register' element = {<Signup/>}/>
        <Route path = '/forgot-password' element = {<Forgot/>}/>
        <Route path = '/login' element = {<Login/>}/>
        <Route path = '/*' element = {<Page404/>}/>
      </Routes>
    </>
  );
}

export default App;
