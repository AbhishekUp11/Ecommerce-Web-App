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
import AdminDashboard from './pages/admin/AdminDashboard';


function App() {
  return (
    <>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path ='/dashboard' element={<PrivateRoute />}>
          <Route path = 'user' element={<Dashboard />} />
        </Route>
        <Route path = '/dashboard' element={<AdminRoute/>}>
          <Route path = 'admin' element={<AdminDashboard/>}/>
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
