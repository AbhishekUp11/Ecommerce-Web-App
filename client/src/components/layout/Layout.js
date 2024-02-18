import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({children}) => {
    return (
      <>
        <Header/>
        <main style={{minHeight: '80vh'}}>
          <h2>{children}</h2>
        </main>
        <Footer/>
      </>
    )
}

export default Layout;
