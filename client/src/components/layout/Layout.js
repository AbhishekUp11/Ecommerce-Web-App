import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {Helmet} from 'react-helmet';
import { Toaster } from 'react-hot-toast';

const Layout = ({children, tittle, description, keyword}) => {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{tittle}</title>
          <meta name="keywords" content={keyword} />
          <meta property="description" content={description} />
        </Helmet>
        <Header/>
        <main style={{minHeight: '76vh'}}>
          <h2>{children}</h2>
          <Toaster/>
        </main>
        <Footer/>
      </>
    )
}

Layout.defaultProps = {
  tittle: 'Ecommerce App - shop now',
  description: 'MERN Stack Project',
  keywords: "mern, node, react, mongodb, fullstack, ecommerce"
}

export default Layout;
