import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../../Context/Notes/NoteContext";
// Import your CSS file

const Login = () => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { showAlert } = context;
  const domain =
    process.env.DOMAIN || "https://inotebook-backend-seven.vercel.app";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${domain}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    const json = await response.json();

    if (json.success) {
      showAlert("Login success", "success");
      localStorage.setItem("token", json.authtoken);
      navigate("/Notes");
    } else {
      alert("Invalid credentials");
    }
  };

  const [credential, setCredential] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container login-container mx-auto my-4">
      <h2 className="login-heading">Login to continue to iNotebook</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credential.email}
            onChange={onChange}
            className="form-input"
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
            id="password"
            name="password"
            value={credential.password}
            onChange={onChange}
            className="form-input"
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="form-submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
