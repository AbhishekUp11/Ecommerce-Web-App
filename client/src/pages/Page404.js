import React from 'react';
import Layout from '../components/layout/Layout';
import {Link} from 'react-router-dom';

const Page404 = () =>{
  return(
    <Layout tittle="Page not found">
        <div className = "pnf">
         <h2 className = "pnf-title">404</h2>
         <h2 className = "pnf-heading">Oops! Page Not Found</h2>
         <Link to = '/' className='pnf-btn'>Go Back</Link>
        </div> 
    </Layout>
  )
};

export default Page404;
