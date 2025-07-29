const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const User = require("../models/user");


const getUserFromSession = async (req) => {
  const userId = req.body.userId;
  if (!userId) throw new Error("Missing userId");
  return await User.findById(userId);
};

//CREATE 
router.post("/cart", async (req, res) => {
  try {
    const user = await getUserFromSession(req);
    if (!user) return res.status(401).send("User not authenticated");

    let cart = await Cart.findOne({ userId: user._id }).populate("items.itemId");

    if (cart) {

      cart.items = req.body.items;
      await cart.save();
    } else {
 
      cart = new Cart({
        userId: user._id,
        items: req.body.items,
      });
      await cart.save();
    }

    res.status(200).json(cart);
  } catch (err) {
    console.error("Error creating/fetching cart:", err);
    res.status(500).send("Server error: " + err.message);
  }
});

//get cart
router.get("/cart/:id", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id).populate("items.itemId");

    if (!cart) return res.status(404).send("Cart not found");

    res.status(200).json(cart);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).send("Server error: " + err.message);
  }
});

//update cart
router.patch("/cart/:id", async (req, res) => {
  try {
    const cartId = req.params.id;
    const { items } = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).send("Items must be an array");
    }

    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { items },
      { new: true }
    ).populate("items.itemId");

    if (!updatedCart) return res.status(404).send("Cart not found");

    res.status(200).json(updatedCart);
  } catch (err) {
    console.error("Failed to update cart:", err);
    res.status(500).send("Server error: " + err.message);
  }
});

module.exports = router;
