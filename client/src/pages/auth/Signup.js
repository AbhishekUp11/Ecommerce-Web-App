import React, { useState } from "react";
import Layout from "../../components/layout/Layout";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLasttName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  const handleForm = (e) => {
    e.preventDefault();

  }

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
              value={mobile}
              required= {true}
              onChange={(e) => setMobile(e.target.value)}
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
            <label className="form-label">Address</label>
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
