const express = require("express");
const itemModel = require("../models/item");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
//const cartModel = require("../models/cart");
const userModel = require("../models/user");
const mongoose = require("mongoose");


const app = express();

app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

//CRUD


app.post("/create", upload.single('photo'), async (req, res) => {
  try {
    const userId = req.body.userId;
    console.log(userId)
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      console.log("Invalid userId");
      return res.status(400).send("Invalid userId");
    }

    const user = await userModel.findById(userId);
    if (!user) {
      console.log("User not found");
      return res.status(404).send("User not found");
    }

    const newItem = new itemModel({
      ...req.body,

      photo: req.file.filename,

      ownerItem: userId,
    });

    await newItem.save();
    console.log(newItem)

    res.status(200).send(newItem);
  } catch (err) {
    console.error("Error creating item:", err);

    res.status(500).send("Not created" + err);
  }
});
//READ ALL
app.get("/readAllItem/", async (req, res) => {
  try {
    const allItem = await itemModel.find({});
    res.status(200).send(allItem);
  } catch (err) {
    console.log(err);
    res.status(500).send("Not read all" + err);
  }
});

//READ ONE
app.get("/readOneItem/:id/", async (req, res) => {
  try {
    const idItem = req.params.id;
    const oneItem = await itemModel.findById({ _id: idItem });
    res.status(200).send(oneItem);
  } catch (err) {
    console.log(err);
    res.status(500).send("Not read one" + err);
  }
});

//UPDATE
app.patch("/updateItem/:id/", upload.single("photo"), async (req, res) => {
  try {
    const idItem = req.params.id;
    const itemInfo = { ...req.body };

    if (req.file) {
      itemInfo.photo = req.file.filename;
    }

    const updateItem = await itemModel.findByIdAndUpdate(
      { _id: idItem },
      { $set: itemInfo },
      { new: true }
    );

    res.status(200).send(updateItem);
  } catch (err) {
    console.log(err);
    res.status(500).send("Not updated" + err);
  }
});


//DELETE
app.delete("/deleteItem/:id/", async (req, res) => {
  try {
    const idItem = req.params.id;
    await itemModel.deleteOne({ _id: idItem });
    res.status(200).send("Deleted");
  } catch (err) {
    console.log(err);
    res.status(500).send("Not deleted" + err);
  }
});


//cart
app.post("/cart", async (req, res) => {
    try {
      const newCart = new cartModel({
        items: req.body.items
      });
      await newCart.save();
      res.status(201).send(newCart);
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to create cart.");
    }
  });


  app.get("/cart/:id", async (req, res) => {
    try {
      const cart = await cartModel.findById(req.params.id).populate("items.itemId");
      res.status(200).send(cart);
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to retrieve cart.");
    }
  });


app.patch("/cart/:id", async (req, res) => {
    try {
      const updated = await cartModel.findByIdAndUpdate(
        req.params.id,
        { items: req.body.items },
        { new: true }
      );
      res.status(200).send(updated);
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to update cart.");
    }
  });


module.exports = app;


