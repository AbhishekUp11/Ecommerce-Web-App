import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import {toast} from 'react-hot-toast';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLasttName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
	const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
		const data = {firstName, lastName, email, phoneNumber, address, password}
		const route = `${process.env.REACT_APP_API}/api/v1/auth/register`
		console.log(route)
    try{
      const res = await axios.post(route, data);
			console.log("res.data", res.data)
			if(res.data.success){
				toast.success(res.data.message)
				navigate('/login')
			}else{
				toast.error(res.data.message)
			}
		}catch(err){
			console.log(err);
			toast.error('Something went wrong')
		}
  };

  return (
    <>
      <Layout>
        <form className="register-form"  onSubmit={handleForm}>
          <div className="mb-1">
            <label className="form-label">First Name</label>
            <input
              className="form-control"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required= {true}
            />
          </div>
          <div className="mb-1">
            <label className="form-label">Last Name</label>
            <input
              className="form-control"
              type="text"
              value={lastName}
              required= {true}
              onChange={(e) => setLasttName(e.target.value)}
            />
          </div>
          <div className="mb-1">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              type="email"
              value={email}
              required= {true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-1">
            <label className="form-label">Phone Number</label>
            <input
              className="form-control"
              type="number"
              value={phoneNumber}
              required= {true}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="mb-1">
            <label className="form-label">Address</label>
            <input
              className="form-control"
              type="text"
              value={address}
              required= {true}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-1">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="password"
              value={password}
              required= {true}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            submit
          </button>
        </form>
      </Layout>
    </>
  );
};

export default Signup;
