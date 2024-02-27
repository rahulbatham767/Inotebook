const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// FETCH ALL NOTE
// Route 1: get all the notes GET:"/api/notes/fetchallnotes"  login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "internal server error " });
  }
});

// ADD NOTE
// Route 2: Add a new note using Post: "/api/notes/addnote" login required

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter a valid title").isLength({ min: 5 }),
    body("description", "enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // if there are any error occured return bad error
      const error = validationResult(req);
      if (!error) {
        return res.status(400).json({ errors: error.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ error: "internal server error " });
    }
  }
);

//  UPDATE NOTE
//  Route 3: Put:"/api/notes/updatenote" login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // Create new note

    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // find a new note to be updated

    let note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(400).send("not found");
    }
    if (note.user.toString() !== req.user.id) {
      res.status(401).json("not allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "internal server error " });
  }
});

//  DELETE NOTE
//  ROUTE 4: delete a note using delete: "/api/notes/deletenote/:id" login required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // find a new note to be updated and deleted
    let note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(400).send("not found");
    }

    // Allow deletion if owner own this
    if (note.user.toString() !== req.user.id) {
      res.status(401).json("not allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "NOte has beem deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "internal server error " });
  }
});

module.exports = router;
