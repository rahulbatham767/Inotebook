import React, { useContext } from "react";
import noteContext from "../../Context/Notes/NoteContext";

const Alert = () => {
  const context = useContext(noteContext);
  const { alert } = context;

  return (
    <div style={{ position: "absolute", width: "100%" }}>
      <div className={`alert alert-${alert.type}`} role="alert">
        {alert.msg}
      </div>
    </div>
  );
};

export default Alert;
