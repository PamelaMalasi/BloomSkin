const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  photo: String,


  category: {
    type: String,
    enum: ['skin', 'sets', 'bestsellers'], 
    required: true,
  },

    price: {
  type: Number,
  required: true,
},

  ownerItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },


});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
