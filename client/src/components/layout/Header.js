import react from 'react';
import {NavLink, Link} from 'react-router-dom';
import { GiShoppingBag } from 'react-icons/gi';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const Header = () => {
    return(
      <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
           <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <Link className="navbar-brand"><GiShoppingBag/> Ecommerce App</Link>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink to = '/' className="nav-link active" aria-current="page">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to = '/register' className="nav-link active" aria-current="page">SignUp</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to = '/login' className="nav-link active" aria-current="page">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to = '/category' className="nav-link active" aria-current="page">Category</NavLink>
                </li>
								<li className="nav-item">
                  <NavLink to = '/cart' className="nav-link active cart-item" aria-current="page"><AiOutlineShoppingCart/></NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    )
}

export default Header;
