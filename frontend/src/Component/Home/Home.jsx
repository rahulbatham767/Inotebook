import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* <Notes /> */}
      <div className="Welcome">
        <div className="overlay-content">
          <h1 contentEditable>Welcome To Inotebook</h1>
          <p>
            This is a note taking app for you to take notes and organize your
            thoughts.
          </p>
          <div className="d-flex justify-content-center">
            <NavLink to="/Login">
              <button class="button2">Get Start</button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
