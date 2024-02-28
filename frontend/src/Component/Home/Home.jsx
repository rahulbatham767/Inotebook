import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("Welcome To Inotebook");

  const handleTitleChange = (e) => {
    setTitle(e.target.innerText);
  };

  return (
    <>
      {/* <Notes /> */}
      <div className="Welcome">
        <div className="overlay-content">
          <h1
            contentEditable
            onBlur={handleTitleChange}
            suppressContentEditableWarning={true} // Suppress warning for contentEditable
          >
            Welcome To Inotebook
          </h1>
          <p>
            This is a note taking app for you to take notes and organize your
            thoughts.
          </p>
          <div className="d-flex justify-content-center">
            <NavLink to="/Login">
              <button className="button2">Get Start</button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
