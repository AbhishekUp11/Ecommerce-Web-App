import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import {toast} from 'react-hot-toast';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/auth';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const handleForm = async (e) => {
    e.preventDefault();
    const dataParams = {email, password};

    try{
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, dataParams);
      if(res.data.success){
        toast.success(res.data.message)
        setAuth({
          user: res.data.user,
          token: res.data.user.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate('/');
      }else{
        toast.error(res.data.message)
      }
    }catch(err){
      toast.error('Something went wrong')
    }   
  };

  return (
    <Layout>
      <form className="register-form" onSubmit={handleForm}>
        <div className="mb-2">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Password</label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </Layout>
  );
};

export default Login;
