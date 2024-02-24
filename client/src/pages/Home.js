import React from 'react';
import Layout from '../components/layout/Layout';
import {useAuth} from '../context/auth';

const Home = () => {
  const [auth, setAuth] = useAuth();
    return (
        <Layout tittle="Ecommerce App">
          <h2>Home component</h2>
          <pre>{JSON.stringify(auth, null, 4)}</pre>
        </Layout>
    )
};

export default Home;
