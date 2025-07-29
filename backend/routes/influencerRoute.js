const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Influencer = require("../models/influencer");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images"); 
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });


router.post("/upload", upload.single("photo"), async (req, res) => {
  try {
    const newPhoto = new Influencer({
      photo: req.file.filename,
    });
    await newPhoto.save();
    res.status(200).json(newPhoto);
  } catch (err) {
    console.error("Upload failed:", err);
    res.status(500).send("Server error while uploading photo");
  }
});


router.get("/all", async (req, res) => {
  try {
    const photos = await Influencer.find().sort({ createdAt: -1 });
    res.json(photos);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).send("Error fetching photos");
  }
});

router.delete("/deleteInfluencer/:id/", async (req, res) => {
  try {
    const idPhoto = req.params.id;
    await Influencer.deleteOne({ _id: idPhoto });
    res.status(200).send("Deleted");
  } catch (err) {
    console.log(err);
    res.status(500).send("Not deleted" + err);
  }
});

module.exports = router;
