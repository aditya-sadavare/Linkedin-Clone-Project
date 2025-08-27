import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Auth({ onLogin }) {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({name: "",email: "",password: "",bio: "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    //console.log(form);
    
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      if (isRegister) {
        await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/auth/register", form, {
          withCredentials: true,
        });

        const loginRes = await axios.post(
          import.meta.env.VITE_BACKEND_URL+"/api/auth/login",
          { email: form.email, password: form.password },
          { withCredentials: true }
        );

        onLogin(loginRes.data.user);
        navigate("/");
      } else {
        
        const res = await axios.post(
          import.meta.env.VITE_BACKEND_URL+"/api/auth/login",
          { email: form.email, password: form.password },
          { withCredentials: true }
        );

        onLogin(res.data.user);
        navigate("/");
      }
    } catch (err) {
      setError(
       
        err.response.data.msg 
      );
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center">{isRegister ? "Register" : "Login"}</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              placeholder="Your name"
              required
              onChange={handleChange}
            />
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            placeholder="name@example.com"
            required
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            placeholder="Password"
            required
            onChange={handleChange}
          />
        </div>

        {isRegister && (
          <div className="mb-3">
            <label htmlFor="bio" className="form-label">
              Short Bio
            </label>
            <input
              id="bio"
              name="bio"
              type="text"
              className="form-control"
              placeholder="Tell us about yourself"
              onChange={handleChange}
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100">
          {isRegister ? "Register" : "Login"}
        </button>
      </form>

      <div className="mt-3 text-center">
        <button
          type="button"
          className="btn btn-link"
          onClick={() => setIsRegister((prev) => !prev)}
        >
          {isRegister
            ? "Already have an account? Login"
            : "No account? Register"}
        </button>
      </div>
    </div>
  );
}
