import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../../Context/Notes/NoteContext";
import "../style.css"; // Import your CSS file

const Signup = () => {
  const [auth, setAuth] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { showAlert } = context;

  const handleSubmit = async (e) => {
    const { name, email, password } = auth;
    e.preventDefault();

    const response = await fetch(
      `https://inotebook-fxbp.onrender.com/api/auth/createuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      showAlert("Account Created successfully", "success");
      navigate("/");
    } else {
      alert("Invalid credential");
    }
  };

  const onChange = (e) => {
    setAuth({ ...auth, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container mx-auto my-4">
      <form onSubmit={handleSubmit} className="form">
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            onChange={onChange}
            className="form-input"
            name="name"
            id="name"
            aria-describedby="emailHelp"
          />
          <div className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            onChange={onChange}
            className="form-input"
            name="email"
            id="email"
            aria-describedby="emailHelp"
          />
          <div className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={onChange}
            name="password"
            className="form-input"
            id="password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            onChange={onChange}
            name="cpassword"
            className="form-input"
            id="cpassword"
          />
        </div>

        <button type="submit" className="form-submit-btn">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;
