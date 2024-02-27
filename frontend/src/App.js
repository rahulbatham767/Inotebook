import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Component/Navbar/Navbar";
import Home from "./Component/Home/Home";
import About from "./Component/About/About";
import NoteState from "./Context/Notes/NoteState";
import Alert from "./Component/Alert/Alert";
import Signup from "./Component/Signup/Signup";
import Login from "./Component/Login/Login";
import Notes from "./Component/Notes/Notes";

const App = () => {
  const [toogle, settoogle] = useState(true);
  const [light, setLight] = useState("dark");

  const mystyle = { backgroundColor: "black", color: "white" };

  document.body.style.background = toogle
    ? "linear-gradient(to right, #0f2027, #203a43, #2c5364)"
    : "linear-gradient(315deg, #44b09e 0%, #e0d2c7 74%)";

  const btnstyle = {
    backgroundColor: toogle ? "white" : "black",
    color: toogle ? "black" : "white",
  };
  const mode = () => {
    setLight(light === "dark" ? "light" : "dark");

    settoogle(!toogle);
    const toogleChange = document.querySelector(".toggle .button");
    const labelChange = document.querySelector(".toggle .label");
    const btnChange = document.querySelectorAll(".btn");
    const formContainer = document.querySelectorAll(".form-container");
    const formsubmitbtn = document.querySelector(".form-submit-btn");
    const card = document.querySelector(".card");
    console.log(card);
    if (formContainer) {
      console.log("formContainer");
      if (toogle) {
        const formChangeStyles = {
          background: "linear-gradient(#ffffff, #bccfc6) padding-box",
          border:
            "linear-gradient(145deg, transparent 35%,#e81cff, #40c9ff) border-box",
          color: "black",
        };
        if (formsubmitbtn) {
          formsubmitbtn.addEventListener("mouseover", () => {
            formsubmitbtn.style.color = "black";
          });
        }

        formContainer.forEach((form) => {
          Object.assign(form.style, formChangeStyles);
        });
      } else {
        formContainer.forEach((form) => {
          form.style.background =
            "linear-gradient(#212121, #212121) padding-box";
          form.style.border =
            "linear-gradient(145deg, transparent 35%,#e81cff, #40c9ff) border-box";
          form.style.color = "white";
        });
      }
    }
    if (card) {
      if (toogle) {
        card.style.background =
          "linear-gradient(rgb(255, 255, 255), rgb(188, 207, 198))";
        card.style.border =
          "linear-gradient(145deg, transparent 35%, #e81cff, #40c9ff)";
        card.style.color = "black";
      } else {
        card.style.background = "linear-gradient(#212121, #212121)";
        card.style.border =
          "linear-gradient(145deg, transparent 35%, #e81cff, #40c9ff)";
        card.style.color = "white";
      }
    }
    if (toogleChange) {
      if (toogle) {
        toogleChange.style.backgroundColor = "white";
        toogleChange.style.color = "black";
        // Add other styles as needed
      } else {
        Object.assign(toogleChange.style, mystyle);
      }
    }

    if (labelChange) {
      if (toogle) {
        labelChange.style.backgroundColor = "white";
        labelChange.style.color = "black";
      } else {
        Object.assign(labelChange.style, mystyle);
        // Add other styles as needed
      }
    }
    if (btnChange) {
      btnChange.forEach((btn) => {
        Object.assign(btn.style, btnstyle);
      });
    }
  };

  return (
    <>
      <NoteState>
        <Router style={{ position: "relative" }}>
          <Navbar toogle={toogle} light={light} mode={mode} />
          <Alert />
          <div className="container-fluid p-0">
            <Routes>
              <Route exact path="/" element={<Home toogle={toogle} />} />
              <Route exact path="/about" element={<About toogle={toogle} />} />
              <Route exact path="/Notes" element={<Notes toogle={toogle} />} />
              <Route
                exact
                path="/Signup"
                element={<Signup toogle={toogle} />}
              />
              <Route exact path="/Login" element={<Login toogle={toogle} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
};
export default App;
