import React from "react";
import { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import noteContext from "../../Context/Notes/NoteContext";
import "./note.css";

const NoteItem = (props) => {
  const { note, updateNote } = props;

  const context = useContext(noteContext);
  const { deleteNote } = context;

  return (
    <div className="col-md-3 card">
      <div className="card-body my-3 main-content">
        <div className="header">
          <h5 className="card-title note-title header">{note.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted note-tag">{note.tag}</h6>
        </div>
        <p className="card-text note-description heading">{note.description}</p>
        <div className="operation d-flex gap-3 categories">
          <span>
            <AiFillDelete
              className="icon delete-icon"
              onClick={() => {
                deleteNote(note._id);
              }}
            />
          </span>
          <span>
            <AiFillEdit
              className="icon edit-icon"
              onClick={() => updateNote(note)}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
