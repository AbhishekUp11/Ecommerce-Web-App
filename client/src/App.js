import {Routes, Route} from 'react-router-dom';
import Page404 from './pages/Page404';
import Policy from './pages/Policy';
import About from './pages/About';
import Home from './pages/Home';
import Contact from './pages/Contact';


function App() {
  return (
    <>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/about' element = {<About/>}/>
        <Route path = '/contact' element = {<Contact/>}/>
        <Route path = '/policy' element = {<Policy/>}/>
        <Route path = '/*' element = {<Page404/>}/>
      </Routes> 
    </>
  );
}

export default App;
