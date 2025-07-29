const mongoose = require("mongoose");

const influencerSchema = new mongoose.Schema({
  photo: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Influencer = mongoose.model("Influencer", influencerSchema);

module.exports = Influencer;
